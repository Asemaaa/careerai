import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StatCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = typeof value === 'number' ? value : parseInt(String(value).replace(/\D/g, ''), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplay(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.p
        className="font-display text-3xl font-bold text-white sm:text-4xl"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <span className="text-gradient">{display.toLocaleString('ru-KZ')}</span>
        {suffix}
      </motion.p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}
