import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:flex-row sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-xl font-semibold text-white">CareerAI Казахстан</p>
          <p className="mt-2 max-w-sm text-sm text-slate-400">
            AI-платформа профориентации для школьников и молодёжи. Уральск, Алматы, Астана и весь Казахстан.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="font-semibold text-white">Платформа</p>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li><Link className="hover:text-white" to="/career-test">Профориентационный тест</Link></li>
              <li><Link className="hover:text-white" to="/professions">Профессии</Link></li>
              <li><Link className="hover:text-white" to="/demanded">Спрос по городам</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Обучение</p>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li><Link className="hover:text-white" to="/universities">Вузы</Link></li>
              <li><Link className="hover:text-white" to="/tours">Профтуры</Link></li>
              <li><Link className="hover:text-white" to="/booking">Запись</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Контакты</p>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li>Уральск, Казахстан</li>
              <li>info@careerai.kz</li>
              <li>+7 (7112) 00-00-00</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} CareerAI — профориентация для Казахстана
      </div>
    </footer>
  );
}
