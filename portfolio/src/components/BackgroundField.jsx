// Ambient background: animated hex-grid + pulsing network nodes.
// Opacity is kept low so content stays readable.
import { useEffect, useRef } from "react";

export default function BackgroundField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Nodes
    const NODES = [
      { x: 0.10, y: 0.12 }, { x: 0.28, y: 0.26 }, { x: 0.47, y: 0.14 },
      { x: 0.65, y: 0.31 }, { x: 0.82, y: 0.17 }, { x: 0.35, y: 0.49 },
      { x: 0.53, y: 0.60 }, { x: 0.72, y: 0.57 }, { x: 0.05, y: 0.37 },
      { x: 0.92, y: 0.40 }, { x: 0.20, y: 0.70 }, { x: 0.88, y: 0.72 },
    ];

    const EDGES = [
      [0,1],[1,2],[1,3],[2,3],[3,4],[3,5],[5,6],[6,7],[4,9],[7,9],
      [0,8],[8,5],[10,5],[7,11],[9,11],
    ];

    let W, H;
    let raf;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);

      // Draw edges
      ctx.strokeStyle = "rgba(255,159,28,0.09)";
      ctx.lineWidth = 1;
      EDGES.forEach(([a, b]) => {
        const na = NODES[a], nb = NODES[b];
        ctx.beginPath();
        ctx.moveTo(na.x * W, na.y * H);
        ctx.lineTo(nb.x * W, nb.y * H);
        ctx.stroke();
      });

      // Draw nodes — pulsing alpha
      NODES.forEach((n, i) => {
        const pulse = 0.4 + 0.3 * Math.sin(t * 0.0008 + i * 1.1);
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,168,216,${pulse})`;
        ctx.fill();

        // glow ring
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, 6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(79,168,216,${pulse * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--color-bg-base)]">
      {/* hex-grid line texture — slightly more visible */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexgrid" width="56" height="97" patternUnits="userSpaceOnUse">
            <path
              d="M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z"
              fill="none"
              stroke="var(--color-steel)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexgrid)" />
      </svg>

      {/* animated canvas: pulsing nodes + edges */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* subtle top vignette so hero text pops */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 0%, transparent 20%, var(--color-bg-base) 80%)",
        }}
      />
    </div>
  );
}
