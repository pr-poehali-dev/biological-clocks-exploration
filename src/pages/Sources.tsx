import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

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
  },
  {
    index: "07", authors: "Depner C.M. et al.", year: "2019",
    title: "Ad libitum Weekend Recovery Sleep Fails to Prevent Metabolic Dysregulation",
    journal: "Current Biology", doi: "https://doi.org/10.1016/j.cub.2019.01.069", tag: "Метаболизм"
  },
  {
    index: "08", authors: "Cho K.", year: "2001",
    title: "Chronic 'jet lag' produces temporal lobe atrophy and spatial cognitive deficits",
    journal: "Nature Neuroscience", doi: "https://doi.org/10.1038/nn0701-567", tag: "Нейронаука"
  },
];

export default function Sources() {
  return (
    <Layout>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mb-4">Раздел 05 · Научные источники</div>
            <h1 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, color: "var(--text-primary)" }}>
              Цитируемые<br /><em style={{ color: "var(--gold)" }}>исследования</em>
            </h1>
            <p style={{ color: "var(--text-secondary)", maxWidth: 560, margin: "1.5rem auto 0", lineHeight: 1.75, fontWeight: 300 }}>
              Все утверждения в тексте этого сайта опираются на рецензируемые научные публикации,
              официальные данные ВОЗ и Нобелевского комитета. Ниже — полный список источников с прямыми ссылками.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {SOURCES.map(({ index, authors, year, title, journal, doi, tag }) => (
              <a key={index} href={doi} target="_blank" rel="noopener noreferrer"
                className="block group p-5 rounded"
                style={{ background: "var(--navy-mid)", borderLeft: "2px solid var(--teal-dim)", transition: "border-color 0.2s, background 0.2s", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = "var(--gold)"; e.currentTarget.style.background = "var(--navy-light)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = "var(--teal-dim)"; e.currentTarget.style.background = "var(--navy-mid)"; }}>
                <div className="flex items-start gap-4">
                  <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "var(--teal-dim)", minWidth: 24, marginTop: 2, flexShrink: 0 }}>[{index}]</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>{authors}</span>
                      <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "var(--text-dim)" }}>{year}</span>
                      <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.6rem", color: "var(--teal)", border: "1px solid rgba(77,216,232,0.2)", padding: "1px 6px", borderRadius: 2 }}>{tag}</span>
                    </div>
                    <div style={{ fontFamily: "Cormorant, serif", fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.35 }}>{title}</div>
                    <div style={{ fontSize: "0.73rem", color: "var(--text-dim)", fontStyle: "italic" }}>{journal}</div>
                  </div>
                  <Icon name="ExternalLink" size={13} style={{ color: "var(--text-dim)", flexShrink: 0, marginTop: 4 }} />
                </div>
              </a>
            ))}
          </div>

          {/* Таблица по журналам */}
          <div>
            <div className="section-label mb-4 text-center">Импакт-факторы журналов в списке</div>
            <div className="overflow-x-auto rounded" style={{ border: "1px solid rgba(77,216,232,0.12)" }}>
              <table className="w-full" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--navy-light)", borderBottom: "1px solid rgba(77,216,232,0.15)" }}>
                    {["Журнал", "Издатель", "Импакт-фактор", "Квартиль", "Тематика"].map((h) => (
                      <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontFamily: "IBM Plex Mono, monospace", fontSize: "0.63rem", color: "var(--teal)", letterSpacing: "0.06em", fontWeight: 500 }}>
                        {h.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { journal: "Nature Reviews Genetics", pub: "Nature Publishing", if_: "41.7", q: "Q1", topic: "Генетика" },
                    { journal: "Nature Reviews Immunology", pub: "Nature Publishing", if_: "67.8", q: "Q1", topic: "Иммунология" },
                    { journal: "Nature Neuroscience", pub: "Nature Publishing", if_: "25.0", q: "Q1", topic: "Нейронаука" },
                    { journal: "Current Biology", pub: "Cell Press / Elsevier", if_: "9.2", q: "Q1", topic: "Биология" },
                    { journal: "International Journal of Obesity", pub: "Springer Nature", if_: "4.9", q: "Q1", topic: "Эндокринология" },
                  ].map((row, i) => (
                    <tr key={row.journal} style={{ background: i % 2 === 0 ? "var(--navy-mid)" : "rgba(13,33,55,0.5)", borderBottom: "1px solid rgba(77,216,232,0.06)" }}>
                      <td style={{ padding: "10px 14px", color: "var(--text-primary)", fontSize: "0.8rem", fontWeight: 500, fontStyle: "italic" }}>{row.journal}</td>
                      <td style={{ padding: "10px 14px", color: "var(--text-secondary)", fontSize: "0.75rem" }}>{row.pub}</td>
                      <td style={{ padding: "10px 14px", color: "var(--gold)", fontSize: "0.8rem", fontFamily: "IBM Plex Mono, monospace", fontWeight: 500 }}>{row.if_}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "#6ab87a", border: "1px solid #6ab87a30", padding: "2px 8px", borderRadius: 2 }}>{row.q}</span>
                      </td>
                      <td style={{ padding: "10px 14px", color: "var(--text-secondary)", fontSize: "0.75rem" }}>{row.topic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
