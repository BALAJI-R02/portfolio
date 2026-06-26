import { useEffect, useRef, useState } from "react";
import { profile, stats } from "../data.js";

function Counter({ value, suffix }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !triggered.current) {
            triggered.current = true;
            const isFloat = !Number.isInteger(value);
            const duration = 1400;
            const start = performance.now();
            function tick(now) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(isFloat ? +(eased * value).toFixed(1) : Math.floor(eased * value));
              if (progress < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            }
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-[var(--font-display)] text-3xl font-bold text-[var(--color-amber)]">
      {display}{suffix}
    </span>
  );
}

export default function About() {
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
    <section id="about" className="px-6 py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-5xl transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-mono text-xs tracking-[0.12em] text-[var(--color-amber)]">01 // SUMMARY</p>

        <div className="relative mt-5 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-8">
          <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-md bg-[var(--color-amber)]" />

          <div className="mb-5 flex flex-wrap justify-between gap-3 border-b border-dashed border-[var(--color-border)] pb-5 font-mono text-[11px] text-[var(--color-text-faint)]">
            <span>FILE_ID: BR-2027-CSE-SEC</span>
            <span>STATUS: <span className="text-[var(--color-green-ok)]">ACTIVE</span></span>
          </div>

          <p className="max-w-3xl text-[15px] leading-relaxed text-[var(--color-text-dim)]">
            {profile.bio}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-5 border-t border-[var(--color-border)] pt-7 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <Counter value={s.value} suffix={s.suffix} />
                <span className="font-mono text-[11px] text-[var(--color-text-faint)]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
