import { profile } from "../data.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border-bright)] bg-[var(--color-elevated)]/70 px-6 py-10 font-mono text-xs text-[var(--color-text-faint)]">
      <div className="mx-auto grid max-w-5xl gap-7 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-[var(--color-amber)]">root@balaji:~/portfolio</p>
          <p className="mt-2 max-w-xl leading-relaxed">
            Cybersecurity, React builds, OSINT workflows, and practical problem solving.
          </p>
          <p className="mt-3">© {year} Balaji R. Built with React, Tailwind CSS, and Vite.</p>
        </div>

        <div className="flex flex-wrap gap-3 sm:justify-end">
          <a
            className="rounded-sm border border-[var(--color-border)] px-3 py-2 transition-colors hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]"
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="rounded-sm border border-[var(--color-border)] px-3 py-2 transition-colors hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]"
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="rounded-sm border border-[var(--color-border)] px-3 py-2 transition-colors hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]"
            href="#contact"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
