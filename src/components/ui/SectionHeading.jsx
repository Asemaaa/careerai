export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <div className={`max-w-2xl space-y-3 ${alignClass}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="text-base text-slate-300">{subtitle}</p>}
    </div>
  );
}
