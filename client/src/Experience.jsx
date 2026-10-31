import React from "react";

const TIMELINE = [
  {
    period: "2022 – Present",
    title: "BSc.CSIT Student",
    description:
      "Pursuing a degree in Computer Science and Information Technology while building practical projects and strengthening my technical foundation.",
  },
  {
    period: "2023 – 2024",
    title: "Frontend and backend learning",
    description:
      "Started building projects and learning interface design, backend logic, APIs, data flow, and user interactions.",
  },
  {
    period: "2024 – 2025",
    title: "MERN project development",
    description:
      "Built projects including Brew & Flour, an online bookstore, ABC Academy, Job Platform Management, and a music player using MERN stack concepts.",
  },
];

export default function Experience() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28" id="experience">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#63d0c8]">
            Learning by doing
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            My journey so far
          </h2>
          <p className="mt-4 text-slate-400">
            My academic path and growth in web development.
          </p>
        </header>

        <ol className="relative m-0 list-none space-y-8 border-l border-[#ffbf69]/30 p-0 pl-7 sm:ml-8 sm:space-y-10 sm:pl-10">
          {TIMELINE.map((item) => (
            <li
              className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#121a2e] to-[#0e1526] p-5 sm:p-7"
              key={item.title}
            >
              <span
                className="absolute -left-[2.13rem] top-7 size-3 rounded-full border-2 border-[#0b1020] bg-[#ffbf69] shadow-[0_0_0_4px_rgba(255,191,105,0.12)] sm:-left-[2.63rem]"
                aria-hidden="true"
              />
              <p className="mb-2 text-sm font-semibold text-[#ffbf69]">
                {item.period}
              </p>
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-3xl leading-7 text-slate-400">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
