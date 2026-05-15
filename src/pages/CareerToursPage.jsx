import { useState } from 'react';
import { Play, Timer } from 'lucide-react';
import tours from '../data/careerTours.json';
import professions from '../data/professions.json';
import GlassCard from '../components/ui/GlassCard.jsx';
import Button from '../components/ui/Button.jsx';
import ProfessionModal from '../components/profession/ProfessionModal.jsx';

const hintStyles = {
  terminal: 'from-slate-900 via-slate-800 to-indigo-900',
  canvas: 'from-fuchsia-900 via-slate-900 to-sky-900',
  charts: 'from-emerald-900 via-slate-900 to-cyan-900',
  campaign: 'from-amber-900 via-slate-900 to-orange-900',
};

function TourMedia({ hint }) {
  const gradient = hintStyles[hint] || hintStyles.terminal;
  return (
    <div className={`relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white, transparent 45%)' }} />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
        <Play className="ml-1 h-6 w-6 text-white" />
      </div>
      <p className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-slate-100 backdrop-blur-md">
        Video placeholder
      </p>
    </div>
  );
}

export default function CareerToursPage() {
  const [modalProfession, setModalProfession] = useState(null);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">Immersive previews</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Profession tours</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
          Each card is a launch point for future video content. Hook these up to your CMS or streaming provider when you are ready.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {tours.map((tour) => {
          const profession = professions.find((p) => p.id === tour.professionId);
          return (
            <GlassCard key={tour.id} className="flex flex-col gap-4">
              <TourMedia hint={tour.imageHint} />
              <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 font-semibold text-slate-200 ring-1 ring-white/10">
                  <Timer className="h-3.5 w-3.5" />
                  {tour.duration}
                </span>
                {profession && <span>{profession.title}</span>}
              </div>
              <h2 className="font-display text-lg font-semibold text-white">{tour.title}</h2>
              <p className="text-sm text-slate-300">{tour.description}</p>
              <div className="mt-auto flex flex-wrap gap-3">
                <Button variant="primary" onClick={() => profession && setModalProfession(profession)}>
                  Explore profession
                </Button>
                <Button variant="ghost" to="/results">
                  See sample results
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <ProfessionModal profession={modalProfession} onClose={() => setModalProfession(null)} />
    </div>
  );
}
