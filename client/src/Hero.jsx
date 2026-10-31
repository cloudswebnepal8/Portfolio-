import React from "react";
import {
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiBriefcase,
  FiDownload,
  FiMapPin,
} from "react-icons/fi";
import { SiExpress, SiJavascript, SiMongodb } from "react-icons/si";

const TECH = [
  { icon: FaReact, name: "React", color: "#61dafb" },
  { icon: FaNodeJs, name: "Node.js", color: "#6cc24a" },
  { icon: SiMongodb, name: "MongoDB", color: "#4faa41" },
  { icon: SiExpress, name: "Express", color: "#e8ecf6" },
  { icon: SiJavascript, name: "JavaScript", color: "#f7df1e" },
  { icon: FaHtml5, name: "HTML5", color: "#e34f26" },
  { icon: FaCss3Alt, name: "CSS3", color: "#2965f1" },
  { icon: FaGitAlt, name: "Git", color: "#f05032" },
  { icon: FaFigma, name: "Figma", color: "#a259ff" },
];

export default function Hero() {
  return (
    <section
      className="mx-auto grid min-h-[calc(100svh-76px)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24"
      id="home"
    >
      <div>
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#63d0c8]/20 bg-[#63d0c8]/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#83e2dc] sm:text-sm">
          <span className="size-2 rounded-full bg-[#63d0c8] shadow-[0_0_14px_rgba(99,208,200,0.8)]" />
          BSc.CSIT · Full-stack development
        </p>
        <h1 className="max-w-3xl font-display text-[clamp(3.35rem,8vw,6.6rem)] font-semibold leading-[0.99] tracking-[-0.065em] text-white">
          I build
          <br />
          <span className="bg-gradient-to-r from-[#ffbf69] via-[#f5c27e] to-[#63d0c8] bg-clip-text text-transparent">
            thoughtful digital
          </span>
          <br />
          experiences.
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          I’m Sirjana, a BSc.CSIT student from Kathmandu, Nepal. I turn ideas
          into responsive, user-friendly websites and full-stack applications
          with React, Node.js, and MongoDB.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#ffbf69] px-6 py-3 font-semibold text-[#17120a] shadow-lg shadow-[#ffbf69]/15 transition hover:-translate-y-0.5 hover:bg-[#ffd28c]"
          >
            Explore my work <FiArrowUpRight aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 font-semibold text-slate-100 transition hover:border-[#63d0c8]/50 hover:bg-white/[0.07]"
          >
            Let’s connect <FiArrowDownRight aria-hidden="true" />
          </a>
          <a
            href="/Sirjana_Subedi_CV_FullStack_Developer_.pdf"
            download
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 font-semibold text-slate-100 transition hover:border-[#ffbf69]/50 hover:bg-white/[0.07]"
          >
            Download CV <FiDownload aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
          <span className="inline-flex items-center gap-2">
            <FiMapPin className="text-[#63d0c8]" aria-hidden="true" />
            Kathmandu, Nepal
          </span>
          
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[440px]">
        <div
          aria-hidden="true"
          className="absolute inset-8 rounded-full bg-[#ffbf69]/10 blur-3xl"
        />
        <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.12] to-white/[0.025] p-3 shadow-2xl shadow-black/40">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#111a2d]">
            <img
              className="aspect-[4/4.5] w-full object-cover object-center"
              src="/photo.jpeg"
              alt="Sirjana"
              fetchPriority="high"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl border border-white/10 bg-[#111a2d]/95 px-5 py-4 shadow-xl backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Focus
            </p>
            <p className="mt-1 font-semibold text-white">MERN stack · UI/UX</p>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap justify-center gap-3" aria-label="Technology stack">
          {TECH.map(({ icon: Icon, name, color }) => (
            <span
              key={name}
              title={name}
              className="grid size-11 place-items-center rounded-xl border border-white/[0.09] bg-white/[0.04] text-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <Icon style={{ color }} aria-hidden="true" />
              <span className="sr-only">{name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
