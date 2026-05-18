import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import professions from '../data/professions.json';
import tours from '../data/tours.json';
import cities from '../data/cities.json';
import pricing from '../data/pricing.json';
import weeklyProgram from '../data/weeklyProgram.json';
import GlassCard from '../components/ui/GlassCard.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import { formatKztSingle, getCityName, STORAGE_KEYS } from '../utils/careerEngine.js';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [professionId, setProfessionId] = useState(professions[0]?.id || '');
  const [tourId, setTourId] = useState(tours[0]?.id || '');
  const [product, setProduct] = useState('tour'); // tour | guidance | weekly
  const [cityId, setCityId] = useState('uralsk');
  const [date, setDate] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const price = useMemo(() => {
    if (product === 'guidance') return pricing.careerGuidance.price;
    if (product === 'weekly') return weeklyProgram.price;
    const t = tours.find((x) => x.id === tourId);
    return t?.price || 0;
  }, [product, tourId]);

  const submitBooking = () => {
    const entry = {
      professionId,
      tourId: product === 'tour' ? tourId : null,
      product,
      cityId,
      date,
      price,
      at: new Date().toISOString(),
    };
    try {
      const raw = sessionStorage.getItem(STORAGE_KEYS.bookings);
      const list = raw ? JSON.parse(raw) : [];
      list.push(entry);
      sessionStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(list));
    } catch {
      /* ignore */
    }
    setConfirmed(true);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHeader
        eyebrow="Checkout"
        title="Запись на программу"
        subtitle="Выберите продукт, профиль и дату. Демо-оплата в тенге без реальных списаний."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard
          className={`cursor-pointer !border-2 transition-all duration-300 ${product === 'guidance' ? '!border-sky-400/50 !bg-sky-500/10 !shadow-glow' : '!border-transparent'}`}
          onClick={() => setProduct('guidance')}
        >
          <p className="text-xs font-semibold uppercase text-slate-500">{pricing.careerGuidance.title}</p>
          <p className="mt-2 font-display text-2xl font-bold text-white">{formatKztSingle(pricing.careerGuidance.price)}</p>
          <ul className="mt-3 space-y-1 text-xs text-slate-400">
            {pricing.careerGuidance.features.slice(0, 3).map((f) => (
              <li key={f}>· {f}</li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard
          className={`cursor-pointer !border-2 transition-all duration-300 ${product === 'weekly' ? '!border-sky-400/50 !bg-sky-500/10 !shadow-glow' : '!border-transparent'}`}
          onClick={() => setProduct('weekly')}
        >
          <p className="text-xs font-semibold uppercase text-slate-500">Недельная программа</p>
          <p className="mt-2 font-display text-2xl font-bold text-white">{formatKztSingle(weeklyProgram.price)}</p>
          <p className="mt-2 text-xs text-slate-400">7 профессий · 5 организаций · куратор</p>
        </GlassCard>
        <GlassCard
          className={`cursor-pointer !border-2 transition-all duration-300 ${product === 'tour' ? '!border-sky-400/50 !bg-sky-500/10 !shadow-glow' : '!border-transparent'}`}
          onClick={() => setProduct('tour')}
        >
          <p className="text-xs font-semibold uppercase text-slate-500">Однодневный тур</p>
          <p className="mt-2 font-display text-2xl font-bold text-white">от {formatKztSingle(Math.min(...tours.map((t) => t.price)))}</p>
          <p className="mt-2 text-xs text-slate-400">Выбор тура на шаге 2</p>
        </GlassCard>
      </div>

      {!confirmed ? (
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <GlassCard className="space-y-4">
                <h2 className="font-display text-lg font-semibold text-white">Шаг 1 — параметры</h2>
                <div>
                  <label className="text-xs font-semibold text-slate-400">Интересующая профессия</label>
                  <select
                    value={professionId}
                    onChange={(e) => setProfessionId(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white"
                  >
                    {professions.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
                {product === 'tour' && (
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Тур / организация</label>
                    <select value={tourId} onChange={(e) => setTourId(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white">
                      {tours.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.title} — {getCityName(t.cityId)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Город проведения</label>
                    <select value={cityId} onChange={(e) => setCityId(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white">
                      {cities.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400">Предпочтительная дата</label>
                    <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white" />
                  </div>
                </div>
                <Button type="button" onClick={() => setStep(2)} disabled={!date} className="w-full justify-center">
                  К оплате
                </Button>
              </GlassCard>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <GlassCard className="space-y-6">
                <h2 className="font-display text-lg font-semibold text-white">Шаг 2 — оплата (демо)</h2>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/15 to-sky-500/10 p-6">
                  <p className="text-sm text-slate-300">К оплате</p>
                  <p className="mt-2 font-display text-3xl font-bold text-white">{formatKztSingle(price)}</p>
                  <p className="mt-2 text-xs text-slate-500">Kaspi Pay / карта банка РК — интеграция на бэкенде</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-4 text-center text-sm text-slate-400">Kaspi QR</div>
                  <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-4 text-center text-sm text-slate-400">Halyk / Freedom</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" type="button" onClick={() => setStep(1)}>
                    Назад
                  </Button>
                  <Button type="button" onClick={submitBooking} className="flex-1 justify-center">
                    Подтвердить бронирование
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <GlassCard className="border-emerald-500/30 bg-emerald-500/5 text-center">
          <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <p className="font-display text-2xl font-semibold text-white">Бронирование создано</p>
            <p className="mt-3 text-sm text-slate-400">
              {getCityName(cityId)} · {date} · {formatKztSingle(price)}
            </p>
            <p className="mt-2 text-xs text-slate-500">Запись сохранена в sessionStorage этого браузера.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/tours" variant="ghost">
                К турам
              </Button>
              <Button to="/">На главную</Button>
            </div>
          </motion.div>
        </GlassCard>
      )}
    </div>
  );
}
