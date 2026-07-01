import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#about",      label: "about",      id: "about" },
  { href: "#experience", label: "experience", id: "experience" },
  { href: "#projects",   label: "projects",   id: "projects" },
  { href: "#skills",     label: "skills",     id: "skills" },
  { href: "#certs",      label: "certs",      id: "certs" },
];

const SECTION_IDS = ["about", "experience", "projects", "skills", "certs", "education", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [activeId, setActiveId]   = useState("");
  const [theme, setTheme]         = useState(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("portfolio-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    return stored || preferred;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section tracking via IntersectionObserver
  useEffect(() => {
    const observers = [];
    const visible = new Map();

    function pickActive() {
      // pick the section closest to top-of-viewport
      let best = null;
      let bestTop = Infinity;
      visible.forEach((top, id) => {
        if (top < bestTop) { bestTop = top; best = id; }
      });
      setActiveId(best ?? "");
    }

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.set(id, entry.boundingClientRect.top);
          } else {
            visible.delete(id);
          }
          pickActive();
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors ${
        scrolled
          ? "border-[var(--color-border-bright)] bg-[var(--color-bg-base)]/90"
          : "border-[var(--color-border)] bg-[var(--color-bg-base)]/70"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-tight text-[var(--color-amber)]"
        >
          root<span className="text-[var(--color-text-dim)]">@</span>balaji
          <span className="text-[var(--color-text-dim)]">:~$</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`group relative font-mono text-[13px] transition-colors ${
                  isActive
                    ? "text-[var(--color-amber)]"
                    : "text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
                }`}
              >
                <span
                  className={`text-[var(--color-amber)] transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {">"}{" "}
                </span>
                {item.label}
                {/* active underline */}
                {isActive && (
                  <span className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-[var(--color-amber)] rounded-full" />
                )}
              </a>
            );
          })}
          <a
            href="#contact"
            className={`rounded-sm border px-3.5 py-1.5 font-mono text-[13px] font-medium transition-all ${
              activeId === "contact"
                ? "bg-[var(--color-amber)] text-[var(--color-bg-base)] border-[var(--color-amber)]"
                : "border-[var(--color-amber-dim)] text-[var(--color-amber)] hover:bg-[var(--color-amber)] hover:text-[var(--color-bg-base)] hover:shadow-[0_0_16px_rgba(255,159,28,0.4)]"
            }`}
          >
            connect
          </a>
          <button
            type="button"
            onClick={() => setTheme((value) => value === "dark" ? "light" : "dark")}
            className="group relative flex h-9 w-16 items-center rounded-full border border-[var(--color-border-bright)] bg-[var(--color-card)] px-1 transition-colors hover:border-[var(--color-amber)]"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-amber)] text-[var(--color-bg-base)] shadow-[0_0_16px_rgba(255,159,28,0.35)] transition-transform ${
                theme === "light" ? "translate-x-7" : "translate-x-0"
              }`}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M12 3a6 6 0 0 0 9 7.5A9 9 0 1 1 12 3z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              )}
            </span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-[5px] p-1 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-[2px] w-[22px] bg-[var(--color-amber)] transition-transform origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-[2px] w-[22px] bg-[var(--color-amber)] transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-[22px] bg-[var(--color-amber)] transition-transform origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 border-b border-[var(--color-border-bright)] bg-[var(--color-elevated)] px-6 py-5">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`font-mono text-sm transition-colors ${
                activeId === item.id
                  ? "text-[var(--color-amber)]"
                  : "text-[var(--color-text-dim)]"
              }`}
            >
              {activeId === item.id ? "> " : ""}{item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="font-mono text-sm text-[var(--color-amber)]"
          >
            connect
          </a>
          <button
            type="button"
            onClick={() => setTheme((value) => value === "dark" ? "light" : "dark")}
            className="flex items-center justify-between rounded-sm border border-[var(--color-border-bright)] px-3 py-2 font-mono text-sm text-[var(--color-text-dim)]"
          >
            theme
            <span className="text-[var(--color-amber)]">{theme}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
