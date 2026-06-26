import { useEffect, useRef, useState } from "react";
import { skills } from "../data.js";

const ACCENT_CATEGORIES = ["Security Tools", "Core Areas"];

export default function Skills() {
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
    <section id="skills" className="px-6 py-28">
      <div ref={ref} className="mx-auto max-w-5xl">
        <p
          className={`font-mono text-xs tracking-[0.12em] text-[var(--color-amber)] transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          04 // ARSENAL
        </p>
        <h2
          className={`mt-2 font-[var(--font-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl transition-all duration-500 delay-75 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Technical Skills
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, items], idx) => {
            const isAccent = ACCENT_CATEGORIES.includes(category);
            return (
              <div
                key={category}
                className={`rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all duration-500 hover:border-[var(--color-border-bright)] ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: visible ? `${idx * 80 + 150}ms` : "0ms" }}
              >
                <h4 className="mb-4 font-mono text-[11.5px] uppercase tracking-[0.08em] text-[var(--color-text-dim)]">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className={`rounded-sm border px-3 py-1.5 font-mono text-[12px] transition-colors cursor-default ${
                        isAccent
                          ? "border-[var(--color-amber-dim)] text-[var(--color-amber)] hover:bg-[var(--color-amber)] hover:text-[var(--color-bg-base)]"
                          : "border-[var(--color-border-bright)] text-[var(--color-text)] hover:border-[var(--color-amber)]"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
