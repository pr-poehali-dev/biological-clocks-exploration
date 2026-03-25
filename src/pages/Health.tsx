import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

function HealthImpactBars() {
  const data = [
    { label: "Иммунитет", value: 87, color: "var(--teal)" },
    { label: "Метаболизм", value: 74, color: "var(--gold)" },
    { label: "Когнитивные функции", value: 91, color: "#a07ae8" },
    { label: "Сердечно-сосудистая система", value: 68, color: "#e07070" },
    { label: "Гормональный баланс", value: 95, color: "#6ab87a" },
    { label: "Психическое здоровье", value: 79, color: "var(--teal)" },
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
    <div ref={ref} className="space-y-4">
      {data.map(({ label, value, color }) => (
        <div key={label}>
          <div className="flex justify-between mb-1.5">
            <span style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>{label}</span>
            <span style={{ color, fontSize: "0.75rem", fontFamily: "IBM Plex Mono, monospace", fontWeight: 500 }}>{value}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--navy-light)" }}>
            <div className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: visible ? `${value}%` : "0%", background: `linear-gradient(90deg, ${color}70, ${color})`, transitionDelay: "0.2s" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Health() {
  return (
    <Layout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-4">Раздел 03 · Клинические данные</div>
            <h1 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Влияние на здоровье<br /><em style={{ color: "var(--gold)" }}>и самочувствие</em>
            </h1>
            <p style={{ color: "var(--text-secondary)", maxWidth: 600, margin: "1.5rem auto 0", lineHeight: 1.75, fontWeight: 300 }}>
              Расстройства циркадных ритмов давно вышли за рамки просто «неудобства». Современная медицина
              рассматривает десинхроз как самостоятельный фактор риска множества заболеваний.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            <div>
              <div className="section-label mb-5">Степень зависимости систем организма от ритма</div>
              <HealthImpactBars />
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Нарушение ритма и онкология", icon: "AlertTriangle", color: "#e07070",
                  text: "Работники ночных смен имеют на 40–60% повышенный риск рака молочной железы. ВОЗ в 2007 году классифицировала сменный труд с нарушением циркадного ритма как вероятный канцероген группы 2А."
                },
                {
                  title: "Хронотип и успеваемость", icon: "BookOpen", color: "var(--teal)",
                  text: "«Совы» в системе раннего начала занятий демонстрируют результаты на 15–20% ниже своего потенциала. Сдвиг школьного расписания на 1 час повышает академическую успеваемость на 6–9%."
                },
                {
                  title: "Хронофармакология", icon: "Pill", color: "var(--gold)",
                  text: "Время приёма ряда препаратов — статинов, химиотерапевтических агентов, аспирина — влияет на их эффективность на 50–200%. Хронотерапия становится самостоятельной медицинской дисциплиной."
                },
              ].map(({ title, text, icon, color }) => (
                <div key={title} className="science-card p-5 rounded flex gap-4">
                  <div className="w-8 h-8 flex-shrink-0 rounded flex items-center justify-center mt-1"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon name={icon} size={14} style={{ color }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "Cormorant, serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>{title}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.75, fontWeight: 300 }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: "40", unit: "%", label: "Риск диабета 2 типа", sub: "при постоянном десинхрозе" },
              { value: "2×", unit: "чаще", label: "Сердечно-сосудистые события", sub: "в первые часы после пробуждения" },
              { value: "27", unit: "%", label: "Снижение иммунного ответа", sub: "при 6 ч. сна вместо 8" },
              { value: "±45", unit: "мин", label: "Суточное «окно» хронотипа", sub: "допустимый сдвиг без последствий" },
            ].map(({ value, unit, label, sub }) => (
              <div key={label} className="p-5 rounded text-center" style={{ background: "var(--navy-mid)", border: "1px solid rgba(77,216,232,0.12)" }}>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span style={{ fontFamily: "Cormorant, serif", fontSize: "2.6rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>{value}</span>
                  <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.7rem", color: "var(--teal)" }}>{unit}</span>
                </div>
                <div style={{ color: "var(--text-primary)", fontSize: "0.82rem", fontWeight: 500, marginBottom: 4 }}>{label}</div>
                <div style={{ color: "var(--text-dim)", fontSize: "0.7rem" }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Таблица */}
          <div>
            <div className="section-label mb-4 text-center">Сравнительная таблица: режим vs. здоровье</div>
            <div className="overflow-x-auto rounded" style={{ border: "1px solid rgba(77,216,232,0.12)" }}>
              <table className="w-full" style={{ borderCollapse: "collapse", fontFamily: "IBM Plex Sans, sans-serif" }}>
                <thead>
                  <tr style={{ background: "var(--navy-light)", borderBottom: "1px solid rgba(77,216,232,0.15)" }}>
                    {["Показатель здоровья", "Нормальный ритм", "Хронический десинхроз", "Острый сдвиг (джетлаг)", "Улучшение при коррекции"].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "var(--teal)", letterSpacing: "0.06em", fontWeight: 500, whiteSpace: "nowrap" }}>
                        {h.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: "Иммунный ответ", normal: "100%", chronic: "−27–35%", acute: "−15%", improve: "+18–22% за 2 нед." },
                    { metric: "Инсулиновая чувствительность", normal: "норма", chronic: "−30%", acute: "−20%", improve: "+25% за 4 нед." },
                    { metric: "Уровень кортизола (утро)", normal: "пик 8:00", chronic: "сглажен", acute: "сдвинут", improve: "восстановление 7–14 д." },
                    { metric: "Концентрация и память", normal: "100%", chronic: "−20–30%", acute: "−40%", improve: "+15–25% за 3 нед." },
                    { metric: "Синтез мелатонина", normal: "пик 02:00", chronic: "подавлен", acute: "сдвинут", improve: "быстрое восстановление" },
                    { metric: "Риск набора веса", normal: "базовый", chronic: "+33%", acute: "+10%", improve: "снижение при TRE" },
                    { metric: "Артериальное давление (утро)", normal: "нормальное", chronic: "повышено", acute: "вариабельно", improve: "+12% контроль" },
                  ].map((row, i) => (
                    <tr key={row.metric}
                      style={{ background: i % 2 === 0 ? "var(--navy-mid)" : "rgba(13,33,55,0.6)", borderBottom: "1px solid rgba(77,216,232,0.06)" }}>
                      <td style={{ padding: "11px 16px", color: "var(--text-primary)", fontSize: "0.82rem", fontWeight: 500 }}>{row.metric}</td>
                      <td style={{ padding: "11px 16px", color: "#6ab87a", fontSize: "0.8rem", fontFamily: "IBM Plex Mono, monospace" }}>{row.normal}</td>
                      <td style={{ padding: "11px 16px", color: "#e07070", fontSize: "0.8rem", fontFamily: "IBM Plex Mono, monospace" }}>{row.chronic}</td>
                      <td style={{ padding: "11px 16px", color: "var(--gold)", fontSize: "0.8rem", fontFamily: "IBM Plex Mono, monospace" }}>{row.acute}</td>
                      <td style={{ padding: "11px 16px", color: "var(--teal)", fontSize: "0.8rem", fontFamily: "IBM Plex Mono, monospace" }}>{row.improve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ color: "var(--text-dim)", fontSize: "0.7rem", marginTop: 8, fontFamily: "IBM Plex Mono, monospace", textAlign: "center" }}>
              * Данные на основе мета-анализов. TRE — Time-Restricted Eating (интервальное питание по расписанию).
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
