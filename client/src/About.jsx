import React from "react";
import { FiBookOpen, FiCode, FiMapPin } from "react-icons/fi";

const FACTS = [
  { icon: FiBookOpen, label: "Studying", value: "BSc.CSIT · 2022–Present" },
  { icon: FiMapPin, label: "Based in", value: "Kathmandu, Nepal" },
  { icon: FiCode, label: "Focus", value: "MERN stack and UI/UX" },
];

export default function About() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28" id="about">
      <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#121a2e] via-[#10182a] to-[#0d1424] p-5 shadow-2xl shadow-black/20 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:p-12">
        <figure className="mx-auto w-full max-w-sm">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020] p-2 shadow-xl shadow-black/30">
            <img
              src="/photo.jpeg"
              alt="Sirjana"
              className="aspect-[4/5] w-full rounded-[1.25rem] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="mt-4 text-center font-display text-xl font-semibold text-[#ffbf69]">
            Sirjana
          </figcaption>
        </figure>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#63d0c8]">
            A little about me
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Curious by nature.
            <br />
            <span className="text-[#ffbf69]">Builder by choice.</span>
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-300">
            I’m Sirjana, a student from Kathmandu, Nepal, studying BSc.CSIT. I’m
            passionate about web development, digital design, and building
            practical solutions that are both functional and visually
            thoughtful.
          </p>
          <p className="mt-4 text-base leading-8 text-slate-400">
            Through hands-on projects, I’ve developed a strong interest in
            creating user-friendly interfaces and working across the full
            stack. I’m continuing to grow by building real-world projects and
            strengthening both my technical and creative skills.
          </p>

          <ul className="mt-8 grid list-none gap-3 p-0 sm:grid-cols-3">
            {FACTS.map(({ icon: Icon, label, value }) => (
              <li
                className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"
                key={label}
              >
                <Icon
                  className="mt-0.5 shrink-0 text-lg text-[#ffbf69]"
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <small className="mb-1 block text-xs text-slate-500">
                    {label}
                  </small>
                  <span className="text-sm font-medium leading-5 text-slate-200">
                    {value}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 font-semibold text-[#ffbf69] transition hover:gap-3"
          >
            Let’s work together <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
