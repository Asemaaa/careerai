const tone = {
  high: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.12)]',
  medium: 'border-amber-400/25 bg-amber-500/10 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.08)]',
  low: 'border-slate-400/20 bg-slate-500/10 text-slate-300',
};

export default function DemandBadge({ level }) {
  const label = level === 'high' ? 'Высокий' : level === 'medium' ? 'Средний' : 'Низкий';
  return (
    <span className={`inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wide ${tone[level] || tone.medium}`}>
      Спрос · {label}
    </span>
  );
}
