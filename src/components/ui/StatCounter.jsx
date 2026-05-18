import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StatCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = typeof value === 'number' ? value : parseInt(String(value).replace(/\D/g, ''), 10) || 0;
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplay(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6 text-center backdrop-blur-sm">
      <motion.p
        className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <span className="text-gradient-blue">{display.toLocaleString('ru-KZ')}</span>
        <span className="text-sky-400/80">{suffix}</span>
      </motion.p>
      <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}
