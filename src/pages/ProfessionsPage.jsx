import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import professions from '../data/professions.json';
import categories from '../data/categories.json';
import GlassCard from '../components/ui/GlassCard.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
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
    <div className="space-y-12">
      <PageHeader
        eyebrow="Каталог · 29+ профессий"
        title="Профессии Казахстана"
        subtitle="Премиальные карточки с зарплатами в ₸, спросом, дорожными картами и связью с вузами."
      />

      <div className="flex flex-wrap gap-2">
        {[{ id: 'all', label: 'Все' }, ...categories].map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-all duration-300 ${
              cat === c.id
                ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-glow'
                : 'border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-sky-400/25 hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p, idx) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.03 }}>
            <GlassCard className="flex h-full flex-col gap-0 overflow-hidden !p-0">
              <ProfessionVisual category={p.category} className="rounded-none" />
              <div className="flex flex-1 flex-col gap-3 px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                  <DemandBadge level={p.demand} />
                  <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-slate-400 ring-1 ring-white/10">{growthLabel(p.growthTrend)}</span>
                </div>
                <h2 className="font-display text-lg font-semibold text-white">{p.title}</h2>
                <p className="text-sm text-slate-400">{p.shortDescription}</p>
                <p className="mt-auto text-sm font-semibold text-white">{formatKzt(p.salaryMin, p.salaryMax)}</p>
                <button type="button" onClick={() => setModalProfession(p)} className="text-left text-sm font-semibold text-sky-300 transition hover:text-sky-200">
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
