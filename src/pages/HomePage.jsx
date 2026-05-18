import { motion } from 'framer-motion';
import { Brain, MapPin, Building2, GraduationCap, Sparkles, LineChart, Shield, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import StatCounter from '../components/ui/StatCounter.jsx';
import MiniTrend from '../components/ui/MiniTrend.jsx';
import pricing from '../data/pricing.json';
import weeklyProgram from '../data/weeklyProgram.json';
import professions from '../data/professions.json';

const features = [
  { title: 'AI-подбор профессий', body: '20 вопросов и интеллектуальное сопоставление с профилями рынка РК.', icon: Brain },
  { title: 'Аналитика по городам', body: 'Уральск, Алматы, Астана и ещё 4 города — зарплаты в ₸.', icon: MapPin },
  { title: 'Вузы Казахстана', body: 'ЗКУ, ЗКАТУ, NU, КазНУ, Satbayev, SDU, КБТУ.', icon: GraduationCap },
  { title: 'Профтуры', body: 'IT, медицина, полиция ЗКО, вузы, МЧС, нефтегаз.', icon: Building2 },
  { title: 'Недельные интенсивы', body: weeklyProgram.title, icon: LineChart },
  { title: 'Enterprise-ready', body: 'Готово к API, платежам и личному кабинету.', icon: Shield },
];

const fade = { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } };

export default function HomePage() {
  const pg = pricing.careerGuidance;
  const wk = pricing.weeklyTours;

  return (
    <div className="space-y-32 sm:space-y-40">
      {/* Hero — presentation slide */}
      <section className="section-slide">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div {...fade}>
            <p className="badge-pill">
              <Sparkles className="h-3.5 w-3.5" />
              Казахстан · AI Career Platform
            </p>
            <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Будущее карьеры
              <span className="mt-2 block text-gradient">начинается с данных</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate-400">
              CareerAI — премиальная экосистема профориентации: тест, аналитика, вузы и полевые программы для молодёжи Казахстана.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button to="/career-test" className="!px-8 !py-4 text-base">
                Начать профориентацию
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/booking" variant="ghost" className="!px-8 !py-4 text-base">
                Записаться на тур
              </Button>
            </div>
          </motion.div>

          <motion.div {...fade} transition={{ delay: 0.12, duration: 0.7 }}>
            <div className="gradient-border shadow-float">
              <div className="gradient-border-inner p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-widest text-slate-500">Market Intelligence</span>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-200">
                    Live
                  </span>
                </div>
                <MiniTrend className="mt-8 border-0 bg-transparent p-0" />
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-5">
                    <p className="text-xs text-slate-500">{pg.title}</p>
                    <p className="mt-2 font-display text-2xl font-bold text-white">
                      {new Intl.NumberFormat('ru-KZ').format(pg.price)} ₸
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-5">
                    <p className="text-xs text-slate-500">Недельная программа</p>
                    <p className="mt-2 font-display text-2xl font-bold text-white">
                      {new Intl.NumberFormat('ru-KZ').format(wk.priceMin)}+
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bento */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCounter value={professions.length} label="профессий" />
        <StatCounter value={20} label="вопросов теста" />
        <StatCounter value={7} label="городов РК" />
        <StatCounter value={8} label="форматов туров" />
      </section>

      {/* Features bento grid */}
      <section>
        <SectionHeading
          eyebrow="Платформа"
          title="Всё для осознанного выбора профессии"
          subtitle="Презентационный уровень UX — как у ведущих AI и SaaS-продуктов."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, body, icon: Icon }, i) => (
            <GlassCard
              key={title}
              className={i === 0 || i === 3 ? 'lg:min-h-[220px]' : ''}
              variant={i === 0 ? 'large' : 'default'}
            >
              <div className="icon-ring">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Weekly program — full width slide */}
      <section className="section-slide bg-mesh-subtle">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="badge-pill">Интенсив</p>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">{weeklyProgram.title}</h2>
            <p className="mt-4 text-lg text-slate-400">{weeklyProgram.subtitle}</p>
            <p className="mt-8 font-display text-3xl font-bold text-gradient-blue">
              {new Intl.NumberFormat('ru-KZ').format(weeklyProgram.price)} ₸
            </p>
          </div>
          <div className="space-y-3">
            {weeklyProgram.days.map((d) => (
              <div
                key={d.day}
                className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 transition hover:border-sky-400/20 hover:bg-sky-500/[0.04]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 font-mono text-sm font-semibold text-sky-300">
                  {d.day}
                </span>
                <span className="text-sm text-slate-200">{d.theme}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <Button to="/tours">Смотреть все туры</Button>
        </div>
      </section>

      {/* CTA slide */}
      <section className="gradient-border">
        <div className="gradient-border-inner flex flex-col items-center px-8 py-16 text-center sm:px-16 sm:py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Готовы к следующему шагу?
          </h2>
          <p className="mt-4 max-w-md text-slate-400">Пройдите тест за 10 минут или запишитесь на профтур в вашем городе.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/career-test">Пройти тест</Button>
            <Button to="/register" variant="ghost">
              Создать профиль
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
