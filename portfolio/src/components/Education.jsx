import { useEffect, useRef, useState } from "react";
import { education } from "../data.js";

export default function Education() {
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
    <section id="education" className="px-6 py-20">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-mono text-xs tracking-[0.12em] text-[var(--color-amber)]">06 // EDUCATION</p>
        <div className="mt-6 flex flex-col gap-4">
          {education.map((edu, idx) => (
            <div
              key={edu.school}
              className={`flex flex-wrap items-center justify-between gap-4 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-7 py-5 transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: visible ? `${idx * 100 + 100}ms` : "0ms" }}
            >
              <div>
                <h3 className="font-[var(--font-display)] text-[17px] font-semibold text-[var(--color-text)]">
                  {edu.school}
                </h3>
                <p className="mt-1 text-[13.5px] text-[var(--color-text-dim)]">{edu.degree}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {edu.date && (
                  <span className="font-mono text-[12px] text-[var(--color-amber)]">{edu.date}</span>
                )}
                <span className="font-mono text-[12px] text-[var(--color-green-ok)]">{edu.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
