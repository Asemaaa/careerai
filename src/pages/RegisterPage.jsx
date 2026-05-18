import { useState } from 'react';
import { motion } from 'framer-motion';
import cities from '../data/cities.json';
import GlassCard from '../components/ui/GlassCard.jsx';
import Button from '../components/ui/Button.jsx';
import { STORAGE_KEYS } from '../utils/careerEngine.js';

const initial = {
  fullName: '',
  age: '',
  cityId: 'uralsk',
  school: '',
  phone: '',
  email: '',
};

export default function RegisterPage() {
  const [form, setForm] = useState(initial);
  const [done, setDone] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    try {
      sessionStorage.setItem(STORAGE_KEYS.registration, JSON.stringify({ ...form, at: new Date().toISOString() }));
    } catch {
      /* ignore */
    }
    setDone(true);
  };

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/90">Аккаунт</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-white">Регистрация</h1>
        <p className="mt-2 text-sm text-slate-400">Данные сохраняются локально в браузере (демо). Подключите API для продакшена.</p>
      </header>

      {done ? (
        <GlassCard className="text-center">
          <motion.p initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-xl font-semibold text-white">
            Регистрация принята
          </motion.p>
          <p className="mt-3 text-sm text-slate-400">Мы сохранили ваши данные в этом браузере. Дальше — выбор тура или профориентация.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button to="/booking">Записаться на программу</Button>
            <Button to="/career-test" variant="ghost">
              Пройти тест
            </Button>
          </div>
        </GlassCard>
      ) : (
        <GlassCard>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400" htmlFor="fullName">
                ФИО полностью
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                value={form.fullName}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white outline-none ring-indigo-500/30 focus:ring-2"
                placeholder="Иванов Иван Иванович"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-400" htmlFor="age">
                  Возраст
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="14"
                  max="35"
                  required
                  value={form.age}
                  onChange={onChange}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400" htmlFor="cityId">
                  Город
                </label>
                <select
                  id="cityId"
                  name="cityId"
                  value={form.cityId}
                  onChange={onChange}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400" htmlFor="school">
                Школа / колледж
              </label>
              <input
                id="school"
                name="school"
                required
                value={form.school}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="Например, школа №12, Уральск"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400" htmlFor="phone">
                Телефон
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="+7 7XX XXX XX XX"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="you@mail.kz"
              />
            </div>
            <Button type="submit" className="w-full justify-center py-3">
              Создать профиль
            </Button>
          </form>
        </GlassCard>
      )}
    </div>
  );
}
