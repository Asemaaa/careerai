import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import demandByCity from '../data/demandByCity.json';
import professions from '../data/professions.json';
import GlassCard from '../components/ui/GlassCard.jsx';
import DemandBadge from '../components/ui/DemandBadge.jsx';
import ProfessionModal from '../components/profession/ProfessionModal.jsx';
import { formatKzt, demandLabel, growthLabel, getCityName } from '../utils/careerEngine.js';

export default function DemandedProfessionsPage() {
  const [cityId, setCityId] = useState(demandByCity[0].cityId);
  const [modalProfession, setModalProfession] = useState(null);

  const city = useMemo(() => demandByCity.find((c) => c.cityId === cityId) || demandByCity[0], [cityId]);

  const cards = useMemo(() => {
    return city.items.map((row) => {
      const base = professions.find((p) => p.id === row.professionId);
      return { ...row, profession: base, title: base?.title || row.professionId };
    });
  }, [city]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">Рынок труда</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Востребованные профессии по городам</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
            Ориентиры по зарплатам в ₸ и уровню спроса для MVP CareerAI. Уральск и регионы ЗКО — с учётом местной экономики; агломерации — усиленный IT и сервисы.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Город
          </label>
          <select
            id="city"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none ring-indigo-400/40 focus:ring-2"
          >
            {demandByCity.map((c) => (
              <option key={c.cityId} value={c.cityId}>
                {getCityName(c.cityId)}
              </option>
            ))}
          </select>
        </div>
      </header>

      {city.highlights?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {city.highlights.map((h) => (
            <span key={h} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
              {h}
            </span>
          ))}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((card, idx) => (
          <motion.div key={`${city.cityId}-${card.professionId}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.04 }}>
            <GlassCard className="flex h-full flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">{card.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{getCityName(city.cityId)}</p>
                </div>
                <DemandBadge level={card.demand} />
              </div>
              {card.profession && <p className="text-sm text-slate-300">{card.profession.shortDescription}</p>}
              <div className="mt-auto space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Зарплатный коридор (₸)</p>
                <p className="text-lg font-semibold text-white">{formatKzt(card.salaryMin, card.salaryMax)}</p>
                <p className="text-xs text-slate-500">{growthLabel(card.growthTrend)}</p>
                <p className="text-xs text-slate-500">{demandLabel(card.demand)}</p>
              </div>
              {card.profession && (
                <button type="button" onClick={() => setModalProfession(card.profession)} className="text-sm font-semibold text-indigo-300 hover:text-indigo-200">
                  Полное описание профессии
                </button>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <ProfessionModal profession={modalProfession} onClose={() => setModalProfession(null)} />
    </div>
  );
}
