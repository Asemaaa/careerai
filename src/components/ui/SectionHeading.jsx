export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <div className={`max-w-2xl space-y-4 ${alignClass}`}>
      {eyebrow && <p className="badge-pill w-fit">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">{title}</h2>
      {subtitle && <p className="text-base leading-relaxed text-slate-400 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
