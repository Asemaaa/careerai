import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import professions from '../data/professions.json';
import categories from '../data/categories.json';
import GlassCard from '../components/ui/GlassCard.jsx';
import ProfessionModal from '../components/profession/ProfessionModal.jsx';
import ProfessionVisual from '../components/ui/ProfessionVisual.jsx';
import DemandBadge from '../components/ui/DemandBadge.jsx';
import { formatKzt, growthLabel } from '../utils/careerEngine.js';

export default function ProfessionsPage() {
  const [cat, setCat] = useState('all');
  const [modalProfession, setModalProfession] = useState(null);

  const filtered = useMemo(() => {
    if (cat === 'all') return professions;
    return professions.filter((p) => p.category === cat);
  }, [cat]);

  return (
    <div className="space-y-10">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">Каталог</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Профессии в Казахстане</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
          Реалистичные описания, зарплаты в тенге, спрос, условия работы и связка с вузами. Данные для MVP — редактируйте JSON под партнёров.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCat('all')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            cat === 'all' ? 'bg-indigo-500 text-white shadow-glow' : 'bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10'
          }`}
        >
          Все
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              cat === c.id ? 'bg-indigo-500 text-white shadow-glow' : 'bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p, idx) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.03 }}>
            <GlassCard className="flex h-full flex-col gap-4 p-0 overflow-hidden">
              <ProfessionVisual category={p.category} className="rounded-none" />
              <div className="flex flex-1 flex-col gap-3 px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                  <DemandBadge level={p.demand} />
                  <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-slate-400 ring-1 ring-white/10">{growthLabel(p.growthTrend)}</span>
                </div>
                <h2 className="font-display text-lg font-semibold text-white">{p.title}</h2>
                <p className="text-sm text-slate-400">{p.shortDescription}</p>
                <p className="mt-auto text-sm font-semibold text-white">{formatKzt(p.salaryMin, p.salaryMax)}</p>
                <button type="button" onClick={() => setModalProfession(p)} className="text-left text-sm font-semibold text-indigo-300 hover:text-indigo-200">
                  Открыть карточку →
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <ProfessionModal profession={modalProfession} onClose={() => setModalProfession(null)} />
    </div>
  );
}
