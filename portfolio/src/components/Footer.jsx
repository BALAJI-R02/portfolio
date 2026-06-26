export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] py-7 text-center font-mono text-xs text-[var(--color-text-faint)]">
      © {year} Balaji R · React + Tailwind CSS + Vite
    </footer>
  );
}
