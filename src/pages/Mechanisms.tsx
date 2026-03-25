import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

function sineWavePath(width: number, height: number, amplitude: number, frequency: number, phase = 0) {
  const points: string[] = [];
  for (let x = 0; x <= width; x += 2) {
    const y = height / 2 + amplitude * Math.sin((x / width) * frequency * Math.PI * 2 + phase);
    points.push(`${x},${y}`);
  }
  return "M " + points.join(" L ");
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

export default function Mechanisms() {
  return (
    <Layout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-4">Раздел 02 · Молекулярная хронобиология</div>
            <h1 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Механизмы работы<br /><em style={{ color: "var(--gold)" }}>циркадных ритмов</em>
            </h1>
            <p style={{ color: "var(--text-secondary)", maxWidth: 600, margin: "1.5rem auto 0", lineHeight: 1.75, fontWeight: 300 }}>
              Биологические часы — это не метафора, а конкретный молекулярный механизм, сохранённый эволюцией
              от бактерий до человека. Его открытие было отмечено Нобелевской премией 2017 года.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {[
              {
                icon: "Brain", title: "SCN — главный осциллятор", color: "var(--gold)",
                text: "Супрахиазматическое ядро гипоталамуса содержит ~20 000 нейронов, синхронизированных световыми сигналами через ретиногипоталамический тракт. Это «главные часы» организма."
              },
              {
                icon: "Dna", title: "Молекулярная петля TTFL", color: "var(--teal)",
                text: "Транскрипционно-трансляционная петля обратной связи: гены CLOCK и BMAL1 активируют PER и CRY, которые блокируют собственную транскрипцию — цикл занимает ровно ~24 часа."
              },
              {
                icon: "Sun", title: "Zeitgeber — захватчики ритма", color: "#a07ae8",
                text: "Свет — главный синхронизатор. Но также: температура тела, время приёма пищи, физическая активность и социальные контакты сдвигают фазу внутренних часов."
              },
            ].map(({ icon, title, text, color }) => (
              <div key={title} className="science-card p-6 rounded">
                <div className="w-10 h-10 rounded mb-4 flex items-center justify-center"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                  <Icon name={icon} size={18} style={{ color }} />
                </div>
                <h3 style={{ fontFamily: "Cormorant, serif", fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 10 }}>{title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.84rem", lineHeight: 1.75, fontWeight: 300 }}>{text}</p>
              </div>
            ))}
          </div>

          <div className="mb-14">
            <div className="section-label mb-4 text-center">Суточные осцилляции биомаркеров</div>
            <SineWaveChart />
          </div>

          <div className="rounded p-8" style={{ background: "var(--navy-mid)", border: "1px solid rgba(77,216,232,0.12)" }}>
            <div className="section-label mb-8 text-center">Петля обратной связи TTFL — 24-часовой цикл</div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
              {[
                { label: "CLOCK + BMAL1", sub: "Активаторы транскрипции", color: "var(--gold)", icon: "Zap" },
                { label: "→", color: "var(--text-dim)", icon: null },
                { label: "PER + CRY", sub: "Белки-репрессоры", color: "var(--teal)", icon: "Moon" },
                { label: "→", color: "var(--text-dim)", icon: null },
                { label: "Блок транскрипции", sub: "Накопление за ~8–12 ч.", color: "#a07ae8", icon: "Lock" },
                { label: "↺", sub: "Итого 24 ч.", color: "var(--gold)", icon: null },
              ].map((step, i) => (
                step.icon ? (
                  <div key={i} className="flex flex-col items-center gap-2 px-5">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: `${step.color}18`, border: `1px solid ${step.color}35` }}>
                      <Icon name={step.icon} size={20} style={{ color: step.color }} />
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-primary)", textAlign: "center", fontWeight: 500 }}>{step.label}</span>
                    <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.62rem", color: "var(--text-dim)", textAlign: "center" }}>{step.sub}</span>
                  </div>
                ) : (
                  <div key={i} style={{ fontSize: step.label === "↺" ? "2.2rem" : "1.8rem", color: step.color, fontWeight: 300, padding: "0 4px" }}>
                    {step.label}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
