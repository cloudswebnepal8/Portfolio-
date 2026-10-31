import React, { useState } from "react";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiChevronUp,
  FiGithub,
} from "react-icons/fi";

const PROJECTS = [
  {
    title: "Brew & Flour",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85",
    description:
      "A café website with menu and gallery content, plus backend-powered reservations, contact messages, and newsletter signups.",
    tags: ["React", "Vite", "Node.js", "Express"],
    demo: "https://brew-and-flour-full-stack.vercel.app/",
    repository: "",
  },
  {
    title: "Online Bookstore",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=900&q=85",
    description:
      "An online bookstore with a React frontend and a dedicated backend, bringing book discovery and store functionality together.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    demo: "https://book-store-six-kappa-89.vercel.app/",
    repository: "https://github.com/coderslife108-sirjana/book-store",
  },
  {
    title: "ABC Academy",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=85",
    description:
      "A website concept for ABC Academy, presenting the academy and its learning experience in a clear, accessible format.",
    tags: ["Education", "Web design", "Responsive"],
    demo: "https://abc-academy-rho.vercel.app/",
    repository: "https://github.com/coderslife108-sirjana/abc-academy",
  },
  {
    title: "Job Platform Management",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=85",
    description:
      "A job platform built with a separate React frontend and backend, bringing together application workflows and management tools.",
    tags: ["React", "Redux", "Express", "MongoDB"],
    demo: "https://job-platform-management.vercel.app/",
    repository:
      "https://github.com/coderslife108-sirjana/Job-platform-management",
  },
  {
    title: "Music Player",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85",
    description:
      "A music player with a searchable library, genre filters, playlists, likes, recently played tracks, and playback controls.",
    tags: ["React", "Vite", "Express", "MongoDB"],
    demo: "https://music-player-udlc-2s6fvakds-coders-sirjana.vercel.app/",
    repository: "https://github.com/coderslife108-sirjana/music-player",
  },
  {
    title: "Gym Website",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85",
    description:
      "A responsive fitness website presenting a gym’s brand, services, and training experience.",
    tags: ["Fitness", "Web design", "Responsive"],
    demo: "https://gym-alpha-pink-16.vercel.app/",
    repository: "",
  },
];

const FIRST_BATCH = 3;

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? PROJECTS : PROJECTS.slice(0, FIRST_BATCH);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28" id="work">
      <header className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#63d0c8]">
            Selected work
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Projects I’m proud of
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-slate-400 sm:text-base">
          A selection of projects I’ve designed and built, from responsive
          experiences to full-stack applications.
        </p>
      </header>

      <ul className="grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((project, index) => (
          <li
            className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#121a2e] to-[#0e1526] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-[#ffbf69]/40 hover:shadow-2xl hover:shadow-black/25"
            key={project.title}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#111a2d]">
              <img
                className="size-full object-cover transition duration-700 group-hover:scale-105"
                src={project.image}
                alt={`${project.title} project preview`}
                loading="lazy"
                decoding="async"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1020]/80 via-transparent to-[#0b1020]/10"
              />
              <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-[#0b1020]/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                Selected work
              </span>
              <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/20 bg-[#0b1020]/55 text-sm font-semibold text-white/90 backdrop-blur-md">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="font-display text-xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                {project.description}
              </p>

              <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
                {project.tags.map((tag) => (
                  <li
                    className="rounded-full border border-[#63d0c8]/15 bg-[#63d0c8]/[0.07] px-3 py-1 text-xs font-medium text-[#a2e7e2]"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-3 border-t border-white/[0.07] pt-5">
                {project.demo && (
                  <a
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[#ffbf69] px-3 py-2 text-sm font-semibold text-[#17120a] transition hover:bg-[#ffd28c]"
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live demo <FiArrowUpRight aria-hidden="true" />
                  </a>
                )}
                {project.repository && (
                  <a
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-[#63d0c8]/50 hover:text-white"
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <FiGithub aria-hidden="true" /> Source
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {PROJECTS.length > FIRST_BATCH && (
        <div className="mt-10 flex justify-center">
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-[#ffbf69]/60 hover:text-[#ffbf69]"
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
          >
            {showAll ? (
              <>
                Show fewer <FiChevronUp aria-hidden="true" />
              </>
            ) : (
              <>
                View all projects <FiChevronDown aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
