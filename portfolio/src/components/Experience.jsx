import { useEffect, useRef, useState } from "react";
import { experience } from "../data.js";

function parseBoldText(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} className="text-[var(--color-text)] font-semibold">
          {part}
        </strong>
      );
    }
    return part;
  });
}

export default function Experience() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className="px-6 py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-mono text-xs tracking-[0.12em] text-[var(--color-amber)]">02 // ENGAGEMENT LOG</p>
        <h2 className="mt-2 font-[var(--font-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
          Internship Experience
        </h2>

        <div className="relative mt-10 pl-7">
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-amber)] to-transparent" />

          {experience.map((job) => (
            <div key={job.title} className="relative">
              <div className="absolute -left-[28px] top-[6px] h-[11px] w-[11px] rounded-full border-2 border-[var(--color-amber)] bg-[var(--color-bg-base)] shadow-[0_0_10px_rgba(255,159,28,0.5)]" />
              <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-text)]">
                    {job.title}
                  </h3>
                  <span className="font-mono text-xs text-[var(--color-amber)]">{job.date}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--color-steel)]">{job.org}</p>
                <ul className="mt-5 space-y-3">
                  {job.points.map((pt, i) => (
                    <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-[var(--color-text-dim)]">
                      <span className="mt-[2px] shrink-0 text-[var(--color-amber)]">▸</span>
                      <span>{parseBoldText(pt)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
