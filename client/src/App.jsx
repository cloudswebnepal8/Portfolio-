import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Footer from "./Footer";
import Hero from "./Hero";
import Projects from "./Projects";
import Skills from "./Skills";

const navigation = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["work", "Project"],
  ["experience", "Experience"],
  ["contact", "Contact"],
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(() => {
    const section = window.location.hash.slice(1);
    return !section || section === "home";
  });
  const [activeSection, setActiveSection] = useState(() => {
    const section = window.location.hash.slice(1);
    return navigation.some(([id]) => id === section) ? section : "home";
  });

  useEffect(() => {
    const syncSection = () => {
      const section = window.location.hash.slice(1);
      const selectedSection = navigation.some(([id]) => id === section)
        ? section
        : "home";
      setActiveSection(selectedSection);
      setIsHomePage(selectedSection === "home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const updateActiveSection = () => {
      if (!isHomePage) return;

      const sections = navigation
        .map(([id]) => document.getElementById(id))
        .filter(Boolean);
      const currentSection = sections.reduce(
        (active, section) =>
          section.getBoundingClientRect().top <= 160 ? section.id : active,
        "home"
      );
      setActiveSection(currentSection);
    };

    window.addEventListener("hashchange", syncSection);
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();
    return () => {
      window.removeEventListener("hashchange", syncSection);
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [isHomePage]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b1020] text-[#e8ecf6]">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-lg bg-[#ffbf69] px-4 py-3 text-[#101522] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[42rem] bg-[radial-gradient(ellipse_at_50%_-12%,rgba(99,208,200,0.16),transparent_65%)]"
      />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.08] bg-[#0b1020]/90 shadow-lg shadow-black/10 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#home"
            className="group inline-flex items-center gap-3"
            aria-label="Sirjana, go to home page"
          >
            <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] font-display text-xl font-bold shadow-inner shadow-white/5 transition group-hover:border-[#ffbf69]/60">
              S<span className="text-[#ffbf69]">.</span>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Sirjana
            </span>
          </a>

          <nav
            id="mobile-navigation"
            className={`${
              menuOpen
                ? "absolute inset-x-0 top-full flex flex-col gap-1 border-b border-white/10 bg-[#0b1020] p-4 shadow-2xl md:static md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none"
                : "hidden md:flex md:items-center md:gap-1"
            }`}
            aria-label="Main navigation"
          >
            {navigation.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition lg:px-4 ${
                  activeSection === id
                    ? "bg-white/[0.08] text-white"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            className="grid size-11 place-items-center rounded-xl border border-white/10 text-xl text-slate-200 transition hover:border-[#ffbf69]/50 md:hidden"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div aria-hidden="true" className="h-[76px]" />

      <main id="main-content" className="relative z-10">
        {isHomePage && (
          <>
            <Hero />
            <div
              aria-label="Technologies and project areas"
              className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-y border-white/[0.07] px-5 py-5 text-xs font-medium tracking-wide text-slate-400 sm:gap-x-10 sm:px-8 sm:text-sm"
            >
              <span className="text-[#ffbf69]">BUILDING WITH</span>
              <span>React</span>
              <span>Node.js</span>
              <span>MongoDB</span>
              <span>Express</span>
              <span>Thoughtful UI</span>
            </div>
          </>
        )}
        {(isHomePage || activeSection === "about") && <About />}
        {(isHomePage || activeSection === "skills") && <Skills />}
        {(isHomePage || activeSection === "work") && <Projects />}
        {(isHomePage || activeSection === "experience") && <Experience />}
        {(isHomePage || activeSection === "contact") && <Contact />}
      </main>

      <Footer />
    </div>
  );
}
