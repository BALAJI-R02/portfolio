import { useEffect, useRef, useState } from "react";
import { profile } from "../data.js";
import photoUrl from "../assets/balaji-photo.jpeg";

const BOOT_LINES = [
  { text: "$ whoami", delay: 26 },
  { text: "BALAJI R", delay: 22, dim: true },
  { text: "$ ./recon.sh --target=career --mode=verbose", delay: 22 },
  { text: "[INFO] resolving profile: cybersecurity-engineer", delay: 18, dim: true },
  { text: "[INFO] scope: web app security, OSINT, pentesting", delay: 18, dim: true },
  { text: "[INFO] artifacts found: 2 projects, 1 internship, 6 certs", delay: 18, dim: true },
  { text: "[OK]   profile verified — ready for review", delay: 22, dim: true },
  { text: "$ _", delay: 26 },
];

/* ──────────────────────────────────────────────────────────────
   ANIMATED NAME — letter-by-letter reveal + hover glow WAVE
   Hovering any letter makes it glow amber, neighbouring letters
   glow softer (like a ripple), and the letter lifts slightly.
────────────────────────────────────────────────────────────── */
function AnimatedName({ name, visible }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const letters = name.split("");

  function getIntensity(i) {
    if (hoveredIdx === null) return 0;
    return Math.max(0, 1 - Math.abs(i - hoveredIdx) * 0.38);
  }

  return (
    <h1
      className="mt-3 font-[var(--font-display)] text-5xl font-bold tracking-tight sm:text-6xl select-none cursor-default"
      style={{ perspective: "400px" }}
    >
      {letters.map((char, i) => {
        const intensity = getIntensity(i);
        const isHovered = i === hoveredIdx;

        return (
          <span
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="inline-block"
            style={{
              /* ── entrance animation ── */
              opacity: visible ? 1 : 0,
              transform: visible
                ? intensity > 0
                  ? `translateY(${-intensity * 7}px) scale(${1 + intensity * 0.12})`
                  : "translateY(0) scale(1) rotateX(0deg)"
                : "translateY(28px) rotateX(90deg)",
              /* ── colour & glow ── */
              color: intensity > 0
                ? `rgba(255, ${Math.round(159 + intensity * 40)}, ${Math.round(28 + intensity * 20)}, 1)`
                : "var(--color-text)",
              textShadow: intensity > 0
                ? `0 0 ${intensity * 20}px rgba(255,159,28,${intensity * 0.95}),
                   0 0 ${intensity * 45}px rgba(255,159,28,${intensity * 0.55}),
                   0 0 ${intensity * 80}px rgba(255,159,28,${intensity * 0.2})`
                : isHovered
                  ? "none"
                  : "none",
              /* ── transition ── */
              transition: intensity > 0 || isHovered
                ? "color 0.15s ease, text-shadow 0.15s ease, transform 0.18s ease, opacity 0.4s ease"
                : `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 55 + 600}ms,
                   opacity   0.45s ease ${i * 55 + 600}ms,
                   color 0.25s ease, text-shadow 0.25s ease`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </h1>
  );
}

/* ──────────────────────────────────────────────────────────────
   HERO
────────────────────────────────────────────────────────────── */
export default function Hero() {
  const bootRef       = useRef(null);
  const heroRef       = useRef(null);
  const tiltRef       = useRef(null);
  const glareRef      = useRef(null);
  const photoWrapRef  = useRef(null);
  const [textVisible, setTextVisible] = useState(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Typewriter boot sequence ── */
  useEffect(() => {
    if (!bootRef.current) return;
    if (prefersReduced) {
      bootRef.current.textContent = BOOT_LINES.map((l) => l.text).join("\n");
      setTextVisible(true);
      return;
    }
    let cancelled = false;
    async function typeLine(line) {
      return new Promise((resolve) => {
        const div = document.createElement("div");
        if (line.dim) div.style.color = "var(--color-text-dim)";
        bootRef.current.appendChild(div);
        let i = 0;
        function step() {
          if (cancelled) return resolve();
          if (i <= line.text.length) { div.textContent = line.text.slice(0, i++); setTimeout(step, line.delay); }
          else resolve();
        }
        step();
      });
    }
    async function run() {
      for (const line of BOOT_LINES) {
        await typeLine(line);
        await new Promise((r) => setTimeout(r, 100));
      }
      setTextVisible(true);
    }
    run();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Scroll reveal ── */
  useEffect(() => {
    if (prefersReduced) { setTextVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTextVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── 3D tilt on photo ── */
  useEffect(() => {
    if (prefersReduced) return;
    const wrap  = photoWrapRef.current;
    const tilt  = tiltRef.current;
    const glare = glareRef.current;
    if (!wrap || !tilt) return;
    const MAX = 15;
    function onMove(e) {
      const r  = tilt.getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, (e.clientX - r.left - r.width  / 2) / (r.width  / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - r.top  - r.height / 2) / (r.height / 2)));
      tilt.style.transform = `rotateX(${-dy * MAX}deg) rotateY(${dx * MAX}deg) scale(1.05)`;
      if (glare) glare.style.background =
        `radial-gradient(circle at ${50 + dx * 40}% ${50 + dy * 40}%,rgba(255,255,255,0.22),transparent 60%)`;
    }
    function onLeave() {
      tilt.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      if (glare) glare.style.background = "transparent";
    }
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => { wrap.removeEventListener("mousemove", onMove); wrap.removeEventListener("mouseleave", onLeave); };
  }, [prefersReduced]);

  /* ── fade-in helper (inline style) ── */
  function fadeIn(delay) {
    return {
      opacity: textVisible ? 1 : 0,
      transform: textVisible ? "translateY(0)" : "translateY(10px)",
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    };
  }

  return (
    <header
      id="top"
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-16 pt-32"
    >
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">

        {/* ── LEFT ── */}
        <div>
          {/* Terminal */}
          <div className="overflow-hidden rounded-md border border-[var(--color-border-bright)] bg-[var(--color-elevated)] shadow-[0_0_60px_rgba(255,159,28,0.07)]">
            <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[#0d1620] px-4 py-2.5">
              <div className="flex gap-[7px]">
                <span className="block h-[11px] w-[11px] rounded-full bg-[#ff5f56]" />
                <span className="block h-[11px] w-[11px] rounded-full bg-[#ffbd2e]" />
                <span className="block h-[11px] w-[11px] rounded-full bg-[#27c93f]" />
              </div>
              <span className="font-mono text-xs text-[var(--color-text-faint)]">
                balaji@dr-ngp-it: ~/portfolio — recon.sh
              </span>
            </div>
            <div className="min-h-[200px] px-6 py-5">
              <pre ref={bootRef} className="whitespace-pre-wrap break-words font-mono text-[13px] leading-[1.85] text-[var(--color-amber)]" />
            </div>
          </div>

          {/* Text block */}
          <div className="mt-9">
            {/* ✨ ANIMATED NAME WITH HOVER GLOW WAVE */}
            <AnimatedName name={profile.name} visible={textVisible} />

            <p className="mt-2 font-mono text-base text-[var(--color-text)] sm:text-lg animate-pulse" style={fadeIn(600)}>
              {profile.role}
            </p>

            <div className="mt-6" style={fadeIn(950)}>
              <p className="font-mono text-xs tracking-[0.12em] text-[var(--color-steel)] section-glitch">
                [ TARGET ACQUIRED ]
              </p>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[var(--color-text-dim)]">
                {profile.tagline}
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3" style={fadeIn(1250)}>
              <a href="#projects"
                className="rounded-sm bg-[var(--color-amber)] px-5 py-3 font-mono text-sm font-semibold text-[var(--color-bg-base)] transition-all hover:shadow-[0_0_28px_rgba(255,159,28,0.55)] hover:-translate-y-0.5 active:scale-95">
                view_writeups()
              </a>
              <a href="#contact"
                className="rounded-sm border border-[var(--color-border-bright)] px-5 py-3 font-mono text-sm font-medium text-[var(--color-text)] transition-all hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]">
                initiate_contact()
              </a>
              <a href="/Balaji_R_Resume.pdf" download
                className="flex items-center gap-2 rounded-sm border border-[var(--color-steel-dim)] px-5 py-3 font-mono text-sm font-medium text-[var(--color-steel)] transition-all hover:bg-[var(--color-steel)] hover:text-[var(--color-bg-base)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                resume.pdf
              </a>
            </div>

            {/* Status */}
            <div className="mt-7 flex flex-wrap gap-6 font-mono text-xs text-[var(--color-text-faint)]" style={fadeIn(1500)}>
              <span>📍 {profile.location}</span>
              <span className="flex items-center gap-1.5 text-[var(--color-green-ok)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-green-ok)] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-green-ok)]" />
                </span>
                open to opportunities
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: CLEAN PHOTO with tilt only ── */}
        <div
          ref={photoWrapRef}
          className={`mx-auto transition-all duration-700 delay-150 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ perspective: "900px" }}
        >
          <div
            ref={tiltRef}
            className="relative h-64 w-64 rounded-full transition-transform duration-200 ease-out sm:h-72 sm:w-72"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Static gradient border ring */}
            <div className="absolute inset-0 rounded-full p-[3px]"
              style={{ background: "linear-gradient(135deg, #ff9f1c 0%, #4fa8d8 50%, #4ade80 100%)" }}>
              <div className="h-full w-full rounded-full bg-[var(--color-bg-base)]" />
            </div>

            {/* Outer soft glow halo */}
            <div className="absolute inset-[-5px] rounded-full border border-[rgba(255,159,28,0.12)]
              shadow-[0_0_40px_rgba(255,159,28,0.1),inset_0_0_40px_rgba(255,159,28,0.04)]" />

            {/* Photo */}
            <div className="absolute inset-[4px] overflow-hidden rounded-full border-2 border-[var(--color-bg-base)] bg-[var(--color-card)]">
              <img
                src={photoUrl}
                alt="Balaji R — Cybersecurity Engineer"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 18%" }}
              />
              {/* Glare overlay */}
              <div ref={glareRef} className="pointer-events-none absolute inset-0 rounded-full" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-[var(--color-text-faint)]">
            <span className="text-[var(--color-amber)]">{">_"}</span> security.researcher
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 flex flex-col items-center gap-1 font-mono text-[11px] tracking-wider text-[var(--color-text-faint)] animate-bounce">
        scroll <span>▾</span>
      </div>
    </header>
  );
}
