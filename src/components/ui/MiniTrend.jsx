export default function MiniTrend({ className = '' }) {
  const bars = [35, 58, 48, 72, 65, 88, 78, 100];
  return (
    <div className={`flex h-28 items-end justify-between gap-2 rounded-2xl border border-white/[0.06] bg-navy-950/50 p-4 ${className}`}>
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-lg bg-gradient-to-t from-sky-600/30 via-sky-400/80 to-sky-200/90 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-500 hover:from-sky-500/50 hover:to-white"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
