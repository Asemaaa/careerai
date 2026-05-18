import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, BookOpen, ExternalLink } from 'lucide-react';
import universities from '../data/universities.json';
import professions from '../data/professions.json';
import GlassCard from '../components/ui/GlassCard.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';

function UniVisual({ hint }) {
  const gradients = {
    'campus-west': 'from-indigo-900 via-slate-900 to-sky-900',
    'campus-agro': 'from-emerald-900 via-slate-900 to-lime-900',
    'campus-premium': 'from-violet-900 via-slate-900 to-fuchsia-900',
    'campus-almaty': 'from-rose-900 via-slate-900 to-amber-900',
    'campus-tech': 'from-cyan-900 via-slate-900 to-blue-900',
    'campus-private': 'from-fuchsia-900 via-slate-900 to-indigo-900',
    'campus-british': 'from-blue-900 via-slate-900 to-indigo-900',
  };
  const g = gradients[hint] || gradients['campus-west'];
  return <div className={`aspect-[16/9] rounded-t-2xl bg-gradient-to-br ${g}`} />;
}

export default function UniversitiesPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Образование"
        title="Вузы Казахстана"
        subtitle="ЗКУ, ЗКАТУ, NU, КазНУ, Satbayev, SDU, КБТУ — специальности и связь с профессиями."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {universities.map((u, idx) => (
          <motion.div key={u.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
            <GlassCard className="flex h-full flex-col gap-0 overflow-hidden p-0">
              <UniVisual hint={u.imageHint} />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
                    <MapPin className="h-3.5 w-3.5 text-sky-400" />
                    {u.city}
                  </span>
                  <span className="rounded-full bg-indigo-500/15 px-2 py-1 text-indigo-200 ring-1 ring-indigo-400/30">{u.type}</span>
                </div>
                <h2 className="font-display text-xl font-semibold text-white">{u.name}</h2>
                <p className="text-sm text-slate-400 line-clamp-3">{u.description}</p>
                <p className="text-xs text-slate-500">Сайт: {u.website}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <Button variant="subtle" onClick={() => setSelected(u)}>
                    Подробнее
                  </Button>
                  <Button to="/booking" variant="ghost">
                    Записаться на тур
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" aria-label="Закрыть" onClick={() => setSelected(null)} />
            <motion.div
              role="dialog"
              className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-slate-950 p-6 shadow-glow sm:rounded-3xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
            >
              <div className="flex justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold text-white">{selected.name}</h2>
                <button type="button" onClick={() => setSelected(null)} className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/5">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                {selected.city} · {selected.type}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{selected.description}</p>
              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <BookOpen className="h-4 w-4" /> Направления и специальности
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {selected.specialties.map((s) => (
                    <li key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-white">Связанные профессии</h3>
                <ul className="mt-2 space-y-1 text-sm text-indigo-200">
                  {selected.professionIds.map((pid) => {
                    const pr = professions.find((p) => p.id === pid);
                    return <li key={pid}>{pr?.title || pid}</li>;
                  })}
                </ul>
              </div>
              <p className="mt-6 text-sm text-slate-400">{selected.admission}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/booking" onClick={() => setSelected(null)}>
                  Записаться на экскурсию в вуз
                </Button>
                <a
                  href={`https://${selected.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Сайт вуза <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
