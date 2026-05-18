import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCcw, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import DemandBadge from '../components/ui/DemandBadge.jsx';
import ProfessionModal from '../components/profession/ProfessionModal.jsx';
import { recommendProfessions, formatKzt, growthLabel, STORAGE_KEYS } from '../utils/careerEngine.js';

function loadAnswers() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.answers);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function ResultsPage() {
  const location = useLocation();
  const [modalProfession, setModalProfession] = useState(null);

  const answers = location.state?.answers || loadAnswers() || [];

  const { topProfessions, skillsProfile, categoryMeta } = useMemo(() => recommendProfessions(answers, 5), [answers]);

  useEffect(() => {
    if (location.state?.answers) {
      try {
        sessionStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(location.state.answers));
      } catch {
        /* ignore */
      }
    }
  }, [location.state]);

  const primary = topProfessions[0];

  return (
    <div className="space-y-10">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">Результаты теста</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Ваши рекомендации CareerAI</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
            {answers.length
              ? 'Модель сопоставляет ваши ответы с профилями профессий (веса навыков и черт личности). Данные — демонстрационные, при подключении API можно заменить на ML.'
              : 'Вы открыли страницу без прохождения теста — показан демонстрационный топ профессий для Казахстана. Пройдите тест для персонализации.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button to="/career-test" variant="ghost">
            <span className="inline-flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Пройти заново
            </span>
          </Button>
          <Button to="/booking">Записаться на программу</Button>
        </div>
      </header>

      {primary && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <GlassCard className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-fuchsia-500/10" />
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">Топ-совпадение</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">{primary.title}</h2>
                <p className="mt-2 max-w-xl text-sm text-slate-200">{primary.shortDescription}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <DemandBadge level={primary.demand} />
                  <span className="text-xs text-slate-400">
                    Зарплата: <span className="font-semibold text-slate-100">{formatKzt(primary.salaryMin, primary.salaryMax)}</span>
                  </span>
                  <span className="text-xs text-slate-500">{growthLabel(primary.growthTrend)}</span>
                </div>
                {categoryMeta && <p className="mt-2 text-xs text-slate-500">Категория: {categoryMeta.label}</p>}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button variant="subtle" onClick={() => setModalProfession(primary)}>
                  Подробнее о профессии
                </Button>
                <Button to="/tours">
                  Профтуры
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      <section className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2 space-y-4">
          <h3 className="font-display text-lg font-semibold text-white">Топ-5 профессий под ваш профиль</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {topProfessions.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setModalProfession(p)}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-left transition hover:border-indigo-400/50 hover:bg-slate-900/80"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">#{idx + 1}</span>
                  <span className="text-xs font-semibold text-emerald-300/90">{p.matchPercent}%</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-white">{p.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">{p.shortDescription}</p>
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="space-y-3">
          <h3 className="font-display text-lg font-semibold text-white">Профиль навыков</h3>
          <p className="text-xs text-slate-400">Накопленные баллы по ответам (демо-логика).</p>
          {skillsProfile.length === 0 ? (
            <p className="text-sm text-slate-500">Пройдите тест, чтобы увидеть профиль.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {skillsProfile.map((row) => (
                <li key={row.tag} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span className="text-slate-100">{row.label}</span>
                  <span className="text-xs font-semibold text-indigo-200">{row.count}</span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </section>

      {primary && (
        <section className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="space-y-3">
            <h3 className="font-display text-lg font-semibold text-white">Дорожная карта</h3>
            <div className="space-y-3">
              {primary.roadmap.map((step) => (
                <div key={step.phase} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-200">{step.phase}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-200">
                    {step.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-3">
            <h3 className="font-display text-lg font-semibold text-white">Компенсация и спрос</h3>
            <p className="text-sm text-slate-300">Диапазоны зарплат — ориентир по рынку Казахстана для MVP (уточняйте по HR-опросам и госстатистике).</p>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/5 p-4">
              <DemandBadge level={primary.demand} />
              <p className="mt-3 text-2xl font-semibold text-white">{formatKzt(primary.salaryMin, primary.salaryMax)}</p>
              <p className="mt-2 text-xs text-slate-400">{growthLabel(primary.growthTrend)}</p>
            </div>
            <Link to="/demanded" className="text-sm font-semibold text-indigo-300 hover:text-indigo-200">
              Спрос по городам →
            </Link>
          </GlassCard>
        </section>
      )}

      <ProfessionModal profession={modalProfession} onClose={() => setModalProfession(null)} />
    </div>
  );
}
