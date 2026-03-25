import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/20f7e267-3e5b-4023-a705-180a218b4651/files/cf8f48d9-48eb-47e1-a847-07b24ba5c81c.jpg";

function sineWavePath(
  width: number,
  height: number,
  amplitude: number,
  frequency: number,
  phase: number = 0
): string {
  const points: string[] = [];
  for (let x = 0; x <= width; x += 2) {
    const y = height / 2 + amplitude * Math.sin((x / width) * frequency * Math.PI * 2 + phase);
    points.push(`${x},${y}`);
  }
  return "M " + points.join(" L ");
}

function CircadianClock() {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setAngle((a) => (a + 0.5) % 360), 50);
    return () => clearInterval(interval);
  }, []);

  const hours = [
    { h: 6, color: "#D4A843" },
    { h: 9, color: "#2AB8C8" },
    { h: 12, color: "#2AB8C8" },
    { h: 15, color: "#2AB8C8" },
    { h: 18, color: "#D4A843" },
    { h: 21, color: "#8A6BC0" },
    { h: 0, color: "#4A5A72" },
    { h: 3, color: "#4A5A72" },
  ];

  const cx = 130, cy = 130, r = 100;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="260" height="260" viewBox="0 0 260 260">
        <circle cx={cx} cy={cy} r={r + 18} fill="none" stroke="rgba(42,184,200,0.08)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(42,184,200,0.15)" strokeWidth="1" strokeDasharray="4 4" />

        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
          const x1 = cx + (r - 5) * Math.cos(a);
          const y1 = cy + (r - 5) * Math.sin(a);
          const x2 = cx + (r + 5) * Math.cos(a);
          const y2 = cy + (r + 5) * Math.sin(a);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={i % 6 === 0 ? "rgba(212,168,67,0.6)" : "rgba(42,184,200,0.2)"}
              strokeWidth={i % 6 === 0 ? 2 : 1} />
          );
        })}

        {hours.map(({ h, color }) => {
          const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
          const x = cx + r * Math.cos(a);
          const y = cy + r * Math.sin(a);
          return <circle key={h} cx={x} cy={y} r={4} fill={color} opacity={0.9} />;
        })}

        <path
          d={`M ${cx} ${cy} L ${cx + r * Math.cos((21 / 24) * Math.PI * 2 - Math.PI / 2)} ${cy + r * Math.sin((21 / 24) * Math.PI * 2 - Math.PI / 2)} A ${r} ${r} 0 1 1 ${cx + r * Math.cos((6 / 24) * Math.PI * 2 - Math.PI / 2)} ${cy + r * Math.sin((6 / 24) * Math.PI * 2 - Math.PI / 2)} Z`}
          fill="rgba(74, 90, 114, 0.12)"
        />

        {(() => {
          const a = (angle / 360) * Math.PI * 2 - Math.PI / 2;
          return (
            <line x1={cx} y1={cy}
              x2={cx + (r - 15) * Math.cos(a)}
              y2={cy + (r - 15) * Math.sin(a)}
              stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" opacity={0.8}
            />
          );
        })()}

        <circle cx={cx} cy={cy} r={6} fill="#111B2E" stroke="#D4A843" strokeWidth="1.5" />

        {[{ h: 6, txt: "06" }, { h: 12, txt: "12" }, { h: 18, txt: "18" }, { h: 0, txt: "00" }].map(({ h, txt }) => {
          const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
          const x = cx + (r + 14) * Math.cos(a);
          const y = cy + (r + 14) * Math.sin(a);
          return (
            <text key={h} x={x} y={y + 4} textAnchor="middle"
              fill="rgba(212,168,67,0.8)" fontSize="9"
              fontFamily="IBM Plex Mono, monospace">
              {txt}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function SineWaveChart() {
  const width = 600;
  const height = 120;
  const path1 = sineWavePath(width * 2, height, 38, 1, 0);
  const path2 = sineWavePath(width * 2, height, 22, 1, Math.PI * 0.4);
  const path3 = sineWavePath(width * 2, height, 15, 2, Math.PI * 0.8);

  return (
    <div className="overflow-hidden rounded" style={{ background: "#111B2E", border: "1px solid rgba(42,184,200,0.1)" }}>
      <div className="px-4 pt-4 pb-1 flex gap-6 flex-wrap">
        {[
          { color: "#D4A843", label: "Кортизол" },
          { color: "#2AB8C8", label: "Температура тела" },
          { color: "#8A6BC0", label: "Мелатонин" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-6 h-px" style={{ background: color }} />
            <span style={{ color: "#8A9BB5", fontSize: "0.7rem", fontFamily: "IBM Plex Mono, monospace" }}>{label}</span>
          </div>
        ))}
      </div>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ height: 100 }}>
        {[0, 6, 12, 18, 24].map((h) => (
          <line key={h} x1={(h / 24) * width} y1={0} x2={(h / 24) * width} y2={height}
            stroke="rgba(42,184,200,0.08)" strokeWidth="1" />
        ))}
        <g className="wave-animate">
          <path d={path1} fill="none" stroke="#D4A843" strokeWidth="2" opacity="0.8" />
          <path d={path2} fill="none" stroke="#2AB8C8" strokeWidth="1.5" opacity="0.7" />
          <path d={path3} fill="none" stroke="#8A6BC0" strokeWidth="1.5" opacity="0.6" />
        </g>
      </svg>
      <div className="flex justify-between px-4 pb-3">
        {["00:00", "06:00", "12:00", "18:00", "24:00"].map((t) => (
          <span key={t} style={{ color: "#4A5A72", fontSize: "0.65rem", fontFamily: "IBM Plex Mono, monospace" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function HealthImpactBars() {
  const data = [
    { label: "Иммунитет", value: 87, color: "#2AB8C8" },
    { label: "Метаболизм", value: 74, color: "#D4A843" },
    { label: "Когнитивные функции", value: 91, color: "#8A6BC0" },
    { label: "Сердечно-сосудистая система", value: 68, color: "#E07070" },
    { label: "Гормональный баланс", value: 95, color: "#6AB87A" },
    { label: "Психическое здоровье", value: 79, color: "#2AB8C8" },
  ];

  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-3">
      {data.map(({ label, value, color }) => (
        <div key={label}>
          <div className="flex justify-between mb-1">
            <span style={{ color: "#8A9BB5", fontSize: "0.8rem" }}>{label}</span>
            <span style={{ color, fontSize: "0.75rem", fontFamily: "IBM Plex Mono, monospace" }}>{value}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#162038" }}>
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: visible ? `${value}%` : "0%",
                background: `linear-gradient(90deg, ${color}80, ${color})`,
                transitionDelay: "0.2s"
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({ value, unit, label, sublabel }: { value: string; unit: string; label: string; sublabel: string }) {
  return (
    <div className="p-5 rounded" style={{ background: "#111B2E", border: "1px solid rgba(42,184,200,0.1)" }}>
      <div className="flex items-baseline gap-1 mb-1">
        <span style={{ fontFamily: "Cormorant, serif", fontSize: "2.8rem", fontWeight: 300, color: "#D4A843", lineHeight: 1 }}>{value}</span>
        <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.75rem", color: "#2AB8C8", marginBottom: 4 }}>{unit}</span>
      </div>
      <div style={{ color: "#E8EDF5", fontSize: "0.85rem", fontWeight: 500, marginBottom: 2 }}>{label}</div>
      <div style={{ color: "#4A5A72", fontSize: "0.72rem" }}>{sublabel}</div>
    </div>
  );
}

const SOURCES = [
  {
    index: "01", authors: "Takahashi J.S.", year: "2017",
    title: "Transcriptional architecture of the mammalian circadian clock",
    journal: "Nature Reviews Genetics", doi: "https://doi.org/10.1038/nrg.2016.150", tag: "Молекулярная биология"
  },
  {
    index: "02", authors: "Walker M.", year: "2017",
    title: "Why We Sleep: Unlocking the Power of Sleep and Dreams",
    journal: "Scribner", doi: "https://www.simonandschuster.com/books/Why-We-Sleep/Matthew-Walker/9781501144325", tag: "Нейронаука"
  },
  {
    index: "03", authors: "Roenneberg T., Merrow M.", year: "2016",
    title: "The Circadian Clock and Human Health",
    journal: "Current Biology", doi: "https://doi.org/10.1016/j.cub.2016.04.011", tag: "Здоровье"
  },
  {
    index: "04", authors: "Nobel Committee", year: "2017",
    title: "Discoveries of Molecular Mechanisms Controlling Circadian Rhythm",
    journal: "Nobel Prize in Physiology or Medicine", doi: "https://www.nobelprize.org/prizes/medicine/2017/press-release/", tag: "Нобелевская премия"
  },
  {
    index: "05", authors: "Scheiermann C., Kunisaki Y., Frenette P.S.", year: "2013",
    title: "Circadian control of the immune system",
    journal: "Nature Reviews Immunology", doi: "https://doi.org/10.1038/nri3386", tag: "Иммунология"
  },
  {
    index: "06", authors: "Garaulet M. et al.", year: "2013",
    title: "Timing of food intake predicts weight loss effectiveness",
    journal: "International Journal of Obesity", doi: "https://doi.org/10.1038/ijo.2012.229", tag: "Метаболизм"
  }
];

const NAV_SECTIONS = [
  { id: "intro", label: "Введение" },
  { id: "mechanisms", label: "Механизмы" },
  { id: "health", label: "Здоровье" },
  { id: "research", label: "Исследования" },
  { id: "sources", label: "Источники" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("intro");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen grid-bg" style={{ background: "#0C1420" }}>
      {/* Navigation */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(12, 20, 32, 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(42,184,200,0.08)"
      }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 relative flex items-center justify-center">
              <div className="w-full h-full rounded-full border" style={{ borderColor: "#D4A843", opacity: 0.8 }} />
              <div className="absolute w-2 h-2 rounded-full" style={{ background: "#D4A843" }} />
            </div>
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.7rem", color: "#4A5A72", letterSpacing: "0.1em" }}>
              CHRONOBIOLOGY
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_SECTIONS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="nav-link"
                style={activeSection === id ? { color: "#D4A843" } : {}}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="intro" className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
            <div>
              <div className="section-label mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
                Хронобиология · Научный обзор
              </div>
              <h1 className="gold-glow animate-fade-up opacity-0"
                style={{
                  fontFamily: "Cormorant, serif", fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  fontWeight: 300, lineHeight: 1.05, color: "#E8EDF5",
                  marginBottom: "1.5rem", animationDelay: "0.2s"
                }}>
                Биологические<br />
                <em style={{ color: "#D4A843", fontStyle: "italic" }}>часы</em>{" "}
                человека
              </h1>
              <p className="animate-fade-up opacity-0"
                style={{ color: "#8A9BB5", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 480, marginBottom: "2rem", fontWeight: 300, animationDelay: "0.3s" }}>
                Внутренний хронометр организма, управляющий сном, обменом веществ, иммунитетом
                и когнитивными функциями — с точностью до нескольких минут в сутки.
              </p>
              <div className="flex flex-wrap gap-3 animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
                {["~24 ч. период", "SCN гипоталамуса", "400+ генов", "Нобелевская 2017"].map((tag) => (
                  <span key={tag} style={{
                    fontFamily: "IBM Plex Mono, monospace", fontSize: "0.68rem",
                    color: "#2AB8C8", border: "1px solid rgba(42,184,200,0.25)",
                    padding: "4px 10px", borderRadius: 2, letterSpacing: "0.05em"
                  }}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="animate-fade-up opacity-0 flex flex-col items-center gap-6" style={{ animationDelay: "0.3s" }}>
              <CircadianClock />
              <div className="w-full">
                <div className="section-label mb-3">Суточные осцилляции биомаркеров</div>
                <SineWaveChart />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-divider" />

      {/* Mechanisms */}
      <section id="mechanisms" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div className="section-label mb-4">Раздел 02 · Молекулярные механизмы</div>
            <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: "#E8EDF5" }}>
              Как работают<br /><em style={{ color: "#D4A843" }}>циркадные ритмы</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {[
              {
                icon: "Brain", title: "SCN — главный осциллятор", color: "#D4A843",
                text: "Супрахиазматическое ядро гипоталамуса содержит ~20 000 нейронов, синхронизированных световыми сигналами через ретиногипоталамический тракт."
              },
              {
                icon: "Dna", title: "Молекулярный механизм", color: "#2AB8C8",
                text: "Транскрипционно-трансляционная петля обратной связи: гены CLOCK/BMAL1 активируют PER и CRY, которые блокируют собственную транскрипцию за ~24 часа."
              },
              {
                icon: "Sun", title: "Захватчики ритма (Zeitgeber)", color: "#8A6BC0",
                text: "Свет — главный синхронизатор. Но также: температура, приём пищи, физическая активность и социальное взаимодействие сдвигают внутренний цикл."
              },
            ].map(({ icon, title, text, color }) => (
              <div key={title} className="science-card p-6 rounded">
                <div className="w-10 h-10 rounded mb-4 flex items-center justify-center"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon name={icon} size={18} style={{ color }} />
                </div>
                <h3 style={{ fontFamily: "Cormorant, serif", fontSize: "1.3rem", fontWeight: 600, color: "#E8EDF5", marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "#8A9BB5", fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 300 }}>{text}</p>
              </div>
            ))}
          </div>

          <div className="rounded p-8" style={{ background: "#111B2E", border: "1px solid rgba(42,184,200,0.1)" }}>
            <div className="section-label mb-6">Петля обратной связи TTFL</div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 flex-wrap">
              {[
                { label: "CLOCK + BMAL1", sub: "Активаторы", color: "#D4A843", icon: "Zap" },
                { label: "→", color: "#4A5A72", icon: null },
                { label: "PER + CRY", sub: "Репрессоры", color: "#2AB8C8", icon: "Moon" },
                { label: "→", color: "#4A5A72", icon: null },
                { label: "Блок транскрипции", sub: "~8–12 ч.", color: "#8A6BC0", icon: "Lock" },
                { label: "↺", sub: "24 ч.", color: "#D4A843", icon: null },
              ].map((step, i) => (
                step.icon ? (
                  <div key={i} className="flex flex-col items-center gap-2 px-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                      <Icon name={step.icon} size={18} style={{ color: step.color }} />
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#E8EDF5", textAlign: "center" }}>{step.label}</span>
                    <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.62rem", color: "#4A5A72" }}>{step.sub}</span>
                  </div>
                ) : (
                  <div key={i} style={{ fontSize: step.label === "↺" ? "2rem" : "1.5rem", color: step.color, fontWeight: 300, padding: "0 8px" }}>
                    {step.label}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-divider" />

      {/* Health */}
      <section id="health" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div className="section-label mb-4">Раздел 03 · Клинические данные</div>
            <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: "#E8EDF5" }}>
              Влияние на здоровье<br /><em style={{ color: "#D4A843" }}>и самочувствие</em>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-14">
            <div>
              <div className="section-label mb-4">Зависимость систем организма от ритма</div>
              <HealthImpactBars />
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Нарушение ритма и онкология", icon: "AlertTriangle", color: "#E07070",
                  text: "Работники ночных смен имеют на 40–60% повышенный риск рака молочной железы. ВОЗ классифицировала циркадные нарушения как вероятный канцероген (2А)."
                },
                {
                  title: "Хронотип и академическая успеваемость", icon: "BookOpen", color: "#2AB8C8",
                  text: "«Совы» в системе раннего начала занятий показывают результаты на 15–20% ниже потенциала. Сдвиг расписания на 1 час повышает успеваемость на 6–9%."
                },
                {
                  title: "Хронофармакология", icon: "Pill", color: "#D4A843",
                  text: "Время приёма ряда препаратов (статины, химиотерапия, аспирин) влияет на эффективность на 50–200%. Новая область — хронотерапия."
                },
              ].map(({ title, text, icon, color }) => (
                <div key={title} className="p-5 rounded flex gap-4" style={{ background: "#111B2E", border: "1px solid rgba(42,184,200,0.1)" }}>
                  <div className="w-8 h-8 flex-shrink-0 rounded flex items-center justify-center mt-0.5"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon name={icon} size={14} style={{ color }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "Cormorant, serif", fontSize: "1.1rem", fontWeight: 600, color: "#E8EDF5", marginBottom: 4 }}>{title}</h3>
                    <p style={{ color: "#8A9BB5", fontSize: "0.82rem", lineHeight: 1.65, fontWeight: 300 }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="40" unit="%" label="Риск диабета 2 типа" sublabel="при постоянном десинхрозе" />
            <StatCard value="2×" unit="чаще" label="Сердечно-сосудистые события" sublabel="в первые часы после пробуждения" />
            <StatCard value="27" unit="%" label="Снижение иммунного ответа" sublabel="при 6 часах сна вместо 8" />
            <StatCard value="±45" unit="мин" label="Суточное «окно» хронотипа" sublabel="допустимый сдвиг без последствий" />
          </div>
        </div>
      </section>

      <div className="h-divider" />

      {/* Research */}
      <section id="research" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div className="section-label mb-4">Раздел 04 · Актуальные исследования</div>
            <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: "#E8EDF5" }}>
              Научный фронтир<br /><em style={{ color: "#D4A843" }}>хронобиологии</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                year: "2017", badge: "Нобелевская премия", badgeColor: "#D4A843",
                title: "Открытие молекулярного механизма",
                text: "Джеффри Холл, Майкл Росбаш и Майкл Янг получили Нобелевскую премию за раскрытие молекулярных механизмов, контролирующих циркадный ритм у мух Drosophila — и, как оказалось, у всех эукариот включая человека.",
                image: HERO_IMAGE
              },
              {
                year: "2023–2025", badge: "Прорыв", badgeColor: "#2AB8C8",
                title: "Периферические часы и метаболизм",
                text: "Открытие, что каждая клетка тела содержит собственные часы, синхронизированные через SCN и сигналы питания. Интервальное голодание (Time-Restricted Eating) использует эти механизмы для метаболической коррекции.",
              }
            ].map(({ year, badge, badgeColor, title, text, image }) => (
              <div key={title} className="rounded overflow-hidden" style={{ background: "#111B2E", border: "1px solid rgba(42,184,200,0.1)" }}>
                {image && (
                  <div className="h-40 overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover opacity-60" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "#4A5A72" }}>{year}</span>
                    <span style={{
                      fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem",
                      color: badgeColor, border: `1px solid ${badgeColor}40`,
                      padding: "2px 8px", borderRadius: 2
                    }}>{badge}</span>
                  </div>
                  <h3 style={{ fontFamily: "Cormorant, serif", fontSize: "1.3rem", fontWeight: 600, color: "#E8EDF5", marginBottom: 8 }}>{title}</h3>
                  <p style={{ color: "#8A9BB5", fontSize: "0.83rem", lineHeight: 1.7, fontWeight: 300 }}>{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded p-8" style={{ background: "#111B2E", border: "1px solid rgba(42,184,200,0.1)" }}>
            <div className="section-label mb-6">Масштаб научного интереса</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: "48 000+", label: "Статей в PubMed по circadian rhythm", note: "за последние 10 лет" },
                { num: "~$2 млрд", label: "Финансирование хронобиологических исследований", note: "только в США и ЕС, 2020–2024" },
                { num: "12 часов", label: "Разница в экспрессии генов", note: "между ранними и поздними хронотипами" },
              ].map(({ num, label, note }) => (
                <div key={num} className="text-center">
                  <div style={{ fontFamily: "Cormorant, serif", fontSize: "2rem", fontWeight: 300, color: "#D4A843", marginBottom: 4 }}>{num}</div>
                  <div style={{ color: "#E8EDF5", fontSize: "0.8rem", marginBottom: 2 }}>{label}</div>
                  <div style={{ color: "#4A5A72", fontSize: "0.7rem", fontFamily: "IBM Plex Mono, monospace" }}>{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-divider" />

      {/* Sources */}
      <section id="sources" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="section-label mb-4">Раздел 05 · Научные источники</div>
            <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: "#E8EDF5" }}>
              Цитируемые<br /><em style={{ color: "#D4A843" }}>исследования</em>
            </h2>
            <p style={{ color: "#8A9BB5", fontSize: "0.85rem", marginTop: 12, fontWeight: 300 }}>
              Все утверждения в тексте опираются на рецензируемые публикации и официальные источники.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {SOURCES.map(({ index, authors, year, title, journal, doi, tag }) => (
              <a key={index} href={doi} target="_blank" rel="noopener noreferrer"
                className="source-card p-5 rounded block group"
                style={{ background: "#111B2E", borderLeft: "2px solid #1A7A87", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = "#D4A843")}
                onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = "#1A7A87")}>
                <div className="flex items-start gap-4">
                  <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "#1A7A87", minWidth: 24, marginTop: 2 }}>[{index}]</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span style={{ fontSize: "0.75rem", color: "#8A9BB5", fontWeight: 500 }}>{authors}</span>
                      <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "#4A5A72" }}>{year}</span>
                      <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.62rem", color: "#2AB8C8", border: "1px solid rgba(42,184,200,0.2)", padding: "1px 6px", borderRadius: 2 }}>{tag}</span>
                    </div>
                    <div style={{ fontFamily: "Cormorant, serif", fontSize: "1rem", fontWeight: 600, color: "#E8EDF5", marginBottom: 4, lineHeight: 1.35 }}>
                      {title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#4A5A72", fontStyle: "italic" }}>{journal}</div>
                  </div>
                  <Icon name="ExternalLink" size={13} style={{ color: "#4A5A72", flexShrink: 0, marginTop: 4 }} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(42,184,200,0.08)", padding: "2rem 1.5rem" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.68rem", color: "#4A5A72" }}>
            CHRONOBIOLOGY © 2024 · Научный обзор биологических часов
          </span>
          <div className="flex gap-6 flex-wrap">
            {NAV_SECTIONS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "#4A5A72", letterSpacing: "0.08em" }}
                className="hover:text-teal transition-colors">
                {label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}