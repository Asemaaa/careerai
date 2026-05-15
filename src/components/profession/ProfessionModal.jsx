import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, BookOpen, ListChecks } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { formatSalaryRange, demandLabel } from '../../utils/careerEngine.js';

/**
 * Full-screen modal for deep profession details (skills, growth, courses).
 */
export default function ProfessionModal({ profession, onClose }) {
  const open = Boolean(profession);

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
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            aria-label="Close dialog backdrop"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="profession-title"
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-slate-950/95 p-6 shadow-glow sm:rounded-3xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">Profession profile</p>
                <h2 id="profession-title" className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                  {profession.title}
                </h2>
                <p className="mt-2 text-sm text-slate-300">{profession.shortDescription}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Salary band (US baseline)</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {formatSalaryRange(profession.salaryMin, profession.salaryMax, profession.currency)}
                </p>
                <p className="mt-1 text-xs text-slate-400">{demandLabel(profession.demand)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <TrendingUp className="h-4 w-4 text-emerald-300" />
                  Career growth
                </p>
                <p className="mt-2 text-sm text-slate-200">{profession.growth}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                <ListChecks className="h-4 w-4 text-sky-300" />
                Required skills
              </h3>
              <ul className="flex flex-wrap gap-2">
                {profession.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-white">Learning roadmap</h3>
              <div className="space-y-3">
                {profession.roadmap.map((step) => (
                  <div key={step.phase} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">{step.phase}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
                      {step.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                <BookOpen className="h-4 w-4 text-fuchsia-300" />
                Course recommendations
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
              <Button to="/tours" variant="ghost" onClick={onClose}>
                Watch a profession tour
              </Button>
              <Button to="/demanded" variant="subtle" onClick={onClose}>
                See city demand
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
