import { NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Button from '../ui/Button.jsx';

const linkClass = ({ isActive }) =>
  `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-all duration-300 ${
    isActive
      ? 'bg-white/10 text-white shadow-glow'
      : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
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
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-full border border-white/[0.08] bg-navy-900/70 px-4 py-2.5 shadow-glass-lg backdrop-blur-2xl sm:px-6">
        <NavLink to="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-glow">
            <Sparkles className="h-5 w-5 text-white" strokeWidth={2} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">CareerAI</span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} className={linkClass} end={end}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/register" variant="ghost" className="hidden !rounded-full sm:inline-flex">
            Войти
          </Button>
          <Button to="/career-test" className="!rounded-full">
            Начать
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-2 flex max-w-[1400px] gap-1 overflow-x-auto rounded-2xl border border-white/[0.06] bg-navy-900/50 px-2 py-2 backdrop-blur-xl lg:hidden">
        {links.map(({ to, label, end }) => (
          <NavLink key={to} to={to} className={linkClass} end={end}>
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
