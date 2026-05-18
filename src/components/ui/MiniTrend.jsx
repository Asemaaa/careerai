/** Простой «спарклайн» для премиального UI — статичные точки рынка (демо). */
export default function MiniTrend({ className = '' }) {
  const bars = [40, 65, 55, 80, 70, 90, 75, 95];
  return (
    <div className={`flex h-12 items-end gap-1 ${className}`}>
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-2 rounded-t bg-gradient-to-t from-indigo-600/40 to-sky-400/90 transition-all duration-500 hover:to-fuchsia-400/90"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
