import { useEffect, useRef, useState } from "react";
import { projects } from "../data.js";

const TAG_COLORS = {
  red:   "bg-[rgba(232,82,92,0.12)] text-[var(--color-red)] border-[rgba(232,82,92,0.3)]",
  amber: "bg-[rgba(255,159,28,0.12)] text-[var(--color-amber)] border-[rgba(255,159,28,0.3)]",
};

/* ── 3D tilt card wrapper ── */
function Card3D({ children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    function onMove(e) {
      const r  = card.getBoundingClientRect();
      const x  = (e.clientX - r.left)  / r.width  - 0.5;
      const y  = (e.clientY - r.top)   / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-6px)`;
      card.style.boxShadow = `${-x * 24}px ${-y * 24}px 40px rgba(255,159,28,0.1),
                               0 0 0 1px rgba(255,159,28,0.18)`;
    }
    function onLeave() {
      card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
      card.style.boxShadow = "";
    }

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <article
      ref={ref}
      className={`card-3d ${className}`}
    >
      {children}
    </article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="px-6 py-28">
      <div ref={ref} className="mx-auto max-w-5xl">

        <p className={`section-glitch font-mono text-xs tracking-[0.12em] text-[var(--color-amber)] transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          03 // PROJECT WRITEUPS
        </p>
        <h2 className={`mt-2 font-[var(--font-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl transition-all duration-500 delay-75 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          Projects
        </h2>

        <div className="mt-10 grid gap-7 md:grid-cols-2">
          {projects.map((p, idx) => (
            <Card3D
              key={p.title}
              className={`group flex flex-col rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-7 cursor-default transition-all duration-500 card-hover-glow ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${idx * 120 + 120}ms` : "0ms" }}
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-sm border px-2.5 py-1 font-mono text-[10.5px] font-bold tracking-wide ${TAG_COLORS[p.tagColor]}`}>
                  {p.tag}
                </span>
                <span className="font-mono text-[10.5px] text-[var(--color-text-faint)]">[ {p.status} ]</span>
              </div>

              <h3 className="mt-4 font-[var(--font-display)] text-2xl font-bold text-[var(--color-text)]">{p.title}</h3>
              <p className="mt-1 text-sm font-medium text-[var(--color-steel)]">{p.subtitle}</p>

              {/* Methodology */}
              <div className="mt-5 flex flex-col gap-3 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-base)]/60 p-4">
                {[
                  { label: "objective", value: p.objective },
                  { label: "method",    value: p.method },
                  { label: "finding",   value: p.finding },
                  { label: "next",      value: p.next },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3">
                    <span className="mt-[2px] shrink-0 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--color-amber)] w-16">{label}</span>
                    <span className="text-[13px] leading-relaxed text-[var(--color-text-dim)]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-sm border border-[var(--color-border-bright)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-text-dim)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] transition-colors cursor-default">
                    {s}
                  </span>
                ))}
              </div>

              <a href={p.link} target="_blank" rel="noopener noreferrer"
                className="mt-auto flex items-center justify-between border-t border-dashed border-[var(--color-border)] pt-5 font-mono text-[12.5px] text-[var(--color-amber)] transition-all hover:text-[var(--color-text)]">
                <span>{p.link.replace("https://", "")}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}
