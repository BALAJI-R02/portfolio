import { useState } from "react";
import { profile } from "../data.js";

const LINKS = [
  {
    id: "email",
    label: "email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    copyText: profile.email,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
  {
    id: "phone",
    label: "phone",
    value: profile.phone,
    href: `tel:${profile.phoneHref}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "linkedin",
    value: "/in/balaji-r",
    href: profile.links.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "github",
    value: "BALAJI-R02",
    href: profile.links.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5z" />
      </svg>
    ),
  },
  {
    id: "leetcode",
    label: "leetcode",
    value: "BALAJI_R02",
    href: profile.links.leetcode,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M13.48 2.06 7.4 8.14a3.5 3.5 0 0 0 0 4.95l4.6 4.6a3.5 3.5 0 0 0 4.95 0l1.77-1.77a1.13 1.13 0 0 0-1.6-1.6l-1.77 1.77a1.25 1.25 0 0 1-1.76 0l-4.6-4.6a1.25 1.25 0 0 1 0-1.76l6.08-6.08a1.13 1.13 0 1 0-1.6-1.6zM9.6 14.5l1.6 1.6a1.13 1.13 0 0 1-1.6 1.6l-1.6-1.6a1.13 1.13 0 0 1 1.6-1.6zM21.3 13.2H12a1.13 1.13 0 1 0 0 2.26h9.3a1.13 1.13 0 1 0 0-2.26z" />
      </svg>
    ),
  },
  {
    id: "tryhackme",
    label: "tryhackme",
    value: "BALAJI.R",
    href: profile.links.tryhackme,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M12 2 3 7v6c0 5 3.8 8.7 9 9 5.2-.3 9-4 9-9V7l-9-5z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [toast, setToast] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(profile.email).then(() => {
      setToast(true);
      setTimeout(() => setToast(false), 1800);
    });
  }

  return (
    <section id="contact" className="px-6 pb-24 pt-20">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs tracking-[0.12em] text-[var(--color-amber)]">07 // INITIATE CONTACT</p>

        <div className="mt-6 overflow-hidden rounded-md border border-[var(--color-border-bright)] bg-[var(--color-elevated)] shadow-[0_0_60px_rgba(255,159,28,0.04)]">
          <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[#0d1620] px-4 py-2.5">
            <div className="flex gap-[7px]">
              <span className="block h-[11px] w-[11px] rounded-full bg-[#ff5f56]" />
              <span className="block h-[11px] w-[11px] rounded-full bg-[#ffbd2e]" />
              <span className="block h-[11px] w-[11px] rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-xs text-[var(--color-text-faint)]">connect.sh</span>
          </div>

          <div className="p-7 font-mono text-[14px]">
            <p className="text-[var(--color-text-dim)]">
              <span className="text-[var(--color-amber)]">$ </span>whoami
            </p>
            <p className="mb-5 pl-4 text-[var(--color-text)]">
              Balaji R — Cybersecurity Engineer, open to internships &amp; full-time roles
            </p>
            <p className="text-[var(--color-text-dim)]">
              <span className="text-[var(--color-amber)]">$ </span>cat contact_info.txt
            </p>

            <div className="mt-3 grid gap-3 pl-4 sm:grid-cols-2">
              {LINKS.map((link) => {
                const isEmail = link.id === "email";
                const Tag = isEmail ? "button" : "a";
                const extraProps = isEmail
                  ? { onClick: copyEmail, type: "button" }
                  : { href: link.href, target: "_blank", rel: "noopener noreferrer" };

                return (
                  <Tag
                    key={link.id}
                    {...extraProps}
                    className="group flex items-center gap-3 rounded-sm border border-[var(--color-border)] p-3.5 text-left text-[var(--color-text-dim)] transition-all hover:border-[var(--color-amber)] hover:bg-[rgba(255,159,28,0.04)] hover:text-[var(--color-text)] w-full"
                  >
                    <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-sm border border-[var(--color-border-bright)] bg-[var(--color-card)] text-[var(--color-text-dim)] transition-colors group-hover:border-[var(--color-amber)] group-hover:text-[var(--color-amber)]">
                      {link.icon}
                    </span>
                    <span className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[10.5px] uppercase tracking-wider text-[var(--color-steel)]">{link.label}</span>
                      <span className="text-[12.5px] truncate">{link.value}</span>
                    </span>
                    {!isEmail && (
                      <span className="ml-auto text-[var(--color-text-faint)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-amber)]">→</span>
                    )}
                    {isEmail && (
                      <span className="ml-auto text-[10.5px] text-[var(--color-text-faint)] opacity-0 transition-opacity group-hover:opacity-100">click to copy</span>
                    )}
                  </Tag>
                );
              })}
            </div>

            <p className="mt-5 text-[var(--color-text-dim)]">
              <span className="text-[var(--color-amber)]">$ </span>location
            </p>
            <p className="pl-4 text-[var(--color-text)]">{profile.location}</p>
            <p className="mt-3 text-[var(--color-text-dim)]">
              <span className="text-[var(--color-amber)]">$ </span>
              <span className="animate-pulse">█</span>
            </p>
          </div>
        </div>
      </div>

      {/* copy-email toast */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 rounded-sm bg-[var(--color-amber)] px-5 py-2.5 font-mono text-sm font-semibold text-[var(--color-bg-base)] shadow-lg transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        Email copied ✓
      </div>
    </section>
  );
}
