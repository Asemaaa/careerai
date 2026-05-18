import { motion } from 'framer-motion';

export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <motion.header
      className="mb-12 max-w-3xl sm:mb-16 lg:mb-20"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && <p className="badge-pill mb-6 w-fit">{eyebrow}</p>}
      <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {subtitle && <p className="mt-6 text-lg leading-relaxed text-slate-400 sm:text-xl">{subtitle}</p>}
      {children && <div className="mt-8">{children}</div>}
    </motion.header>
  );
}
