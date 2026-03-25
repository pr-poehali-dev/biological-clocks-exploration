import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/20f7e267-3e5b-4023-a705-180a218b4651/files/cf8f48d9-48eb-47e1-a847-07b24ba5c81c.jpg";

function sineWavePath(width: number, height: number, amplitude: number, frequency: number, phase = 0) {
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
    { h: 6, color: "var(--gold)" },
    { h: 9, color: "var(--teal)" },
    { h: 12, color: "var(--teal)" },
    { h: 15, color: "var(--teal)" },
    { h: 18, color: "var(--gold)" },
    { h: 21, color: "#a07ae8" },
    { h: 0, color: "var(--text-dim)" },
    { h: 3, color: "var(--text-dim)" },
  ];

  const cx = 130, cy = 130, r = 100;

  return (
    <div className="flex items-center justify-center">
      <svg width="260" height="260" viewBox="0 0 260 260">
        <circle cx={cx} cy={cy} r={r + 18} fill="none" stroke="rgba(77,216,232,0.07)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(77,216,232,0.15)" strokeWidth="1" strokeDasharray="4 4" />

        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
          const x1 = cx + (r - 5) * Math.cos(a);
          const y1 = cy + (r - 5) * Math.sin(a);
          const x2 = cx + (r + 5) * Math.cos(a);
          const y2 = cy + (r + 5) * Math.sin(a);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={i % 6 === 0 ? "rgba(232,184,75,0.55)" : "rgba(77,216,232,0.18)"}
              strokeWidth={i % 6 === 0 ? 2 : 1} />
          );
        })}

        {hours.map(({ h, color }) => {
          const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
          return <circle key={h} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={4} fill={color} opacity={0.9} />;
        })}

        <path
          d={`M ${cx} ${cy} L ${cx + r * Math.cos((21 / 24) * Math.PI * 2 - Math.PI / 2)} ${cy + r * Math.sin((21 / 24) * Math.PI * 2 - Math.PI / 2)} A ${r} ${r} 0 1 1 ${cx + r * Math.cos((6 / 24) * Math.PI * 2 - Math.PI / 2)} ${cy + r * Math.sin((6 / 24) * Math.PI * 2 - Math.PI / 2)} Z`}
          fill="rgba(20,50,90,0.25)"
        />

        {(() => {
          const a = (angle / 360) * Math.PI * 2 - Math.PI / 2;
          return (
            <line x1={cx} y1={cy}
              x2={cx + (r - 15) * Math.cos(a)}
              y2={cy + (r - 15) * Math.sin(a)}
              stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" opacity={0.85} />
          );
        })()}

        <circle cx={cx} cy={cy} r={6} fill="var(--navy-mid)" stroke="var(--gold)" strokeWidth="1.5" />

        {[{ h: 6, txt: "06" }, { h: 12, txt: "12" }, { h: 18, txt: "18" }, { h: 0, txt: "00" }].map(({ h, txt }) => {
          const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
          return (
            <text key={h} x={cx + (r + 14) * Math.cos(a)} y={cy + (r + 14) * Math.sin(a) + 4}
              textAnchor="middle" fill="rgba(232,184,75,0.75)" fontSize="9" fontFamily="IBM Plex Mono, monospace">
              {txt}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function SineWaveChart() {
  const width = 600, height = 120;
  const path1 = sineWavePath(width * 2, height, 38, 1, 0);
  const path2 = sineWavePath(width * 2, height, 22, 1, Math.PI * 0.4);
  const path3 = sineWavePath(width * 2, height, 15, 2, Math.PI * 0.8);
  return (
    <div className="overflow-hidden rounded" style={{ background: "var(--navy-mid)", border: "1px solid rgba(77,216,232,0.12)" }}>
      <div className="px-4 pt-4 pb-1 flex gap-6 flex-wrap">
        {[
          { color: "var(--gold)", label: "Кортизол" },
          { color: "var(--teal)", label: "Температура тела" },
          { color: "#a07ae8", label: "Мелатонин" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-6 h-px" style={{ background: color }} />
            <span style={{ color: "var(--text-secondary)", fontSize: "0.7rem", fontFamily: "IBM Plex Mono, monospace" }}>{label}</span>
          </div>
        ))}
      </div>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ height: 100 }}>
        {[0, 6, 12, 18, 24].map((h) => (
          <line key={h} x1={(h / 24) * width} y1={0} x2={(h / 24) * width} y2={height}
            stroke="rgba(77,216,232,0.07)" strokeWidth="1" />
        ))}
        <g className="wave-animate">
          <path d={path1} fill="none" stroke="var(--gold)" strokeWidth="2" opacity="0.85" />
          <path d={path2} fill="none" stroke="var(--teal)" strokeWidth="1.5" opacity="0.75" />
          <path d={path3} fill="none" stroke="#a07ae8" strokeWidth="1.5" opacity="0.65" />
        </g>
      </svg>
      <div className="flex justify-between px-4 pb-3">
        {["00:00", "06:00", "12:00", "18:00", "24:00"].map((t) => (
          <span key={t} style={{ color: "var(--text-dim)", fontSize: "0.65rem", fontFamily: "IBM Plex Mono, monospace" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

const SECTIONS = [
  { path: "/mechanisms", icon: "Dna", color: "var(--teal)", label: "Механизмы", desc: "Молекулярная петля TTFL, SCN, Zeitgeber" },
  { path: "/health", icon: "Heart", color: "var(--gold)", label: "Здоровье", desc: "Иммунитет, метаболизм, хронофармакология" },
  { path: "/research", icon: "FlaskConical", color: "#a07ae8", label: "Исследования", desc: "Нобелевская 2017, TRE, передний край науки" },
  { path: "/sources", icon: "FileText", color: "#6ab87a", label: "Источники", desc: "8 рецензируемых публикаций с DOI" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            <div>
              <div className="section-label mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
                Хронобиология · Научный обзор
              </div>
              <h1 className="animate-fade-up opacity-0 gold-glow"
                style={{
                  fontFamily: "Cormorant, serif", fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  fontWeight: 300, lineHeight: 1.05, color: "var(--text-primary)",
                  marginBottom: "1.5rem", animationDelay: "0.2s", textAlign: "left"
                }}>
                Биологические<br />
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>часы</em>{" "}
                человека
              </h1>
              <p className="animate-fade-up opacity-0"
                style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 480, marginBottom: "2rem", fontWeight: 300, animationDelay: "0.3s", textAlign: "justify" }}>
                Внутренний хронометр организма, управляющий сном, обменом веществ, иммунитетом
                и когнитивными функциями — с точностью до нескольких минут в сутки.
              </p>
              <div className="flex flex-wrap gap-3 animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
                {["~24 ч. период", "SCN гипоталамуса", "400+ генов", "Нобелевская 2017"].map((tag) => (
                  <span key={tag} style={{
                    fontFamily: "IBM Plex Mono, monospace", fontSize: "0.68rem",
                    color: "var(--teal)", border: "1px solid rgba(77,216,232,0.25)",
                    padding: "4px 10px", borderRadius: 2, letterSpacing: "0.05em"
                  }}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="animate-fade-up opacity-0 flex flex-col items-center gap-6" style={{ animationDelay: "0.25s" }}>
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

      {/* Intro text */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="section-label mb-4 text-center">Введение</div>
          <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--text-primary)", marginBottom: "2rem" }}>
            Что такое биологические часы?
          </h2>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.85, fontWeight: 300 }} className="space-y-4">
            <p>
              Биологические часы — это молекулярный механизм, встроенный практически в каждую клетку живого
              организма. Они задают ритм примерно в 24 часа — так называемый циркадный ритм (от лат. circa dies —
              «около суток»). Этот ритм регулирует сон и бодрствование, температуру тела, выработку гормонов,
              активность иммунной системы и даже экспрессию тысяч генов.
            </p>
            <p>
              Главный «командный пункт» биологических часов у человека — супрахиазматическое ядро (СХЯ, или SCN)
              гипоталамуса, небольшая парная структура, содержащая около 20 000 нейронов. Она принимает световые
              сигналы от сетчатки и синхронизирует «периферические часы» во всех органах и тканях тела.
            </p>
            <p>
              В 2017 году Джеффри Холл, Майкл Росбаш и Майкл Янг получили Нобелевскую премию по физиологии
              и медицине за открытие молекулярного механизма, управляющего этими ритмами. Ключевым открытием
              стала транскрипционно-трансляционная петля обратной связи (TTFL) — элегантный молекулярный «маятник»,
              работающий во всех эукариотических клетках.
            </p>
          </div>
        </div>
      </section>

      <div className="h-divider" />

      {/* Hero image */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="rounded overflow-hidden relative" style={{ height: 280 }}>
            <img src={HERO_IMAGE} alt="Циркадные ритмы" className="w-full h-full object-cover" style={{ opacity: 0.45 }} />
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: "linear-gradient(to right, rgba(13,33,55,0.7), rgba(13,33,55,0.3))" }}>
              <div className="text-center px-6">
                <div style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 300, color: "var(--text-primary)", marginBottom: 8 }}>
                  «Жизнь — это не просто химия.<br />Жизнь — это химия во <em style={{ color: "var(--gold)" }}>времени</em>»
                </div>
                <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "var(--text-dim)" }}>
                  — Joseph Takahashi, хронобиолог
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-divider" />

      {/* Section navigation */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="section-label mb-4 text-center">Разделы сайта</div>
          <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 300, color: "var(--text-primary)", marginBottom: "3rem" }}>
            Изучите тему подробнее
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {SECTIONS.map(({ path, icon, color, label, desc }) => (
              <Link key={path} to={path}
                className="science-card p-6 rounded flex items-start gap-4 group"
                style={{ textDecoration: "none" }}>
                <div className="w-10 h-10 rounded flex-shrink-0 flex items-center justify-center"
                  style={{ background: `${color}18`, border: `1px solid ${color}35` }}>
                  <Icon name={icon} size={18} style={{ color }} />
                </div>
                <div className="flex-1">
                  <div style={{ fontFamily: "Cormorant, serif", fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{label}</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.82rem", fontWeight: 300 }}>{desc}</div>
                </div>
                <Icon name="ArrowRight" size={16} style={{ color: "var(--text-dim)", marginTop: 4, transition: "transform 0.2s" }} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
