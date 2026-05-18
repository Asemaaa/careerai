import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import questions from '../data/careerQuestions.json';
import Button from '../components/ui/Button.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import { STORAGE_KEYS } from '../utils/careerEngine.js';

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
        traits: option?.traits || {},
      };
    });
  }, [answers]);

  const handleSelect = (optionId) => setAnswers((prev) => ({ ...prev, [current.id]: optionId }));

  const goNext = () => {
    if (step < questions.length - 1) setStep((s) => s + 1);
    else {
      const filled = summaryPayload.filter((row) => row.optionId);
      try {
        sessionStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(filled));
      } catch {
        /* ignore */
      }
      navigate('/results', { state: { answers: filled } });
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Профориентация · 20 вопросов"
        title="Профессиональный тест"
        subtitle="Анализ лидерства, креативности, логики, эмпатии и карьерных интересов — с рекомендациями для рынка Казахстана."
      />

      <div className="mb-10 space-y-3">
        <div className="flex justify-between text-xs font-medium uppercase tracking-widest text-slate-500">
          <span>
            Вопрос {step + 1} / {questions.length}
          </span>
          <span className="text-sky-400/80">{Math.round(progress * 100)}%</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlassCard variant="large" noHover className="!shadow-glow-lg">
            <h2 className="font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">{current.question}</h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {current.options.map((opt) => {
                const active = answers[current.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt.id)}
                    className={`group rounded-3xl border px-5 py-4 text-left transition-all duration-300 ${
                      active
                        ? 'border-sky-400/50 bg-sky-500/15 shadow-glow'
                        : 'border-white/[0.08] bg-white/[0.02] hover:border-sky-400/25 hover:bg-white/[0.05] hover:shadow-glow'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-sky-400/80">
                      {opt.id}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate-200">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
        <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          <ChevronLeft className="h-4 w-4" />
          Назад
        </Button>
        <Button onClick={goNext} disabled={!canGoNext}>
          {step === questions.length - 1 ? 'Получить рекомендации' : 'Далее'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
