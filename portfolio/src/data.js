// =========================================================
// Central content file — edit your resume data here only.
// All components pull from this single source of truth.
// =========================================================

// Base64 decoder helper to obfuscate contact details from email/phone harvesting scrapers
const decodeB64 = (str) => {
  if (typeof window !== "undefined") return atob(str);
  if (typeof globalThis.Buffer !== "undefined") return globalThis.Buffer.from(str, "base64").toString("utf-8");
  return "";
};

export const profile = {
  name: "Balaji R",
  role: "Cybersecurity Engineer",
  location: "Coimbatore, Tamil Nadu, India",
  email: decodeB64("YmFsYWppY2JlMEBnbWFpbC5jb20="), // balajicbe0@gmail.com
  phone: decodeB64("KzkxIDgwNTY0IDU2NTE2"), // +91 80564 56516
  phoneHref: decodeB64("KzkxODA1NjQ1NjUxNg=="), // +918056456516
  links: {
    linkedin: "https://www.linkedin.com/in/balaji-r-400b342a2/",
    github: "https://github.com/BALAJI-R02",
    leetcode: "https://leetcode.com/u/BALAJI_R02/",
    tryhackme: "https://tryhackme.com/p/BALAJI.R",
  },
  tagline: "Final-year CSE (Cybersecurity) undergraduate open to both cybersecurity and software development roles. I do web app pentesting, OSINT, and build with React, MySQL.",
  bio: "Final-year Computer Science Engineering (Cybersecurity) undergraduate at Dr. NGP Institute of Technology, open to both cybersecurity and software development roles. I specialize in web application security, penetration testing and OSINT reconnaissance — with hands-on experience assessing real systems against the OWASP Top 10. On the development side, I build with HTML, CSS, JavaScript, React and MySQL, backed by strong Java fundamentals. NPTEL certified with 92%, interned at Hackup Technologies and actively competed in 6+ hackathons. I approach every problem — whether a vulnerability or a feature — with the same structured, analytical mindset.",
};

export const stats = [
  { value: 5, suffix: "+", label: "apps assessed" },
  { value: 10, suffix: "+", label: "misconfigs found" },
  { value: 6, suffix: "", label: "hackathons" },
  { value: 8.2, suffix: "", label: "CGPA" },
];

// Add exact platform numbers here when you want the site to show them:
// example: { value: "180+", label: "LeetCode solved", ... }
export const platformHighlights = [
  {
    value: "220+",
    label: "LeetCode problems",
    detail: "DSA problems solved with profile proof",
    href: profile.links.leetcode,
  },
  {
    value: "70+",
    label: "TryHackMe rooms",
    detail: "Hands-on cybersecurity rooms completed",
    href: profile.links.tryhackme,
  },
  {
    value: "6",
    label: "certifications",
    detail: "Security, pentesting, Microsoft, OWASP",
    href: "#certs",
  },
  {
    value: "2",
    label: "project writeups",
    detail: "AI security and OSINT-focused builds",
    href: "#projects",
  },
];

export const experience = [
  {
    title: "Cybersecurity Intern",
    org: "Hackup Technologies",
    date: "Jun 2025 — Jul 2025",
    points: [
      "Assessed 5+ web applications using the OWASP Top 10 methodology, identifying 10+ critical misconfigurations across network services",
      "Simulated Evil Twin and XSS attacks in isolated test environments to surface wireless and web application vulnerabilities",
      "Performed OSINT reconnaissance using Maltego, and built Python scripts to automate port enumeration and vulnerability detection",
      "Analyzed HTTP / FTP / SMTP traffic in Wireshark to detect exploitable protocol-level weaknesses",
    ],
  },
];

// Projects now carry a real methodology block (objective → method → finding → next step)
// instead of a one-line description — this is what a recruiter actually wants to see.
export const projects = [
  {
    tag: "AI / SECURITY",
    tagColor: "red",
    status: "OPEN SOURCE",
    title: "SecureSphere",
    subtitle: "AI-Based Secure Communication System",
    objective: "Build a system that flags risky communication (text, audio, visual) in real time and preserves tamper-evident evidence for later review.",
    method: "Combined ML-based content classifiers across three input types with a risk-scoring layer; built a cryptographic evidence vault using hash-based integrity verification so flagged items can be audited without being altered.",
    finding: "Hash-chained storage meant any post-capture tampering was immediately detectable — the core requirement for using this kind of system as actual forensic evidence.",
    next: "Extend risk scoring with confidence calibration so low-certainty flags are visually distinct from high-certainty ones.",
    stack: ["Python", "AI/ML", "Cryptography", "Forensics"],
    link: "https://github.com/BALAJI-R02/secure-sphere",
  },
  {
    tag: "NLP / OSINT",
    tagColor: "amber",
    status: "OPEN SOURCE",
    title: "Anti Wildlife Tracking",
    subtitle: "AI Monitoring System",
    objective: "Detect illegal wildlife trade listings across open web, social platforms, and dark web sources faster than manual review allows.",
    method: "Built an NLP pipeline to classify listing language and built pattern recognition for hidden/coded communication common in illicit trade groups, surfacing suspicious posts for human review.",
    finding: "Coded terminology and euphemism shifted often enough that a static keyword list alone produced too many false negatives — pattern-based classification performed meaningfully better.",
    next: "Add a feedback loop so analyst-confirmed false positives retrain the classifier over time.",
    stack: ["NLP", "Python", "OSINT", "Dark Web Monitoring"],
    link: "https://github.com/BALAJI-R02/Anti-Wildlife-Trafficking",
  },
];


export const skills = {
  Programming: ["Java", "Python", "JavaScript"],
  "Web Development": ["HTML", "CSS", "React", "SpringBoot"],
  Database: ["MySQL"],
  "Data Structures & Algorithms": ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs"],
  "Security Tools": ["Nmap", "Wireshark", "Maltego", "Burp Suite"],
  "Core Areas": ["Networking", "Penetration Testing", "OWASP Top 10", "Web App Security"],
  "Platforms & Utilities": ["Linux (Kali)", "Git", "GitHub", "VS Code", "Windows"],
};

export const certifications = [
  { file: "nptel.png", name: "Practical Cyber Security for Cyber Security Practitioners", org: "NPTEL", score: "92%" },
  { file: "tata-forage.png", name: "Cybersecurity Analyst Job Simulation", org: "Tata Forage", score: "" },
  { file: "ccep.png", name: "Certified Cybersecurity Educator Professional (CCEP)", org: "Red Team Leaders", score: "" },
  { file: "security-blue-team.png", name: "Introduction to Penetration Testing", org: "Security Blue Team", score: "" },
  { file: "microsoft.png", name: "Microsoft Security Essentials Professional Certificate", org: "Microsoft / LinkedIn Learning", score: "" },
  { file: "owasp.png", name: "OWASP Coimbatore Chapter Meetup", org: "Kumaraguru College of Technology", score: "" },
];

export const hackathons = [
  { title: "CCTV Surveillance Security and Forensics Hackathon 2.0", desc: "Presented a security-focused solution for real-world surveillance and digital forensics challenges." },
  { title: "MSME Idea Hackathon 5.0", desc: "Developed and presented an idea proposal; advanced to Round 2 out of nationwide submissions." },
  { title: "24-Hour Hackathon — Coimbatore Institute of Technology", desc: "Collaborated in a team to design and prototype solutions under real-world time constraints." },
  { title: "CodeZap Hackathon — Descience Open Source Club", desc: "Inter-college hackathon focused on AI tools, agile methodologies, and problem-solving." },
  { title: "Problem-Solving Contest — Bannari Amman Institute of Technology", desc: "Competitive contest focused on algorithmic and logical challenges." },
  { title: "Codeathon — Sri Ramakrishna Engineering College", desc: "Coding competition involving real-world problem scenarios." },
];

export const education = [
  {
    school: "Dr. NGP Institute of Technology",
    degree: "B.E. Computer Science and Engineering (Cybersecurity)",
    date: "2023 — 2027",
    score: "CGPA: 8.2",
  },
  {
    school: "Sri Sowdeswari Vidyalaya Matriculation Hr. Sec. School",
    degree: "Higher Secondary Certificate",
    date: "",
    score: "HSC: 82%",
  },
];
