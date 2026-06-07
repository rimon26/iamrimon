"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  Clock,
  Code2,
  Briefcase,
  Terminal as TerminalIcon,
  Cpu,
  Brain,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  PhoneCall,
  RefreshCw,
} from "lucide-react";

import { DEV_INFO, SKILL_CATEGORIES, EXPERIENCE_TIMELINE } from "./data";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import TerminalPlayground from "@/components/TerminalPlayground";
import AICopilot from "@/components/AICopilot";
import ProjectShowcase from "@/components/ProjectShowcase";
import "./index.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Contact State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Time stamp state
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync scroll sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "skills",
        "terminal",
        "projects",
        "timeline",
        "contact",
      ];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactMsg("");
      // Reset success status after a little bit
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  const scrollSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen text-neutral-200 selection:bg-[#C1FF00] selection:text-black overflow-x-hidden font-sans bg-[#0A0A0A] bg-art-grid">
      {/* Background & Cursor overlay components */}
      <ParticleBackground />
      <CustomCursor />

      {/* Primary Sticky Header */}
      <header
        id="app-navbar"
        className="fixed top-0 left-0 w-full z-40 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10 select-none"
      >
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo Branding */}
          <button
            onClick={() => scrollSection("hero")}
            className="flex items-center space-x-2.5 font-display font-black text-lg tracking-wider text-white hover:text-[#C1FF00] cursor-pointer transition-colors uppercase"
            id="brand-logo"
          >
            <div className="w-9 h-9 rounded-full bg-[#C1FF00] flex items-center justify-center text-sm text-black font-black">
              A
            </div>
            <span>
              Al Mahmud <span className="text-[#C1FF00]">Rimon</span>
            </span>
          </button>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-mono tracking-widest text-neutral-400">
            {[
              "About",
              "Skills",
              "Terminal",
              "Projects",
              "Timeline",
              "Contact",
            ].map((sec) => {
              const lowerSec = sec.toLowerCase();
              const isActive = activeSection === lowerSec;
              return (
                <button
                  key={sec}
                  onClick={() => scrollSection(lowerSec)}
                  id={`nav-link-${lowerSec}`}
                  className={`hover:text-[#C1FF00] uppercase relative cursor-pointer py-1.5 transition-colors ${
                    isActive ? "text-[#C1FF00] font-semibold" : ""
                  }`}
                >
                  {sec}
                  {isActive && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C1FF00]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Connect button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollSection("contact")}
              id="cta-connect"
              className="cursor-pointer font-mono text-[10px] font-bold uppercase tracking-widest bg-transparent border border-white/15 hover:border-[#C1FF00]/40 text-neutral-300 hover:text-[#C1FF00] py-2 px-4.5 rounded-full backdrop-blur-xl transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile Hamburg Trigger toggles */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            id="mobile-menu-trigger"
            className="md:hidden text-neutral-400 hover:text-[#C1FF00] p-1 rounded-lg hover:bg-neutral-900/60 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu modal display */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              className="md:hidden absolute top-16 left-0 w-full bg-neutral-950/95 backdrop-blur-3xl border-b border-neutral-800 flex flex-col p-6 space-y-4 font-mono text-center select-none"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {[
                "About",
                "Skills",
                "Terminal",
                "Projects",
                "Timeline",
                "Contact",
              ].map((sec) => {
                const lowerSec = sec.toLowerCase();
                return (
                  <button
                    key={sec}
                    onClick={() => scrollSection(lowerSec)}
                    className="text-neutral-300 hover:text-[#C1FF00] py-2.5 border-b border-white/5 last:border-none cursor-pointer text-xs tracking-widest uppercase"
                  >
                    {sec}
                  </button>
                );
              })}
              <button
                onClick={() => scrollSection("contact")}
                className="bg-[#C1FF00] text-black py-2.5 rounded-full font-bold cursor-pointer transition-all uppercase tracking-wider text-xs font-mono"
              >
                CONNECT NOW
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container Sections */}
      <main className="max-w-7xl mx-auto px-6 pt-16 relative">
        {/* SECTION 1: HERO CONTAINER */}
        <section
          id="hero"
          className="min-h-[85vh] sm:min-h-screen flex flex-col justify-center items-start pt-10 sm:pt-0 relative select-none"
        >
          {/* Accent orbs glow layouts */}
          <div className="absolute top-[20%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-[#C1FF00]/5 blur-[100px] pointer-events-none -z-10 animate-pulse" />
          <div className="absolute bottom-[10%] left-[5%] w-[20vw] h-[20vw] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full relative"
          >
            {/* Ambient Background Watermark italic number */}
            <div className="absolute -top-12 right-12 opacity-[0.03] text-[180px] font-black italic select-none pointer-events-none tracking-tighter">
              01
            </div>

            {/* Top Micro status */}
            <div className="mb-6 flex items-center space-x-2 bg-neutral-900/60 border border-white/5 px-3.5 py-1.5 rounded-full w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C1FF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C1FF00]"></span>
              </span>
              <span className="text-[9px] sm:text-xs font-mono font-black tracking-widest text-[#C1FF00] uppercase">
                ACTIVE STATUS: INTAKING CONTRACT PROJECTS
              </span>
            </div>

            {/* Display Big titles */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter font-display mb-4 text-white leading-[0.9] uppercase">
              Hey, I am{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C1FF00] via-[#C1FF00]/95 to-white/40">
                {DEV_INFO.name}
              </span>
            </h1>

            <h2 className="text-lg sm:text-2xl text-neutral-300 font-display font-medium tracking-wider mb-6 italic uppercase">
              {DEV_INFO.role}{" "}
              <span className="text-neutral-500 font-light block sm:inline">
                — {DEV_INFO.subRole}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-sans leading-relaxed mb-10 select-text font-light italic">
              {DEV_INFO.about}
            </p>

            {/* CTA anchors panel */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => scrollSection("terminal")}
                id="hero-cta-terminal"
                className="group relative cursor-pointer bg-[#C1FF00] hover:bg-white text-black font-black uppercase tracking-widest text-[11px] py-4 px-8 rounded-full flex items-center justify-center gap-2 select-none hover:scale-105 transition-transform"
              >
                Launch Terminal
                <TerminalIcon size={14} />
                <motion.span
                  className="absolute bottom-1 right-3 text-[7px] font-mono opacity-50"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  CLI
                </motion.span>
              </button>

              <button
                onClick={() => scrollSection("projects")}
                id="hero-cta-works"
                className="cursor-pointer border border-white/10 hover:border-[#C1FF00]/40 bg-transparent hover:text-[#C1FF00] font-mono text-[10px] tracking-widest uppercase py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
              >
                Audit Projects <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* Scrolling Down Hint indicators */}
          <div className="absolute bottom-16 left-0 right-0 hidden sm:flex justify-between items-center select-none w-full border-t border-white/10 pt-4 text-[9px] text-neutral-500 font-mono">
            <span className="flex items-center gap-1.5 hover:text-neutral-300">
              <Clock size={11} className="text-neutral-600" /> SYSTEM:{" "}
              <span className="text-[#C1FF00]">{currentTime}</span>
            </span>
            <button
              onClick={() => scrollSection("about")}
              className="text-neutral-400 hover:text-[#C1FF00] animate-bounce flex items-center gap-1 uppercase tracking-wider"
            >
              SCROLL DOWN AT LEAST ↓
            </button>
            <span className="uppercase tracking-widest">
              PREVIEW SERVER: PORT 3000 // LATENCY ~3MS
            </span>
          </div>
        </section>

        {/* SECTION 2: ABOUT CONTAINER */}
        <section id="about" className="py-24 border-t border-white/10 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 select-none animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-[0.2em] font-display uppercase mb-2">
                [ ABOUT THE ENGINEER ]
              </h2>
              <p className="text-[10px] font-mono text-[#C1FF00] uppercase tracking-[0.35em] font-bold">
                TRANSLATING COMPLEX PARADIGMS INTO FLUID WORKSPACES
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              {/* Card block 1: General Philosophy */}
              <motion.div
                className="md:col-span-2 rounded-2xl bg-[#0A0A0A]/40 border border-white/15 p-6 lg:p-8 hover:border-[#C1FF00]/25 transition-all duration-300"
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 select-none mb-4 font-display">
                  <div className="p-2 bg-neutral-900/80 border border-white/10 rounded-full text-[#C1FF00]">
                    <Code2 size={16} />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                    Philosophy & Engineering Ethics
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed space-y-4 select-text font-light italic">
                  I consider programming an art where visual perfection and
                  robust, transactional speed go hand-in-hand. My applications
                  avoid low-quality scaffolding and instead rely on cleanly
                  composed hooks, robust custom types, and deterministic data
                  models.
                  <br />
                  <br />
                  By utilizing asynchronous workers, streaming nodes, and
                  intelligent cache eviction layers like Redis, I keep systems
                  ultra-responsive. Whether optimizing sub-pixel paint
                  operations in the browser or implementing replication logs for
                  database servers, I thrive on standardizing the complex.
                </p>
              </motion.div>

              {/* Card block 2: Quantitative Stats stats */}
              <motion.div
                className="rounded-2xl bg-[#0A0A0A]/40 border border-white/15 p-6 flex flex-col justify-between hover:border-[#C1FF00]/25 transition-all duration-300"
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 select-none mb-4 font-display">
                  <div className="p-2 bg-neutral-900/80 border border-white/10 rounded-full text-[#C1FF00]">
                    <Briefcase size={16} />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                    Fast Audits
                  </h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="text-4xl font-black text-[#C1FF00] font-mono tracking-tighter">
                      5+
                    </div>
                    <div className="text-[9px] uppercase font-mono tracking-widest text-neutral-500 font-bold">
                      Years in Industry
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white/90 font-mono tracking-tighter">
                      25k+
                    </div>
                    <div className="text-[9px] uppercase font-mono tracking-widest text-neutral-500 font-bold font-mono">
                      Lines of Code Written
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-[#C1FF00]/90 font-mono tracking-tighter">
                      20+
                    </div>
                    <div className="text-[9px] uppercase font-mono tracking-widest text-neutral-500 font-bold">
                      Production Deployments
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SKILLS TABBED CONTAINER CONTAINER */}
        <section
          id="skills"
          className="py-24 border-t border-white/10 relative"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 select-none">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-[0.2em] font-display uppercase mb-2">
                [ TECHNICAL SKILLS MATRIX ]
              </h2>
              <p className="text-[10px] font-mono text-[#C1FF00] uppercase tracking-[0.35em] font-bold">
                QUANTIFYING STRUCTURAL EXPERTISE LEVELS
              </p>
            </div>

            {/* Dynamic CSS Grid for categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILL_CATEGORIES.map((cat, cIdx) => (
                <motion.div
                  key={cat.title}
                  className="rounded-2xl border border-white/10 bg-[#0A0A0A]/40 p-6 hover:border-[#C1FF00]/25 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: cIdx * 0.1 }}
                >
                  <h3 className="text-xs font-mono font-bold tracking-widest text-[#C1FF00] uppercase select-none mb-4 pb-2 border-b border-white/5">
                    {"//"} {cat.title}
                  </h3>

                  <div className="space-y-4">
                    {cat.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center text-xs font-mono mb-1 text-neutral-300">
                          <span>{skill.name}</span>
                          <span className="text-neutral-550 font-bold">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Custom visual level bar */}
                        <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-950">
                          <motion.div
                            className="h-full bg-[#C1FF00] rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tactical skills motto footer */}
            <div className="p-4 bg-white/[0.02] border border-white/10 rounded-full text-center text-xs text-neutral-400 font-mono mt-8 select-all max-w-2xl mx-auto uppercase tracking-wide">
              📋 Stated Focus: &ldquo;{DEV_INFO.skillsMotto}&rdquo;
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE CLI TERMINAL */}
        <section
          id="terminal"
          className="py-24 border-t border-white/10 relative"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 select-none">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-[0.2em] font-display uppercase mb-2">
                [ SECURE CLI SHELL ]
              </h2>
              <p className="text-[10px] font-mono text-[#C1FF00] uppercase tracking-[0.35em] font-bold">
                QUERY THE ENGINEER&apos;S BACKGROUND DIRECTLY
              </p>
            </div>

            <TerminalPlayground />
          </div>
        </section>

        {/* SECTION 5: PROJECTS SHOWCASE */}
        <section
          id="projects"
          className="py-24 border-t border-white/10 relative animate-fade-in-up"
        >
          <div className="text-center mb-16 select-none">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-[0.2em] font-display uppercase mb-2">
              [ PRODUCTION PROJECTS ]
            </h2>
            <p className="text-[10px] font-mono text-[#C1FF00] uppercase tracking-[0.35em] font-bold animate-pulse">
              DESIGNED FOR HIGH PERFORMANCE SYSTEM LATENCY
            </p>
          </div>

          <ProjectShowcase />
        </section>

        {/* SECTION 6: WORK CHRONOLOGY TIMELINE */}
        <section
          id="timeline"
          className="py-24 border-t border-white/10 relative"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 select-none">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-[0.2em] font-display uppercase mb-2">
                [ Experience Timeline ]
              </h2>
              <p className="text-[10px] font-mono text-[#C1FF00] uppercase tracking-[0.35em] font-bold">
                CHRONOLOGICAL HISTORY OF ENGINEERING IMPACT
              </p>
            </div>

            {/* Timeline vertical bar lines */}
            <div className="relative border-l border-white/10 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-12">
              {EXPERIENCE_TIMELINE.map((item, idx) => (
                <motion.div
                  key={item.role + item.company}
                  id={`timeline-item-${idx}`}
                  className="relative group font-sans"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {/* Floating bullet nodes */}
                  <div className="absolute -left-[31px] sm:-left-[39px] w-4 h-4 rounded-full border border-[#C1FF00] bg-black flex items-center justify-center top-1 select-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C1FF00] group-hover:scale-150 transition-transform duration-300" />
                  </div>

                  {/* Header card details */}
                  <div className="mb-2.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-[#C1FF00] bg-[#C1FF00]/10 border border-[#C1FF00]/25 px-2 py-0.5 rounded-md mr-3.5 select-none">
                      {item.period}
                    </span>
                    <h3 className="inline text-lg font-bold text-white font-display group-hover:text-[#C1FF00] transition-colors uppercase">
                      {item.role}
                    </h3>
                    <div className="text-xs text-neutral-500 font-mono mt-1 select-none">
                      @ {item.company}
                    </div>
                  </div>

                  {/* Accomplishment Bullet list */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-450 leading-relaxed mb-4 list-disc pl-4 select-text">
                    {item.description.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="hover:text-neutral-300 transition-colors"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Custom tech tag subchips */}
                  <div className="flex flex-wrap gap-1.5 select-none">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] uppercase font-mono text-neutral-400 bg-neutral-900/60 px-2 py-0.5 rounded border border-white/5 hover:border-[#C1FF00]/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: INTERACTIVE SECURE CONTACT DISPATCH */}
        <section
          id="contact"
          className="py-24 border-t border-white/10 relative"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16 select-none">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-[0.2em] font-display uppercase mb-2">
                [ GET IN TOUCH ]
              </h2>
              <p className="text-[10px] font-mono text-[#C1FF00] uppercase tracking-[0.35em] font-bold">
                INITIATING SECURE ENCRYPTED CONTACT SIGNAL
              </p>
            </div>

            <motion.div
              id="contact-form-card"
              className="rounded-2xl border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-xl p-6 lg:p-8 shadow-xl"
              whileInView={{ opacity: [0, 1] }}
              viewport={{ once: true }}
            >
              <form
                onSubmit={handleContactSubmit}
                className="space-y-5 font-sans"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[9px] font-mono text-neutral-400 uppercase tracking-[0.2em] select-none mb-1.5 font-bold"
                    >
                      Your Identification Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#0E0E0E] focus:bg-black border border-white/10 focus:border-[#C1FF00]/45 outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[9px] font-mono text-neutral-400 uppercase tracking-[0.2em] select-none mb-1.5 font-bold"
                    >
                      Destination Email Protocol
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. john@domain.com"
                      className="w-full bg-[#0E0E0E] focus:bg-black border border-white/10 focus:border-[#C1FF00]/45 outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[9px] font-mono text-neutral-400 uppercase tracking-[0.2em] select-none mb-1.5 font-bold"
                    id="label-message"
                  >
                    Encrypted Payload Message Text
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Describe your architecture requirements, schedule specs or contract proposals..."
                    className="w-full bg-[#0E0E0E] focus:bg-black border border-white/10 focus:border-[#C1FF00]/45 outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-700 transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Response feedback overlays */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      id="contact-success-ticket"
                      className="bg-[#C1FF00]/5 border border-[#C1FF00]/35 p-4 rounded-xl text-xs text-[#C1FF00] flex items-start gap-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <CheckCircle
                        size={16}
                        className="text-[#C1FF00] shrink-0 mt-0.5 animate-pulse"
                      />
                      <div>
                        <strong className="block text-sm font-semibold mb-1 uppercase tracking-wider font-mono">
                          Payload Sent Safely!
                        </strong>
                        Your message buffer has been stored. Arifur Rahman will
                        acknowledge this coordination request as soon as
                        possible.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex select-none flex-col sm:flex-row items-center sm:justify-between gap-4 border-t border-white/5 pt-5 mt-4">
                  <span className="text-[9px] text-[#C1FF00] font-mono tracking-wider flex items-center gap-1 font-bold uppercase">
                    <PhoneCall size={10} /> DIRECT PROTOCOL:
                    almahmudrimon26@gmail.com
                  </span>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full sm:w-auto bg-[#C1FF00] hover:bg-white text-black font-black uppercase tracking-widest py-3.5 px-8 rounded-full transition-all font-mono text-xs disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        Encrypting...
                      </>
                    ) : (
                      <>
                        Transmit Payload
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Decorative infinite scrolling marquee wrapper to match artistic flair criteria */}
      <footer className="relative z-10 h-16 border-t border-white/10 flex items-center bg-black overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center text-[10px] font-black uppercase tracking-[0.4em] px-4 gap-4 text-neutral-400">
            <span className="text-[#C1FF00]">Next.js</span> •{" "}
            <span>Tailwind CSS</span> •{" "}
            <span className="text-[#C1FF00]">Framer Motion</span> •{" "}
            <span>Three.js</span> •{" "}
            <span className="text-[#C1FF00]">TypeScript</span> •{" "}
            <span>GraphQL</span> • <span className="text-[#C1FF00]">AWS</span> •{" "}
            <span>Docker</span> •{" "}
            <span className="text-[#C1FF00]">PostgreSQL</span> •{" "}
            <span>Figma</span> •{" "}
            <span className="text-[#C1FF00]">React Native</span>
          </div>
          <div className="flex items-center text-[10px] font-black uppercase tracking-[0.4em] px-4 gap-4 text-neutral-400">
            <span className="text-[#C1FF00]">Next.js</span> •{" "}
            <span>Tailwind CSS</span> •{" "}
            <span className="text-[#C1FF00]">Framer Motion</span> •{" "}
            <span>Three.js</span> •{" "}
            <span className="text-[#C1FF00]">TypeScript</span> •{" "}
            <span>GraphQL</span> • <span className="text-[#C1FF00]">AWS</span> •{" "}
            <span>Docker</span> •{" "}
            <span className="text-[#C1FF00]">PostgreSQL</span> •{" "}
            <span>Figma</span> •{" "}
            <span className="text-[#C1FF00]">React Native</span>
          </div>
        </div>
      </footer>

      {/* Persistence AI floating chatbot copilot component overlay */}
      <AICopilot />

      {/* Clean Bottom Footer */}
      <footer
        id="app-footer"
        className="w-full py-10 border-t border-white/10 bg-black backdrop-blur-md select-none"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-xs font-mono">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <span className="text-white font-black font-display uppercase tracking-wider">
              al mahmud rimon
            </span>{" "}
            © 2026. All operations securely configured.
          </div>

          {/* Social icons handles */}
          <div className="flex space-x-5 py-4 md:py-0 select-none">
            <a
              href={DEV_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C1FF00] transition-colors selector-link"
            >
              <Github size={15} />
            </a>
            <a
              href={DEV_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C1FF00] transition-colors selector-link"
            >
              <Linkedin size={15} />
            </a>
            <a
              href={DEV_INFO.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#C1FF00] transition-colors selector-link"
            >
              <Twitter size={15} />
            </a>
            <a
              href={`mailto:${DEV_INFO.email}`}
              className="hover:text-[#C1FF00] transition-colors selector-link"
            >
              <Mail size={15} />
            </a>
          </div>

          <div className="text-center md:text-right font-mono text-[9px] uppercase tracking-wider">
            PORT: <span className="text-[#C1FF00]">3000</span> • STATE:{" "}
            <span className="text-emerald-400">SECURE</span> {"// CLOCK LATEST"}
          </div>
        </div>
      </footer>
    </div>
  );
}
