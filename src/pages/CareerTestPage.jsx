import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import questions from '../data/careerQuestions.json';
import Button from '../components/ui/Button.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';

/**
 * Multi-step career questionnaire — stores answers in component state,
 * then passes them to /results via router state (+ sessionStorage backup).
 */
export default function CareerTestPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = questions[step];
  const progress = (step + 1) / questions.length;

  const canGoNext = Boolean(answers[current.id]);

  const summaryPayload = useMemo(() => {
    return questions.map((q) => {
      const selectedId = answers[q.id];
      const option = q.options.find((o) => o.id === selectedId);
      return {
        questionId: q.id,
        question: q.question,
        optionId: selectedId,
        label: option?.label,
        tags: option?.tags || [],
      };
    });
  }, [answers]);

  const handleSelect = (optionId) => {
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
  };

  const goNext = () => {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      const filled = summaryPayload.filter((row) => row.optionId);
      try {
        sessionStorage.setItem('careerai:lastAnswers', JSON.stringify(filled));
      } catch {
        // ignore quota / privacy mode
      }
      navigate('/results', { state: { answers: filled } });
    }
  };

  const goPrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">Career assessment</p>
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">Career discovery test</h1>
        <p className="text-sm text-slate-300 sm:text-base">
          Answer honestly — there are no wrong choices. This demo uses simple tag matching behind the scenes.
        </p>
      </header>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            Question {step + 1} of {questions.length}
          </span>
          <span>{Math.round(progress * 100)}% complete</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35 }}
        >
          <GlassCard className="space-y-6">
            <h2 className="text-lg font-semibold text-white sm:text-xl">{current.question}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {current.options.map((opt) => {
                const active = answers[current.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt.id)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition duration-300 ${
                      active
                        ? 'border-indigo-400/70 bg-indigo-500/20 text-white shadow-glow'
                        : 'border-white/10 bg-slate-950/40 text-slate-100 hover:border-white/25 hover:bg-slate-900/70'
                    }`}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">Option {opt.id}</span>
                    <span className="mt-1 block text-sm">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" onClick={goPrev} disabled={step === 0} className="sm:w-auto">
          <span className="inline-flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </span>
        </Button>
        <Button onClick={goNext} disabled={!canGoNext} className="sm:w-auto">
          <span className="inline-flex items-center gap-2">
            {step === questions.length - 1 ? 'See results' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </span>
        </Button>
      </div>
    </div>
  );
}
