import Layout from "@/components/Layout";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/20f7e267-3e5b-4023-a705-180a218b4651/files/cf8f48d9-48eb-47e1-a847-07b24ba5c81c.jpg";

export default function Research() {
  return (
    <Layout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-4">Раздел 04 · Актуальные исследования</div>
            <h1 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Научный фронтир<br /><em style={{ color: "var(--gold)" }}>хронобиологии</em>
            </h1>
            <p style={{ color: "var(--text-secondary)", maxWidth: 580, margin: "1.5rem auto 0", lineHeight: 1.75, fontWeight: 300 }}>
              Хронобиология — одна из наиболее динамично развивающихся областей биомедицины. За последние 20 лет число
              публикаций выросло в 8 раз, а практические приложения уже меняют клиническую медицину.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                year: "2017", badge: "Нобелевская премия", badgeColor: "var(--gold)",
                title: "Открытие молекулярного механизма циркадных часов",
                text: "Джеффри Холл, Майкл Росбаш и Майкл Янг удостоились Нобелевской премии по физиологии и медицине за раскрытие молекулярных механизмов, контролирующих циркадный ритм у мух Drosophila. Эти механизмы оказались универсальными для всех эукариот, включая человека.",
                image: HERO_IMAGE
              },
              {
                year: "2023–2025", badge: "Текущий фронтир", badgeColor: "var(--teal)",
                title: "Периферические часы, метаболизм и TRE",
                text: "Новые данные подтвердили: каждая клетка тела содержит собственные молекулярные часы, синхронизированные через SCN и сигналы питания. Time-Restricted Eating использует эти механизмы для метаболической коррекции без изменения калорийности. Клинические испытания показывают снижение инсулинорезистентности на 25–30%.",
              }
            ].map(({ year, badge, badgeColor, title, text, image }) => (
              <div key={title} className="rounded overflow-hidden" style={{ background: "var(--navy-mid)", border: "1px solid rgba(77,216,232,0.12)" }}>
                {image && (
                  <div className="h-44 overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover" style={{ opacity: 0.55 }} />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "var(--text-dim)" }}>{year}</span>
                    <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: badgeColor, border: `1px solid ${badgeColor}50`, padding: "2px 8px", borderRadius: 2 }}>{badge}</span>
                  </div>
                  <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "1.35rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 10 }}>{title}</h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.83rem", lineHeight: 1.75, fontWeight: 300 }}>{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Таблица направлений исследований */}
          <div className="mb-12">
            <div className="section-label mb-4 text-center">Ключевые направления современных исследований</div>
            <div className="overflow-x-auto rounded" style={{ border: "1px solid rgba(77,216,232,0.12)" }}>
              <table className="w-full" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--navy-light)", borderBottom: "1px solid rgba(77,216,232,0.15)" }}>
                    {["Направление", "Ключевые группы", "Статус", "Практическое применение"].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "IBM Plex Mono, monospace", fontSize: "0.64rem", color: "var(--teal)", letterSpacing: "0.06em", fontWeight: 500 }}>
                        {h.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dir: "Хронотерапия онкологии", groups: "NCI, INSERM, МНИОИ", status: "Фаза III", apply: "Оптимизация времени химиотерапии" },
                    { dir: "Циркадная иммунология", groups: "Salk Institute, UCLA", status: "Активные исследования", apply: "Вакцинация по времени суток" },
                    { dir: "Хронофармакология кардио", groups: "ESC, Johns Hopkins", status: "Внедряется", apply: "Приём статинов вечером" },
                    { dir: "Социальный джетлаг", groups: "LMU Munich, Oxford", status: "Эпидемиология", apply: "Политика расписаний" },
                    { dir: "Циркадные биомаркеры", groups: "NIH, Broad Institute", status: "Разработка тестов", apply: "Диагностика нарушений ритма" },
                    { dir: "TRE и метаболизм", groups: "Salk, Pennington BRC", status: "Клинические испытания", apply: "Лечение ожирения и диабета" },
                  ].map((row, i) => (
                    <tr key={row.dir} style={{ background: i % 2 === 0 ? "var(--navy-mid)" : "rgba(13,33,55,0.5)", borderBottom: "1px solid rgba(77,216,232,0.06)" }}>
                      <td style={{ padding: "11px 16px", color: "var(--text-primary)", fontSize: "0.82rem", fontWeight: 500 }}>{row.dir}</td>
                      <td style={{ padding: "11px 16px", color: "var(--text-secondary)", fontSize: "0.78rem", fontFamily: "IBM Plex Mono, monospace" }}>{row.groups}</td>
                      <td style={{ padding: "11px 16px" }}>
                        <span style={{
                          fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem",
                          color: row.status.includes("III") || row.status.includes("Внедряется") ? "#6ab87a" : "var(--teal)",
                          border: `1px solid ${row.status.includes("III") || row.status.includes("Внедряется") ? "#6ab87a40" : "rgba(77,216,232,0.25)"}`,
                          padding: "2px 8px", borderRadius: 2, whiteSpace: "nowrap"
                        }}>{row.status}</span>
                      </td>
                      <td style={{ padding: "11px 16px", color: "var(--text-secondary)", fontSize: "0.78rem" }}>{row.apply}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded p-8" style={{ background: "var(--navy-mid)", border: "1px solid rgba(77,216,232,0.12)" }}>
            <div className="section-label mb-8 text-center">Масштаб научного интереса</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { num: "48 000+", label: "Статей в PubMed по circadian rhythm", note: "за последние 10 лет" },
                { num: "~$2 млрд", label: "Финансирование исследований", note: "США и ЕС, 2020–2024" },
                { num: "12 часов", label: "Разница в экспрессии генов", note: "между ранними и поздними хронотипами" },
              ].map(({ num, label, note }) => (
                <div key={num}>
                  <div style={{ fontFamily: "Cormorant, serif", fontSize: "2.2rem", fontWeight: 300, color: "var(--gold)", marginBottom: 6 }}>{num}</div>
                  <div style={{ color: "var(--text-primary)", fontSize: "0.82rem", marginBottom: 4, fontWeight: 500 }}>{label}</div>
                  <div style={{ color: "var(--text-dim)", fontSize: "0.7rem", fontFamily: "IBM Plex Mono, monospace" }}>{note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
