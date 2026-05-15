import professions from '../data/professions.json';

/**
 * Simple mock "AI" scoring: count how often each profession tag appears
 * in the user's selected answers (by tag overlap).
 */
export function recommendProfessions(selectedAnswers) {
  const tagCounts = {};

  selectedAnswers.forEach((answer) => {
    (answer.tags || []).forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const scored = professions.map((p) => {
    const score = p.tags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0);
    return { ...p, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 3);
  const skillsProfile = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, count]) => ({ tag, count }));

  return { topProfessions: top, skillsProfile, tagCounts };
}

export function formatSalaryRange(min, max, currency = 'USD') {
  const fmt = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
  return `${fmt.format(min)} – ${fmt.format(max)}`;
}

export function demandLabel(level) {
  const map = {
    high: 'High demand',
    medium: 'Medium demand',
    low: 'Emerging / niche',
  };
  return map[level] || level;
}
