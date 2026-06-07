"use client";

import { useState } from "react";
import {
  ExternalLink,
  Github,
  Code2,
  Sparkles,
  Database,
  Cpu,
} from "lucide-react";
import { motion } from "motion/react";
import { Project } from "@/app/types";
import { PROJECTS } from "@/app/data";

export default function ProjectShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Helper to map category to an icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Fullstack":
        return <Code2 className="text-[#C1FF00]" size={16} />;
      case "System Design":
        return <Database className="text-[#C1FF00]/80" size={16} />;
      case "Frontend":
        return <Sparkles className="text-[#C1FF00]" size={16} />;
      default:
        return <Cpu className="text-[#C1FF00]/90" size={16} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
      {PROJECTS.map((project, idx) => {
        const isHovered = hoveredId === project.id;

        return (
          <motion.div
            key={project.id}
            id={`project-card-${project.id}`}
            className="group relative rounded-2xl border border-white/10 bg-[#0A0A0A]/45 hover:bg-[#0A0A0A]/95 hover:border-[#C1FF00]/30 backdrop-blur-md p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 overflow-hidden"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            {/* Hover ambient color glow background */}
            <div
              className={`absolute -inset-px bg-gradient-to-br ${project.highlightColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl pointer-events-none`}
            />

            <div>
              {/* Category, Title & Links */}
              <div className="flex items-center justify-between select-none mb-4">
                <span className="flex items-center gap-1.5 text-[9px] uppercase font-mono font-bold tracking-wider text-neutral-300 bg-black/60 px-2.5 py-1 rounded-full border border-white/5">
                  {getCategoryIcon(project.category)}
                  {project.category}
                </span>

                <div className="flex items-center space-x-3 text-neutral-400">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#C1FF00] p-1 rounded-md hover:bg-[#0A0A0A] transition-colors cursor-pointer"
                      title="GitHub Repository"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#C1FF00] p-1 rounded-md hover:bg-[#0A0A0A] transition-colors cursor-pointer"
                      title="Live Deployment"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white tracking-tight font-display mb-2 group-hover:text-[#C1FF00] transition-colors uppercase">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tag Chips list */}
              <div className="flex flex-wrap gap-1.5 mb-6 select-none">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] uppercase font-mono text-neutral-400 bg-neutral-900/40 px-2 py-0.5 rounded border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance telemetry stats panel */}
            <div className="border-t border-white/5 pt-5 mt-auto">
              <div className="grid grid-cols-3 gap-2 text-center">
                {project.stats.map((st, sidx) => (
                  <div
                    key={sidx}
                    className="border-r border-white/5 last:border-none px-1"
                  >
                    <div className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider mb-1">
                      {st.label}
                    </div>
                    <motion.div
                      className="text-xs sm:text-sm font-bold text-[#C1FF00] font-mono tracking-tight"
                      animate={{ scale: isHovered ? [1, 1.05, 1] : 1 }}
                      transition={{ duration: 0.4, delay: sidx * 0.05 }}
                    >
                      {st.value}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
