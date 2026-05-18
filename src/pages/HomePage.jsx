import { motion } from 'framer-motion';
import { Brain, MapPin, Building2, GraduationCap, Sparkles, LineChart, Shield } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import StatCounter from '../components/ui/StatCounter.jsx';
import MiniTrend from '../components/ui/MiniTrend.jsx';
import pricing from '../data/pricing.json';
import weeklyProgram from '../data/weeklyProgram.json';
import professions from '../data/professions.json';

const features = [
  {
    title: 'AI-подбор профессий',
    body: 'Профессиональный тест из 20 вопросов и математическое сопоставление с реальными профилями востребованных специальностей в РК.',
    icon: Brain,
  },
  {
    title: 'Рынок труда по городам',
    body: 'Уральск, Алматы, Астана, Атырау, Актобе, Шымкент, Караганда — зарплаты в тенге и уровень спроса по отраслям.',
    icon: MapPin,
  },
  {
    title: 'Вузы Казахстана',
    body: 'ЗКУ, ЗКАТУ, КазНУ, Назарбаев Университет, Satbayev, SDU, КБТУ — специальности, приём и связь с профессиями.',
    icon: GraduationCap,
  },
  {
    title: 'Профтуры и организации',
    body: 'День в IT, больнице, полиции ЗКО, вузе, школе, МЧС, нефтегазе — с программой, ценой в ₸ и итогами для портфолио.',
    icon: Building2,
  },
  {
    title: 'Недельные интенсивы',
    body: weeklyProgram.title + ' — ' + weeklyProgram.includes.slice(0, 2).join('; ') + '.',
    icon: LineChart,
  },
  {
    title: 'Безопасность данных',
    body: 'Формы регистрации и бронирования работают локально (демо). Готово к подключению бэкенда и госAPI.',
    icon: Shield,
  },
];

export default function HomePage() {
  const pg = pricing.careerGuidance;
  const wk = pricing.weeklyTours;

  return (
    <div className="space-y-24 sm:space-y-28">
      <section className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-indigo-100"
          >
            <Sparkles className="h-4 w-4 text-sky-300" />
            Профориентация для Казахстана · Уральск и все регионы
          </motion.div>
          <motion.h1
            className="mt-6 font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            Карьера, которую вы <span className="text-gradient">строите осознанно</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            CareerAI — экосистема для школьников и молодёжи: тесты, аналитика рынка, вузы, профтуры в реальные организации
            Казахстана и запись на программы в тенге.
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
            <Button to="/career-test" className="px-7 py-3 text-base">
              Пройти профориентацию
            </Button>
            <Button to="/booking" variant="ghost" className="px-7 py-3 text-base">
              Записаться на тур
            </Button>
          </motion.div>

          <motion.div
            className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <StatCounter value={professions.length} label="профессий в базе" />
            <StatCounter value={20} label="вопросов в тесте" />
            <StatCounter value={7} label="городов РК" />
            <StatCounter value={8} label="форматов туров" />
          </motion.div>
        </div>

        <motion.div className="relative" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12, duration: 0.55 }}>
          <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-indigo-600/35 via-fuchsia-600/20 to-sky-500/25 blur-3xl" />
          <div className="glass relative overflow-hidden rounded-3xl p-8 shadow-glow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Рынок труда РК</span>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
                Live-аналитика (демо)
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-300">Динамика интереса к IT и медицине в крупных агломерациях (визуализация MVP).</p>
            <MiniTrend className="mt-8" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-xs text-slate-500">{pg.title}</p>
                <p className="mt-2 font-display text-2xl font-bold text-white">
                  {new Intl.NumberFormat('ru-KZ').format(pg.price)} ₸
                </p>
                <p className="mt-1 text-xs text-slate-400">{pg.period}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-xs text-slate-500">{wk.title}</p>
                <p className="mt-2 font-display text-2xl font-bold text-white">
                  {new Intl.NumberFormat('ru-KZ').format(wk.priceMin)} – {new Intl.NumberFormat('ru-KZ').format(wk.priceMax)} ₸
                </p>
                <p className="mt-1 text-xs text-slate-400">{wk.period}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Платформа"
          title="Инструменты, которые ожидают от AI-стартапа в образовании"
          subtitle="Маршрут: тест → рекомендации → вузы → туры → бронирование. Все данные в JSON — легко подключить API МОН РК и работодателей."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map(({ title, body, icon: Icon }) => (
            <GlassCard key={title} className="flex flex-col gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-glow">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <GlassCard className="space-y-4">
          <SectionHeading
            eyebrow="О проекте"
            title="Мы создаём цифровой слой между школой, вузом и работодателем"
            subtitle="CareerAI ориентирован на реалии Казахстана: Уральск как точка входа в ЗКО, плюс национальные центры в Алматы и Астане."
          />
          <p className="text-sm leading-relaxed text-slate-300">
            Платформа объединяет профориентацию, рыночные данные и полевые программы. Это не учебный макет: структура готова к
            интеграции платежей, CRM и личного кабинета.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button to="/universities" variant="ghost">
              Каталог вузов
            </Button>
            <Button to="/professions" variant="subtle">
              Все профессии
            </Button>
          </div>
        </GlassCard>
        <GlassCard className="space-y-4">
          <h3 className="font-display text-xl font-semibold text-white">Недельная программа</h3>
          <p className="text-sm text-slate-400">{weeklyProgram.subtitle}</p>
          <ul className="space-y-2 text-sm text-slate-200">
            {weeklyProgram.days.map((d) => (
              <li key={d.day} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="font-mono text-indigo-300">День {d.day}</span>
                <span>{d.theme}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500">Стоимость от {new Intl.NumberFormat('ru-KZ').format(weeklyProgram.price)} ₸</p>
        </GlassCard>
      </section>
    </div>
  );
}
