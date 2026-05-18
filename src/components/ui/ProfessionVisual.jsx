import { motion } from 'framer-motion';
import { Cpu, HeartPulse, GraduationCap, Shield, Briefcase, Factory, Palette } from 'lucide-react';

const map = {
  it: { Icon: Cpu, gradient: 'from-sky-600/40 via-blue-900/60 to-navy-950' },
  medicine: { Icon: HeartPulse, gradient: 'from-rose-500/30 via-navy-900/80 to-navy-950' },
  education: { Icon: GraduationCap, gradient: 'from-amber-500/25 via-navy-900/70 to-navy-950' },
  government: { Icon: Shield, gradient: 'from-blue-600/35 via-navy-900/80 to-navy-950' },
  business: { Icon: Briefcase, gradient: 'from-emerald-500/25 via-navy-900/70 to-navy-950' },
  engineering: { Icon: Factory, gradient: 'from-orange-500/25 via-navy-900/70 to-navy-950' },
  creative: { Icon: Palette, gradient: 'from-violet-500/30 via-navy-900/70 to-navy-950' },
};

export default function ProfessionVisual({ category = 'it', className = '' }) {
  const { Icon, gradient } = map[category] || map.it;
  return (
    <div className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.2),transparent_55%)]" />
      <motion.div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-sky-400/25 bg-sky-500/10 backdrop-blur-xl">
        <Icon className="h-8 w-8 text-sky-200" strokeWidth={1.5} />
      </div>
    </div>
  );
}
