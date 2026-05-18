import { motion } from 'framer-motion';
import {
  Cpu,
  HeartPulse,
  GraduationCap,
  Shield,
  Briefcase,
  Factory,
  Palette,
} from 'lucide-react';

const map = {
  it: { Icon: Cpu, gradient: 'from-indigo-600 via-violet-600 to-sky-500' },
  medicine: { Icon: HeartPulse, gradient: 'from-rose-600 via-red-700 to-orange-600' },
  education: { Icon: GraduationCap, gradient: 'from-amber-500 via-orange-600 to-yellow-500' },
  government: { Icon: Shield, gradient: 'from-slate-600 via-blue-800 to-indigo-700' },
  business: { Icon: Briefcase, gradient: 'from-emerald-600 via-teal-600 to-cyan-500' },
  engineering: { Icon: Factory, gradient: 'from-orange-600 via-amber-700 to-yellow-600' },
  creative: { Icon: Palette, gradient: 'from-fuchsia-600 via-pink-600 to-violet-500' },
};

export default function ProfessionVisual({ category = 'it', className = '' }) {
  const { Icon, gradient } = map[category] || map.it;
  return (
    <motion.div
      className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
      <Icon className="relative h-14 w-14 text-white/90 drop-shadow-lg" strokeWidth={1.5} />
      <motion.div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
}
