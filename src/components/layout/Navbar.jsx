import { NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Button from '../ui/Button.jsx';

const linkClass = ({ isActive }) =>
  `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`;

const links = [
  { to: '/', label: 'Главная', end: true },
  { to: '/career-test', label: 'Тест' },
  { to: '/professions', label: 'Профессии' },
  { to: '/demanded', label: 'Спрос' },
  { to: '/universities', label: 'Вузы' },
  { to: '/tours', label: 'Туры' },
  { to: '/booking', label: 'Запись' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex shrink-0 items-center gap-2 font-display text-lg font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-400 shadow-glow">
            <Sparkles className="h-5 w-5 text-white" aria-hidden />
          </span>
          CareerAI
          <span className="hidden text-xs font-normal text-slate-400 sm:inline">Казахстан</span>
        </NavLink>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Основная навигация">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} className={linkClass} end={end}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/register" variant="ghost" className="hidden sm:inline-flex text-xs sm:text-sm">
            Регистрация
          </Button>
          <Button to="/career-test" className="text-xs sm:text-sm">
            Пройти тест
          </Button>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-t border-white/5 px-3 py-2 lg:hidden">
        {links.map(({ to, label, end }) => (
          <NavLink key={to} to={to} className={linkClass} end={end}>
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
