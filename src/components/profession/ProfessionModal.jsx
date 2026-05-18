import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, BookOpen, ListChecks, Building2, GraduationCap } from 'lucide-react';
import Button from '../ui/Button.jsx';
import DemandBadge from '../ui/DemandBadge.jsx';
import ProfessionVisual from '../ui/ProfessionVisual.jsx';
import { formatKzt, demandLabel, growthLabel } from '../../utils/careerEngine.js';
import universities from '../../data/universities.json';

export default function ProfessionModal({ profession, onClose }) {
  const open = Boolean(profession);
  const linkedUnis = profession
    ? universities.filter((u) => (profession.universityIds || []).includes(u.id))
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={profession.id}
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" aria-label="Закрыть" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="profession-title"
            className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-slate-950/95 shadow-glow sm:rounded-3xl"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <ProfessionVisual category={profession.category} className="rounded-t-3xl" />

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">Профиль профессии</p>
                  <h2 id="profession-title" className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                    {profession.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-300">{profession.shortDescription}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10"
                  aria-label="Закрыть окно"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <DemandBadge level={profession.demand} />
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10">
                  {growthLabel(profession.growthTrend)}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Зарплата в Казахстане</p>
                  <p className="mt-2 text-lg font-semibold text-white">{formatKzt(profession.salaryMin, profession.salaryMax)}</p>
                  <p className="mt-1 text-xs text-slate-400">{demandLabel(profession.demand)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <TrendingUp className="h-4 w-4 text-emerald-300" />
                    Карьерный рост
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {profession.growth ||
                      (profession.growthTrend === 'рост'
                        ? 'Сегмент демонстрирует рост вакансий и зарплат в крупных городах и в регионах Казахстана.'
                        : 'Стабильный сегмент рынка труда с предсказуемыми карьерными траекториями.')}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-slate-300">{profession.description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
                    <Building2 className="h-4 w-4" /> Условия работы
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{profession.workEnvironment}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
                    <GraduationCap className="h-4 w-4" /> Образование
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{profession.education}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <ListChecks className="h-4 w-4 text-sky-300" />
                  Ключевые навыки
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {profession.skills.map((skill) => (
                    <li key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-semibold text-white">Дорожная карта</h3>
                <div className="space-y-3">
                  {profession.roadmap.map((step) => (
                    <motion.div key={step.phase} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">{step.phase}</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
                        {step.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {linkedUnis.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-semibold text-white">Рекомендуемые вузы</h3>
                  <ul className="space-y-2">
                    {linkedUnis.map((u) => (
                      <li key={u.id} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                        {u.name} — {u.city}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <BookOpen className="h-4 w-4 text-fuchsia-300" />
                  Курсы и программы
                </h3>
                <ul className="space-y-2 text-sm text-slate-200">
                  {profession.courses.map((c) => (
                    <li key={c} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/booking" onClick={onClose}>
                  Записаться на экскурсию
                </Button>
                <Button to="/tours" variant="ghost" onClick={onClose}>
                  Смотреть туры
                </Button>
                <Button to="/universities" variant="subtle" onClick={onClose}>
                  Вузы Казахстана
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
