import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import demandByCity from '../data/demandByCity.json';
import professions from '../data/professions.json';
import GlassCard from '../components/ui/GlassCard.jsx';
import DemandBadge from '../components/ui/DemandBadge.jsx';
import ProfessionModal from '../components/profession/ProfessionModal.jsx';
import { formatSalaryRange } from '../utils/careerEngine.js';

export default function DemandedProfessionsPage() {
  const [cityId, setCityId] = useState(demandByCity[0].cityId);
  const [modalProfession, setModalProfession] = useState(null);

  const city = useMemo(() => demandByCity.find((c) => c.cityId === cityId) || demandByCity[0], [cityId]);

  const cards = useMemo(() => {
    return city.items.map((row) => {
      const base = professions.find((p) => p.id === row.professionId);
      return {
        ...row,
        title: base?.title || row.professionId,
        shortDescription: base?.shortDescription || '',
        profession: base,
      };
    });
  }, [city]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">Labor market lens</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Demanded professions by city</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
            Filter cards by metro area. Each row pulls salary overrides from JSON while descriptions reuse the shared profession catalog.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            City filter
          </label>
          <select
            id="city"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none ring-indigo-400/40 focus:ring-2"
          >
            {demandByCity.map((c) => (
              <option key={c.cityId} value={c.cityId}>
                {c.cityName}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((card, idx) => (
          <motion.div
            key={`${city.cityId}-${card.professionId}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <GlassCard className="flex h-full flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">{card.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{city.cityName}</p>
                </div>
                <DemandBadge level={card.demand} />
              </div>
              <p className="text-sm text-slate-300">{card.shortDescription}</p>
              <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Salary range (localized mock)</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {formatSalaryRange(card.salaryMin, card.salaryMax, city.currency)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => card.profession && setModalProfession(card.profession)}
                className="text-sm font-semibold text-indigo-300 hover:text-indigo-200"
              >
                Open profession details
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <ProfessionModal profession={modalProfession} onClose={() => setModalProfession(null)} />
    </div>
  );
}
