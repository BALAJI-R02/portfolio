import { useEffect, useRef, useState } from "react";
import { certifications, hackathons } from "../data.js";

// Dynamically import cert images from the assets/certs folder
const certImages = import.meta.glob("../assets/certs/*.png", { eager: true });
function getCertImg(file) {
  const key = `../assets/certs/${file}`;
  return certImages[key]?.default ?? "";
}

function CertModal({ cert, onClose }) {
  if (!cert) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-[var(--color-bg-base)]/90 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-3xl max-h-[88vh] overflow-hidden rounded-md border border-[var(--color-border-bright)] bg-[var(--color-elevated)] shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
        style={{ animation: "modalIn 0.22s ease" }}
      >
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[#0d1620] px-4 py-2.5">
          <div className="flex gap-[7px]">
            <span className="block h-[11px] w-[11px] rounded-full bg-[#ff5f56]" />
            <span className="block h-[11px] w-[11px] rounded-full bg-[#ffbd2e]" />
            <span className="block h-[11px] w-[11px] rounded-full bg-[#27c93f]" />
          </div>
          <span className="font-mono text-xs text-[var(--color-text-faint)]">view_certificate.sh</span>
          <button
            onClick={onClose}
            className="ml-auto font-mono text-sm text-[var(--color-text-dim)] transition-colors hover:text-[var(--color-red)]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <img
            src={getCertImg(cert.file)}
            alt={cert.name}
            className="w-full rounded-sm border border-[var(--color-border)]"
          />
          <div className="mt-5">
            <p className="font-mono text-[15px] font-semibold text-[var(--color-text)]">{cert.name}</p>
            <p className="mt-1 font-mono text-[12.5px] text-[var(--color-steel)]">
              {cert.org}{cert.score ? ` · ${cert.score}` : ""}
            </p>
          </div>
        </div>
      </div>
      <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.97) } to { opacity:1; transform:scale(1) } }`}</style>
    </div>
  );
}

export default function Certs() {
  const [selected, setSelected] = useState(null);
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
    <section id="certs" className="px-6 py-28">
      <div ref={ref} className="mx-auto max-w-5xl">
        <p
          className={`font-mono text-xs tracking-[0.12em] text-[var(--color-amber)] transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          05 // CREDENTIALS
        </p>
        <h2
          className={`mt-2 font-[var(--font-display)] text-3xl font-bold text-[var(--color-text)] sm:text-4xl transition-all duration-500 delay-75 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Certifications
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {certifications.map((cert, idx) => (
            <button
              key={cert.file}
              onClick={() => setSelected(cert)}
              className={`group relative aspect-[4/3] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-card)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-amber-dim)] ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${idx * 80 + 150}ms` : "0ms" }}
            >
              <img
                src={getCertImg(cert.file)}
                alt={cert.name}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-400 filter saturate-[0.85] brightness-90 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-[var(--color-bg-base)]/95 to-transparent px-3.5 pt-8 pb-3">
                <span className="font-mono text-[12px] font-semibold leading-tight text-[var(--color-text)] text-left">
                  {cert.name.length > 40 ? cert.name.slice(0, 40) + "…" : cert.name}
                </span>
                <span className="font-mono text-[11px] text-[var(--color-amber)] text-left">
                  {cert.org}{cert.score ? ` · ${cert.score}` : ""}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Hackathons */}
        <h3
          className={`mt-16 font-[var(--font-display)] text-xl font-semibold text-[var(--color-text)] transition-all duration-500 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Hackathons &amp; Competitions
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hackathons.map((h, idx) => (
            <div
              key={h.title}
              className={`rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${idx * 60 + 400}ms` : "0ms" }}
            >
              <p className="font-mono text-[13px] font-semibold leading-snug text-[var(--color-text)]">
                {h.title}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-dim)]">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <CertModal cert={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
