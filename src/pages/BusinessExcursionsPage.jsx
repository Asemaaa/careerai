import { Building2, Globe2, Users2, Scan } from 'lucide-react';
import companies from '../data/companies.json';
import GlassCard from '../components/ui/GlassCard.jsx';
import Button from '../components/ui/Button.jsx';

function VirtualPlaceholder({ label }) {
  return (
    <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/20 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_55%)]" />
      <div className="relative flex flex-col items-center gap-2 text-center">
        <Scan className="h-8 w-8 text-sky-300" />
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">Virtual tour</p>
        <p className="max-w-xs text-[11px] text-slate-400">{label}</p>
      </div>
    </div>
  );
}

export default function BusinessExcursionsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">Field experiences</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Business & company excursions</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
          Students explore cultures of innovation long before day one. These cards are structured for future booking flows,
          livestreams, or LMS embeds.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {companies.map((company) => (
          <GlassCard key={company.id} className="flex flex-col gap-4">
            <VirtualPlaceholder label={company.virtualTourLabel} />
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-2 py-1 font-semibold text-indigo-100 ring-1 ring-indigo-400/30">
                <Building2 className="h-3.5 w-3.5" />
                {company.industry}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
                <Globe2 className="h-3.5 w-3.5 text-sky-300" />
                {company.headquarters}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
                <Users2 className="h-3.5 w-3.5 text-emerald-300" />
                {company.employees} people
              </span>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-white">{company.name}</h2>
              <p className="mt-2 text-sm text-slate-300">{company.description}</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-3">
              <Button variant="primary">Join waitlist (coming soon)</Button>
              <Button variant="ghost" to="/tours">
                Pair with a profession tour
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
