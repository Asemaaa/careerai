import { motion } from 'framer-motion';
import {
  Brain,
  MapPin,
  Route,
  Video,
  Building2,
  ShieldCheck,
  LineChart,
  Sparkles,
} from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';

const features = [
  {
    title: 'Interest-aware matching',
    body: 'Lightweight mock scoring maps your answers to profession tags — swap in a real model later.',
    icon: Brain,
  },
  {
    title: 'City-level demand',
    body: 'See how roles trend across metros with simple High / Medium / Low demand badges.',
    icon: MapPin,
  },
  {
    title: 'Career roadmaps',
    body: 'Phased learning paths help you translate curiosity into a credible plan.',
    icon: Route,
  },
  {
    title: 'Profession tours',
    body: 'Cinematic cards (video placeholders) explain what a day in the role actually feels like.',
    icon: Video,
  },
  {
    title: 'Company excursions',
    body: 'Virtual tour placeholders set the stage for real partnerships and field trips.',
    icon: Building2,
  },
  {
    title: 'Trust & safety by design',
    body: 'Dark, high-contrast UI with clear disclaimers — ready for policy copy from your team.',
    icon: ShieldCheck,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Hero */}
      <section className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-100"
          >
            <Sparkles className="h-4 w-4 text-sky-300" />
            AI-guided career clarity for students
          </motion.div>
          <motion.h1
            className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.55 }}
          >
            Find a career path that feels{' '}
            <span className="text-gradient">meant for you</span>.
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            CareerAI combines a friendly assessment, market signals, and immersive previews — all in a polished
            frontend you can extend with authentication and APIs when you are ready.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
          >
            <Button to="/career-test" className="px-6 py-3 text-base">
              Start Career Test
            </Button>
            <Button to="/demanded" variant="ghost" className="px-6 py-3 text-base">
              Explore demand by city
            </Button>
          </motion.div>
          <motion.div
            className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-emerald-300" />
              Outcomes-first storytelling
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-sky-300" />
              No accounts required (for now)
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-indigo-600/40 via-sky-500/20 to-fuchsia-500/30 blur-3xl" />
          <div className="glass relative overflow-hidden rounded-3xl p-6 shadow-glow">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Live preview</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
                Mock AI signal
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {['Interests mapped', 'Skills clustered', 'Cities compared'].map((label, idx) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-slate-400">Demo animation layer</p>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 opacity-90 animate-float" style={{ animationDelay: `${idx * 0.4}s` }} />
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-500">
              Replace this panel with charts, model explanations, or personalized insights from your backend.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="space-y-10">
        <SectionHeading
          eyebrow="Platform"
          title="Everything you need to explore careers with confidence"
          subtitle="Each block below maps to its own route in the app — great for demos, classrooms, and investor walkthroughs."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, body, icon: Icon }) => (
            <GlassCard key={title} className="flex flex-col gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/80 to-sky-500/70 text-white shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-slate-300">{body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <GlassCard className="space-y-4">
          <SectionHeading
            eyebrow="About CareerAI"
            title="Built like a real AI startup product — without the backend complexity yet."
            subtitle="The goal is a credible, responsive marketing + product shell you can grow into."
          />
          <p className="text-sm text-slate-300">
            Students get overwhelmed by static lists of jobs. CareerAI frames guidance as a journey: discover, compare
            markets, watch tours, and peek inside companies. When you connect real data, keep this narrative structure —
            it mirrors how people actually decide.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button to="/tours" variant="ghost">
              Browse profession tours
            </Button>
            <Button to="/excursions" variant="subtle">
              View business excursions
            </Button>
          </div>
        </GlassCard>
        <GlassCard className="space-y-4">
          <h3 className="font-display text-xl font-semibold text-white">What ships in this repo</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
              React Router pages for test, results, demand, tours, and excursions.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-indigo-400" />
              Mock JSON datasets in <code className="rounded bg-white/5 px-1">src/data</code> — safe to edit.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-fuchsia-400" />
              Glassmorphism UI, dark gradients, Framer Motion micro-interactions, Lucide icons.
            </li>
          </ul>
        </GlassCard>
      </section>
    </div>
  );
}
