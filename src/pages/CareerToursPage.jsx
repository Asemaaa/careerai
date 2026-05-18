import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import tours from '../data/tours.json';
import weeklyProgram from '../data/weeklyProgram.json';
import professions from '../data/professions.json';
import GlassCard from '../components/ui/GlassCard.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import { formatKztSingle, getCityName } from '../utils/careerEngine.js';

const hintGradients = {
  'it-office': 'from-slate-900 via-indigo-950 to-sky-900',
  hospital: 'from-slate-900 via-emerald-950 to-teal-900',
  police: 'from-slate-900 via-blue-950 to-indigo-900',
  university: 'from-slate-900 via-violet-950 to-fuchsia-900',
  school: 'from-slate-900 via-amber-950 to-orange-900',
  oil: 'from-slate-900 via-orange-950 to-amber-900',
  rescue: 'from-slate-900 via-red-950 to-orange-900',
  startup: 'from-slate-900 via-cyan-950 to-indigo-900',
};

function TourMedia({ hint }) {
  const g = hintGradients[hint] || hintGradients['it-office'];
  return (
    <div className={`relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${g}`}>
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.2),transparent_45%)]" />
      <Play className="relative ml-1 h-14 w-14 text-white/90 drop-shadow-lg" strokeWidth={1.2} />
      <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-[11px] text-slate-100 backdrop-blur-md">Видео-плейсхолдер</span>
    </div>
  );
}

export default function CareerToursPage() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Field Programs"
        title="Профтуры и экскурсии"
        subtitle="IT, медицина, полиция ЗКО, вузы, МЧС, нефтегаз — реальные организации Казахстана."
      />

      <GlassCard variant="large" className="!border-sky-500/20 !bg-gradient-to-br !from-sky-500/10 !to-transparent !shadow-glow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">{weeklyProgram.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{weeklyProgram.subtitle}</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {formatKztSingle(weeklyProgram.price)}
              <span className="text-sm font-normal text-slate-400"> / программа</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">Города: {weeklyProgram.cities.map(getCityName).join(', ')}</p>
          </div>
          <ul className="max-w-md space-y-2 text-sm text-slate-200">
            {weeklyProgram.includes.map((line) => (
              <li key={line} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {line}
              </li>
            ))}
          </ul>
          <Button to="/booking" className="shrink-0 self-start lg:self-center">
            Забронировать неделю
          </Button>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-2">
        {tours.map((tour) => {
          const cats = tour.professionIds.map((id) => professions.find((p) => p.id === id)?.title).filter(Boolean);
          return (
            <GlassCard key={tour.id} className="flex flex-col gap-4">
              <TourMedia hint={tour.imageHint} />
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
                  <MapPin className="h-3.5 w-3.5" />
                  {getCityName(tour.cityId)}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
                  <Calendar className="h-3.5 w-3.5" />
                  {tour.duration}
                </span>
                <span className="rounded-full bg-indigo-500/15 px-2 py-1 text-indigo-200 ring-1 ring-indigo-400/30">{tour.category}</span>
              </div>
              <h2 className="font-display text-xl font-semibold text-white">{tour.title}</h2>
              <p className="text-sm font-medium text-slate-200">{tour.organization}</p>
              <p className="text-sm text-slate-400">{tour.description}</p>
              <button type="button" onClick={() => setExpanded(expanded === tour.id ? null : tour.id)} className="text-left text-xs font-semibold text-indigo-300 hover:text-indigo-200">
                {expanded === tour.id ? 'Свернуть программу' : 'Программа дня и результаты'}
              </button>
              {expanded === tour.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3 text-sm text-slate-300">
                  <div>
                    <p className="font-semibold text-white">Расписание</p>
                    <ul className="mt-1 list-disc pl-5">
                      {tour.weeklyProgram.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Итоги для ученика</p>
                    <ul className="mt-1 list-disc pl-5">
                      {tour.outcomes.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-slate-500">{tour.experience}</p>
                </motion.div>
              )}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <p className="text-lg font-bold text-white">{formatKztSingle(tour.price)}</p>
                <Button to="/booking" variant="primary">
                  Забронировать тур
                </Button>
              </div>
              {cats.length > 0 && <p className="text-xs text-slate-500">Профессии: {cats.join(', ')}</p>}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
