import { useState } from 'react';
import { profile } from '../data.js';

const CONTACT_LINKS = [
  { label: 'Email', value: profile.email, href: 'mailto:' + profile.email },
  { label: 'Phone', value: profile.phone, href: 'tel:' + profile.phoneHref },
  { label: 'LinkedIn', value: '/in/balaji-r', href: profile.links.linkedin },
  { label: 'GitHub', value: 'BALAJI-R02', href: profile.links.github },
  { label: 'LeetCode', value: 'BALAJI_R02', href: profile.links.leetcode },
  { label: 'TryHackMe', value: 'BALAJI.R', href: profile.links.tryhackme },
];

export default function Contact() {
  const [toast, setToast] = useState('');
  function copyEmail() {
    navigator.clipboard.writeText(profile.email).then(() => {
      setToast('Email copied');
      setTimeout(() => setToast(''), 1800);
    });
  }
  return (
    <section id='contact' className='px-6 pb-24 pt-20'>
      <div className='mx-auto max-w-5xl'>
        <p className='font-mono text-xs text-[var(--color-amber)]'>07 // INITIATE CONTACT</p>
        <div className='mt-6 rounded-md border border-[var(--color-border-bright)] bg-[var(--color-elevated)] p-7'>
          <h2 className='text-3xl font-bold text-[var(--color-text)]'>Get in touch</h2>
          <p className='mt-3 text-[var(--color-text-dim)]'>Open to cybersecurity and software development roles.</p>
          <div className='mt-7 grid gap-3 sm:grid-cols-2'>
            {CONTACT_LINKS.map((item) => (
              <a key={item.label} href={item.href} target='_blank' rel='noopener noreferrer'
                className='flex items-center justify-between rounded-sm border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 font-mono text-sm hover:border-[var(--color-amber)]'>
                <span className='text-[var(--color-text-dim)]'>{item.label}</span>
                <span className='text-[var(--color-text)]'>{item.value}</span>
              </a>
            ))}
          </div>
          <button type='button' onClick={copyEmail}
            className='mt-5 rounded-sm border border-[var(--color-amber-dim)] px-5 py-3 font-mono text-sm text-[var(--color-amber)] hover:bg-[var(--color-amber)] hover:text-[var(--color-base)]'>
            copy_email()
          </button>
        </div>
      </div>
      {toast && <div className='fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-sm bg-[var(--color-amber)] px-5 py-2.5 font-mono text-sm text-[var(--color-base)]'>{toast}</div>}
    </section>
  );
}