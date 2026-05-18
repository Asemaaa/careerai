import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-white">CareerAI</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              AI-платформа профориентации для молодёжи Казахстана. Премиальный опыт выбора профессии, вуза и карьерного пути.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Продукт</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li><Link className="transition hover:text-sky-300" to="/career-test">Тест</Link></li>
                <li><Link className="transition hover:text-sky-300" to="/professions">Профессии</Link></li>
                <li><Link className="transition hover:text-sky-300" to="/demanded">Аналитика</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Программы</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li><Link className="transition hover:text-sky-300" to="/universities">Вузы</Link></li>
                <li><Link className="transition hover:text-sky-300" to="/tours">Туры</Link></li>
                <li><Link className="transition hover:text-sky-300" to="/booking">Бронирование</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Контакты</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li>Уральск, Казахстан</li>
                <li>info@careerai.kz</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-slate-600 sm:flex-row">
          <span>© {new Date().getFullYear()} CareerAI</span>
          <span className="text-slate-600">Профориентация нового поколения</span>
        </div>
      </div>
    </footer>
  );
}
