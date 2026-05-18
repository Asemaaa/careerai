import professions from '../data/professions.json';
import categories from '../data/categories.json';
import cities from '../data/cities.json';

export function getCityName(cityId) {
  return cities.find((c) => c.id === cityId)?.name || cityId;
}

export const TRAIT_LABELS = {
  leadership: 'Лидерство',
  creativity: 'Креативность',
  logic: 'Логика',
  empathy: 'Эмпатия',
  teamwork: 'Командность',
  communication: 'Коммуникация',
  stress: 'Стрессоустойчивость',
  technical: 'Технический интерес',
  analytical: 'Аналитика',
  people: 'Работа с людьми',
  discipline: 'Дисциплина',
  organization: 'Организованность',
};

const TRAIT_KEYS = Object.keys(TRAIT_LABELS);

/**
 * Суммирует баллы черт личности из ответов теста.
 */
export function aggregateTraits(selectedAnswers) {
  const traits = {};
  TRAIT_KEYS.forEach((k) => {
    traits[k] = 0;
  });

  selectedAnswers.forEach((answer) => {
    const t = answer.traits || {};
    Object.entries(t).forEach(([key, value]) => {
      if (traits[key] !== undefined) {
        traits[key] += value;
      }
    });
  });

  return traits;
}

/**
 * Сопоставление профиля пользователя с профессиями (скалярное произведение весов).
 */
export function recommendProfessions(selectedAnswers, limit = 5) {
  if (!selectedAnswers || selectedAnswers.length === 0) {
    const demoIds = ['frontend-developer', 'doctor', 'oil-engineer', 'teacher-english', 'nurse'];
    const topProfessions = demoIds
      .map((id) => professions.find((p) => p.id === id))
      .filter(Boolean)
      .map((p) => ({ ...p, score: 0, matchPercent: 72 }));
    return {
      topProfessions,
      skillsProfile: [],
      userTraits: {},
      topCategory: topProfessions[0]?.category,
      categoryMeta: categories.find((c) => c.id === topProfessions[0]?.category),
    };
  }

  const userTraits = aggregateTraits(selectedAnswers);

  const scored = professions.map((p) => {
    const profile = p.traits || {};
    let score = 0;
    Object.entries(profile).forEach(([trait, weight]) => {
      score += (userTraits[trait] || 0) * weight;
    });
    return { ...p, score, matchPercent: 0 };
  });

  scored.sort((a, b) => b.score - a.score);
  const maxScore = scored[0]?.score || 1;

  scored.forEach((p) => {
    p.matchPercent = maxScore > 0 ? Math.round((p.score / maxScore) * 100) : 0;
  });

  const topProfessions = scored.slice(0, limit);

  const skillsProfile = Object.entries(userTraits)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag, count]) => ({
      tag,
      label: TRAIT_LABELS[tag] || tag,
      count,
    }));

  const topCategory = topProfessions[0]?.category;
  const categoryMeta = categories.find((c) => c.id === topCategory);

  return {
    topProfessions,
    skillsProfile,
    userTraits,
    topCategory,
    categoryMeta,
  };
}

export function getProfessionById(id) {
  return professions.find((p) => p.id === id);
}

export function getProfessionsByCategory(categoryId) {
  return professions.filter((p) => p.category === categoryId);
}

export function formatKzt(min, max) {
  const fmt = new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0,
  });
  return `${fmt.format(min)} – ${fmt.format(max)}`;
}

export function formatKztSingle(value) {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0,
  }).format(value);
}

export function demandLabel(level) {
  const map = {
    high: 'Высокий спрос',
    medium: 'Средний спрос',
    low: 'Нишевый спрос',
  };
  return map[level] || level;
}

export function growthLabel(trend) {
  const map = {
    рост: 'Тренд: рост',
    стабильный: 'Тренд: стабильный',
  };
  return map[trend] || `Тренд: ${trend}`;
}

export const STORAGE_KEYS = {
  answers: 'careerai:kz:answers',
  registration: 'careerai:kz:registration',
  bookings: 'careerai:kz:bookings',
};
