import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCcw } from 'lucide-react';
import professions from '../data/professions.json';
import Button from '../components/ui/Button.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import DemandBadge from '../components/ui/DemandBadge.jsx';
import ProfessionModal from '../components/profession/ProfessionModal.jsx';
import { recommendProfessions, formatSalaryRange } from '../utils/careerEngine.js';

function loadAnswersFromStorage() {
  try {
    const raw = sessionStorage.getItem('careerai:lastAnswers');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Presents AI-style recommendations based on the latest test run.
 * Falls back to demo data if you open this page directly.
 */
export default function ResultsPage() {
  const location = useLocation();
  const [modalProfession, setModalProfession] = useState(null);

  const answers = location.state?.answers || loadAnswersFromStorage() || [];

  const { topProfessions, skillsProfile } = useMemo(() => {
    if (!answers.length) {
      const demo = professions.slice(0, 3).map((p) => ({ ...p, score: 1 }));
      return {
        topProfessions: demo,
        skillsProfile: [
          { tag: 'demo', count: 1 },
          { tag: 'preview', count: 1 },
        ],
      };
    }
    return recommendProfessions(answers);
  }, [answers]);

  useEffect(() => {
    if (location.state?.answers) {
      try {
        sessionStorage.setItem('careerai:lastAnswers', JSON.stringify(location.state.answers));
      } catch {
        // ignore
      }
    }
  }, [location.state]);

  const primary = topProfessions[0];

  return (
    <div className="space-y-10">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">Your results</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Personalized career matches</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
            {answers.length
              ? 'Based on your latest answers, here is a mock ranking using tag overlap — replace with model output anytime.'
              : 'You landed on this page without a recent test — showing a static preview. Take the quiz for tailored picks.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button to="/career-test" variant="ghost">
            <span className="inline-flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Retake test
            </span>
          </Button>
          <Button to="/demanded">Compare cities</Button>
        </div>
      </header>

      {primary && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <GlassCard className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-600/25 via-transparent to-fuchsia-500/10" />
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">Top match</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">{primary.title}</h2>
                <p className="mt-2 max-w-xl text-sm text-slate-200">{primary.shortDescription}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <DemandBadge level={primary.demand} />
                  <span className="text-xs text-slate-400">
                    Salary (US baseline):{' '}
                    <span className="font-semibold text-slate-100">
                      {formatSalaryRange(primary.salaryMin, primary.salaryMax, primary.currency)}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button variant="subtle" onClick={() => setModalProfession(primary)}>
                  View profession details
                </Button>
                <Button to="/tours">
                  Watch a tour
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      <section className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2 space-y-4">
          <h3 className="font-display text-lg font-semibold text-white">Recommended professions</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {topProfessions.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setModalProfession(p)}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-left transition hover:border-indigo-400/50 hover:bg-slate-900/80"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">#{idx + 1}</p>
                <p className="mt-2 text-sm font-semibold text-white">{p.title}</p>
                <p className="mt-1 line-clamp-3 text-xs text-slate-400">{p.shortDescription}</p>
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="space-y-3">
          <h3 className="font-display text-lg font-semibold text-white">Skills signal</h3>
          <p className="text-xs text-slate-400">Aggregated from your answer tags (demo logic).</p>
          <ul className="space-y-2 text-sm">
            {skillsProfile.map((row) => (
              <li key={row.tag} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="capitalize text-slate-100">{row.tag}</span>
                <span className="text-xs font-semibold text-indigo-200">{row.count}×</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      {primary && (
        <section className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="space-y-3">
            <h3 className="font-display text-lg font-semibold text-white">Career roadmap</h3>
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
            <h3 className="font-display text-lg font-semibold text-white">Demand & compensation</h3>
            <p className="text-sm text-slate-300">
              Demand reflects mock labels in JSON — wire this to labor statistics or your proprietary index later.
            </p>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/5 p-4">
              <DemandBadge level={primary.demand} />
              <p className="mt-3 text-2xl font-semibold text-white">
                {formatSalaryRange(primary.salaryMin, primary.salaryMax, primary.currency)}
              </p>
              <p className="mt-2 text-xs text-slate-400">Salary ranges are illustrative for the demo.</p>
            </div>
            <Link to="/demanded" className="text-sm font-semibold text-indigo-300 hover:text-indigo-200">
              Open city-level demand explorer →
            </Link>
          </GlassCard>
        </section>
      )}

      <ProfessionModal profession={modalProfession} onClose={() => setModalProfession(null)} />
    </div>
  );
}
