import React, { useState } from "react";
import {
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { FiCpu, FiLink, FiPenTool } from "react-icons/fi";
import { SiExpress, SiMongodb } from "react-icons/si";

const FILTERS = ["All", "Frontend", "Backend", "Database", "Tools"];

const SKILLS = [
  {
    name: "HTML",
    level: 92,
    cat: "Frontend",
    icon: FaHtml5,
    text: "Semantic, accessible markup that gives every page a solid structure.",
  },
  {
    name: "CSS",
    level: 90,
    cat: "Frontend",
    icon: FaCss3Alt,
    text: "Responsive layouts with Flexbox and Grid, plus clean transitions and animations.",
  },
  {
    name: "JavaScript",
    level: 88,
    cat: "Frontend",
    icon: FaJs,
    text: "Interactive features, form handling, and API calls in modern JavaScript.",
  },
  {
    name: "React",
    level: 88,
    cat: "Frontend",
    icon: FaReact,
    text: "Component-based interfaces with hooks and state, built with Vite.",
  },
  {
    name: "UI/UX basics",
    level: 86,
    cat: "Frontend",
    icon: FiPenTool,
    text: "Clear layouts, spacing, and hierarchy so sites feel easy to use.",
  },
  {
    name: "Node.js",
    level: 82,
    cat: "Backend",
    icon: FaNodeJs,
    text: "Server-side JavaScript for application logic and project backends.",
  },
  {
    name: "Express.js",
    level: 76,
    cat: "Backend",
    icon: SiExpress,
    text: "Routes, middleware, and validation for the APIs behind my projects.",
  },
  {
    name: "REST APIs",
    level: 74,
    cat: "Backend",
    icon: FiLink,
    text: "Connecting endpoints between the React frontend and server.",
  },
  {
    name: "MongoDB",
    level: 72,
    cat: "Database",
    icon: SiMongodb,
    text: "Schemas and models for storing messages, users, and project data.",
  },
  {
    name: "Git & GitHub",
    level: 78,
    cat: "Tools",
    icon: FaGitAlt,
    text: "Version control, commits, and publishing my work on GitHub.",
  },
  {
    name: "Figma",
    level: 72,
    cat: "Tools",
    icon: FaFigma,
    text: "Planning screens and layouts before writing any code.",
  },
  {
    name: "Problem solving",
    level: 85,
    cat: "Tools",
    icon: FiCpu,
    text: "Breaking down bugs and features into small steps, strengthened by my BSc.CSIT studies.",
  },
];

export default function Skills() {
  const [active, setActive] = useState("All");
  const shown =
    active === "All" ? SKILLS : SKILLS.filter((skill) => skill.cat === active);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28" id="skills">
      <header className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#63d0c8]">
          What I work with
        </p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Skills &amp; toolkit
        </h2>
        <p className="mt-4 leading-7 text-slate-400">
          Technologies and tools I use to turn ideas into useful digital
          experiences.
        </p>
      </header>

      <div
        className="mb-8 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter skills"
      >
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              active === filter
                ? "border-[#ffbf69] bg-[#ffbf69] text-[#17120a]"
                : "border-white/10 bg-white/[0.025] text-slate-400 hover:border-white/25 hover:text-white"
            }`}
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map(({ name, level, icon: Icon, text }) => (
          <li
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#121a2e] to-[#0f1729] p-5 transition hover:-translate-y-0.5 hover:border-[#ffbf69]/30 sm:p-6"
            key={`${active}-${name}`}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#ffbf69]/10 text-xl text-[#ffbf69]">
                <Icon aria-hidden="true" />
              </span>
              <h3 className="flex-1 font-semibold text-slate-100">{name}</h3>
              <span className="text-sm font-semibold tabular-nums text-[#ffbf69]">
                {level}%
              </span>
            </div>
            <p className="mt-4 min-h-12 text-sm leading-6 text-slate-400">
              {text}
            </p>
            <div
              className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
              role="img"
              aria-label={`${name}: ${level}%`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ffbf69] to-[#ff8a5c]"
                style={{ width: `${level}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
