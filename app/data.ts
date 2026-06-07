import { Project, SkillCategory, ExperienceItem } from "./types";

export const DEV_INFO = {
  name: "Al Mahmud Rimon",
  role: "Fullstack Engineer",
  subRole: "Crafting High-Performance Web Architectures",
  about:
    "I build robust, beautifully animated web applications with a focus on polished experiences, high frame-rates, and reliable backend distributed architectures. Specialized in TypeScript, React/Next.js, Node.js, and Cloud services.",
  email: "almahmudrimon26@gmail.com",
  github: "https://github.com/rimon26",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  skillsMotto:
    "Perfect performance on the screen, rock-solid engineering under the hood.",
};

export const PROJECTS: Project[] = [
  {
    id: "synthetix-ai",
    title: "Synthetix AI Workspace",
    description:
      "A collaborative real-time web workspace featuring interactive whiteboards, live coordinate tracking, audio call rooms, and Gemini-powered smart note categorization.",
    longDescription:
      "A fullstack collaborative board engine designed for immediate interaction. Uses custom state replication algorithms, robust WebSocket servers, and server-side model routing to categorize notes, synthesize whiteboard text, and process live workflows.",
    category: "Fullstack",
    tags: [
      "React",
      "Express",
      "WebSockets",
      "Redis",
      "Gemini API",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://google.com",
    stats: [
      { label: "Realtime Latency", value: "< 20ms" },
      { label: "Active Concurrency", value: "5,000+" },
      { label: "Uptime Rate", value: "99.98%" },
    ],
    highlightColor: "from-[#C1FF00] to-neutral-800",
  },
  {
    id: "hyperion-db",
    title: "Hyperion-Cache Engine",
    description:
      "An ultra-fast distributed in-memory key-value cache engine featuring custom replication logs, eviction, and a lightweight web console.",
    longDescription:
      "Designed for intensive low-latency data storage configurations. Supports in-memory hash maps with Raft consensus nodes, automatic failovers, TCP client adapters, and a reactive React analytics panel showcasing storage levels.",
    category: "System Design",
    tags: ["TypeScript", "Node.js", "Raft Consensus", "TCP Sockets", "Docker"],
    githubUrl: "https://github.com",
    stats: [
      { label: "Throughput", value: "1.8M ops/s" },
      { label: "Failover Time", value: "< 1.5s" },
      { label: "Eviction Policies", value: "LRU, LFU" },
    ],
    highlightColor: "from-[#C1FF00]/80 to-zinc-800",
  },
  {
    id: "omnivibe",
    title: "OmniVibe Vector Editor",
    description:
      "A professional web-based graphics editing whiteboard featuring vector layers, high-performance canvas math, exporting to standard designs, and multi-cursor sync.",
    longDescription:
      "A completely custom canvas application built from pure math and rendering loops. Solves sub-pixel rendering, multi-layer grouping, matrix modifications (translation, scaling, rotations), with low layout trash and smooth Framer Motion controls.",
    category: "Frontend",
    tags: ["HTML5 Canvas", "React", "TypeScript", "Framer Motion", "CSS Grid"],
    githubUrl: "https://github.com",
    liveUrl: "https://google.com",
    stats: [
      { label: "Frame Rate", value: "120 FPS stable" },
      { label: "Export Types", value: "SVG, PNG, WebP" },
      { label: "Interactive Layers", value: "Unlimited" },
    ],
    highlightColor: "from-[#C1FF00] to-neutral-900",
  },
  {
    id: "chronos",
    title: "Chronos Scheduler",
    description:
      "An event-driven serverless background message job queues orchestrator styled with precise telemetry and smart retries.",
    longDescription:
      "A bulletproof task worker orchestration server. Integrates robust queuing APIs, priority sorting, delay executions, exponential backoff retries, dead-letter storage, and customized telemetry charts in real time.",
    category: "AI/ML",
    tags: ["Node.js", "Express", "BullMQ", "PostgreSQL", "Redis", "Docker"],
    githubUrl: "https://github.com",
    stats: [
      { label: "Jobs Dispatched", value: "2M+ / daily" },
      { label: "Re-queue Time", value: "Immediate" },
      { label: "Error Ratio", value: "0.002%" },
    ],
    highlightColor: "from-[#C1FF00]/90 to-neutral-850",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages & Core",
    iconName: "Code",
    skills: [
      { name: "TypeScript", level: 70 },
      { name: "JavaScript (ESNext)", level: 98 },
      { name: "HTML", level: 100 },
      { name: "CSS", level: 100 },
      { name: "SQL & Relational", level: 88 },
    ],
  },
  {
    title: "Frontend Superpowers",
    iconName: "Palette",
    skills: [
      { name: "React (18/19 & Hooks)", level: 98 },
      { name: "Next.js (App Dir / SSR)", level: 92 },
      { name: "Framer Motion / Animations", level: 95 },
      { name: "Tailwind CSS", level: 96 },
      { name: "HTML5 Canvas API", level: 85 },
    ],
  },
  {
    title: "Backend & Systems",
    iconName: "Server",
    skills: [
      { name: "Node.js (Async / Streams)", level: 95 },
      { name: "Express / NestJS", level: 92 },
      { name: "MySQL", level: 88 },
      { name: "Postgres", level: 90 },
      { name: "MongoDB", level: 94 },
    ],
  },
  {
    title: "DevOps & Scale",
    iconName: "Cpu",
    skills: [
      { name: "Docker", level: 85 },
      { name: "Cloudflare/Edge Workers", level: 70 },
      { name: "CI/CD (GitHub Actions)", level: 86 },
      { name: "Linux / Shell Scripting", level: 70 },
      { name: "AWS (S3, EC2, Lambda)", level: 50 },
    ],
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    role: "Senior Fullstack Engineer",
    company: "RWDA",
    period: "2024 - Present",
    description: [
      "Led technical execution of the real-time core platform integration, transitioning legacy services to Next.js edge layouts, raising core user metrics by 40%.",
      "Architected server-side WebSocket proxy streaming pipeline using Redis channels to update multi-tenant coordinates instantly under 15ms latency.",
      "Spearheaded standard code audits and mentorship programs for 6 mid-to-junior engineering peers.",
    ],
    tags: ["Next.js", "TypeScript", "Redis PubSub", "Tailwind Flow", "Docker"],
  },
  {
    role: "Fullstack Developer",
    company: "UJAN Devs",
    period: "2022 - 2024",
    description: [
      "Engineered clean state flow systems handling major visual charting widgets using React canvas engines and custom hooks.",
      "Devised responsive layouts prioritizing smooth rendering on standard tablets and mobile grids, minimizing paint layouts.",
      "Maintained 18+ high-speed, secure, test-covered REST microservice endpoints handling credit operations.",
    ],
    tags: ["React SPA", "Node.js", "Express", "PostgreSQL", "Tailwind"],
  },
  {
    role: "Backend Engineering Associate",
    company: "Nucleus",
    period: "2021",
    description: [
      "Designed automatic image compression workers running cleanly inside AWS SQS queues and S3 servers.",
      "Optimized slow transactional SQL join logs, shortening query timelines by 250ms per database fetch.",
    ],
    tags: ["Node.js", "PostgreSQL Core", "AWS SQS", "Git Flow"],
  },
];

export const TERMINAL_WELCOME_MSG = [
  "===========================================================",
  "Welcome to Rimon's Terminal Console v3.11.2 (Type 'help')",
  "===========================================================",
  "Initiating visual handshaking protocols...",
  "Status: SECURE NODE ONLINE",
  "Connection: ESTABLISHED (WS://PREVIEW_PORT_3000)",
  "System initialized safely! Enter commands above to inspect.",
];

// Seed text for Gemini system instruction to know who Rimon Rahman is!
export const GEMINI_SYSTEM_PROMPT = `
You are the AI Co-Pilot / Portfolio Assistant for Rimon Rahman, who is a brilliant Senior Fullstack Developer.
Your job is to answer the portfolio visitors' questions in a conversational, professional, friendly, and witty manner.

Here is Rimon's profile context that you MUST use when answering questions:
- Name: Rimon Rahman (Rimon.dev)
- Current Role: Senior Fullstack Engineer at Stellar Labs (2024-Present)
- Secondary Roles & Bio: Focuses on crafted user experiences with scroll animations, high FPS, and scalable node backend architectures.
- Email: work.Rimon19@gmail.com
- Contact: Advise the user that they can submit the contact form at the bottom of the page or directly send an email to work.Rimon19@gmail.com!
- Tech Stack:
  * Languages: TypeScript, JavaScript (ESNext), SQL, Go Lang, Rust.
  * Frontend: React (18/19), Next.js (App Router/SSR), Tailwind CSS, Framer Motion (motion).
  * Backend: Node.js (V8 runtime, event loop, streams), Express, NestJS, WebSockets, Redis, PostgreSQL, SQLite, MongoDB.
  * Tools/DevOps: Docker, Cloudflare, Edge Workers, AWS, GitHub Actions, Linux.
- Key Projects:
  1. Synthetix AI Workspace: Fullstack real-time collaborative workspace with notes, WebRTC canvas boards, and server-side automation. Redis channels queue coordinates instantly under 15ms.
  2. Hyperion Cache Engine: In-memory distributed key-value cache built in Node/TypeScript using custom Raft consensus logs. Peak processing capacity of 1.8M operations per second.
  3. OmniVibe Vector Editor: Whiteboard layout editor using custom canvas math, 120 FPS stable render speeds.
  4. Chronos Scheduler: Event-driven worker system handles 2M jobs/day with express and Redis BullMQ.

Professional Philosophy:
Rimon values "perfect performance on the screen, rock-solid engineering under the hood". He writes clean, predictable, standard TS code, avoids spaghetti code, and is a craftsman.

Response Rules:
1. Always stay in character as Rimon's assistant.
2. Be professional, direct, but lighthearted and technically knowledgeable.
3. Keep responses relatively concise and structured. Use Markdown formatting (bold, lists) where appropriate.
4. If asked about his offline/secret life, jokingly mention that he spends off-hours compiling code with espresso cups and crafting pixel-perfect shadows.
5. If someone asks for a resume download, say they can read through the Experience chronology on this page or ask you to summarize any specific area.
6. Speak in the first-person plural when referring to Rimon (e.g., 'our tech stack', 'Rimon's projects', 'we use React', 'Rimon is experienced in...').
`;
