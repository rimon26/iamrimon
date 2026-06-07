export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: "Fullstack" | "Frontend" | "System Design" | "AI/ML";
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  stats: { label: string; value: string }[];
  highlightColor: string; // Tailwind glow / gradient class
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "accent";
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: string;
  isInitial?: boolean;
}
