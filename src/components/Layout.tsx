import { NavLink, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { path: "/", label: "Введение", icon: "BookOpen" },
  { path: "/mechanisms", label: "Механизмы", icon: "Dna" },
  { path: "/health", label: "Здоровье", icon: "Heart" },
  { path: "/research", label: "Исследования", icon: "FlaskConical" },
  { path: "/sources", label: "Источники", icon: "FileText" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen grid-bg" style={{ background: "var(--navy)" }}>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(13,33,55,0.95)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(77,216,232,0.1)"
      }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 no-underline">
            <div className="w-7 h-7 relative flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full rounded-full border-2" style={{ borderColor: "var(--gold)", opacity: 0.9 }} />
              <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: "var(--gold)" }} />
            </div>
            <div>
              <div style={{ fontFamily: "Cormorant, serif", fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1, letterSpacing: "0.02em" }}>
                Биологические часы
              </div>
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.55rem", color: "var(--text-dim)", letterSpacing: "0.12em", marginTop: 1 }}>
                CHRONOBIOLOGY
              </div>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ path, label, icon }) => {
              const isActive = path === "/" ? location.pathname === "/" : location.pathname === path;
              return (
                <NavLink key={path} to={path}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 4,
                    fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.78rem", letterSpacing: "0.02em",
                    textDecoration: "none", transition: "all 0.2s",
                    color: isActive ? "var(--gold)" : "var(--text-secondary)",
                    background: isActive ? "rgba(232,184,75,0.1)" : "transparent",
                    borderBottom: isActive ? "1px solid rgba(232,184,75,0.4)" : "1px solid transparent",
                  }}>
                  <Icon name={icon} size={13} />
                  {label}
                </NavLink>
              );
            })}
          </div>

          {/* Mobile: compact icons */}
          <div className="flex md:hidden items-center gap-2">
            {NAV_ITEMS.map(({ path, icon }) => {
              const isActive = path === "/" ? location.pathname === "/" : location.pathname === path;
              return (
                <NavLink key={path} to={path}
                  style={{
                    display: "flex", padding: 6, borderRadius: 4,
                    color: isActive ? "var(--gold)" : "var(--text-dim)",
                    textDecoration: "none"
                  }}>
                  <Icon name={icon} size={16} />
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {children}
      </main>

      <footer style={{ borderTop: "1px solid rgba(77,216,232,0.08)", padding: "1.5rem" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "var(--text-dim)" }}>
            CHRONOBIOLOGY © 2024 · Научный обзор биологических часов
          </span>
          <div className="flex gap-4 flex-wrap justify-center">
            {NAV_ITEMS.map(({ path, label }) => (
              <NavLink key={path} to={path}
                style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.62rem", color: "var(--text-dim)", letterSpacing: "0.08em", textDecoration: "none" }}>
                {label.toUpperCase()}
              </NavLink>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
