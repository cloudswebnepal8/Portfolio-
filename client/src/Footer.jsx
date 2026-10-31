import React from "react";
import {
  FaGithub,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";

/* ---------- EDIT YOUR LINKS HERE ---------- */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#work" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "GitHub", icon: FaGithub, color: "#9aa0ac", href: "https://github.com/coderslife108-sirjana" },
  { label: "Facebook", icon: FaFacebook, color: "#1877f2", href: "https://facebook.com/your-profile" },
  { label: "LinkedIn", icon: FaLinkedin, color: "#0a66c2", href: "https://linkedin.com/in/your-profile" },
  { label: "TikTok", icon: FaTiktok, color: "#ffffff", href: "https://tiktok.com/@your-profile" },
  { label: "Instagram", icon: FaInstagram, color: "#e1306c", href: "https://instagram.com/your-profile" },
];
/* ------------------------------------------ */

const focusRing =
  "rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function Footer() {
  return (
    <footer className="border-t border-[#1c2540] bg-ink px-6 pb-8 pt-12 font-body text-[#e8ecf6]">
      <div className="mx-auto grid max-w-[1160px] grid-cols-1 items-center justify-items-center gap-6 text-center md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch md:text-left">
        {/* brand */}
        <div>
          <a
            href="#top"
            aria-label="Sirjana, back to top"
            className={`inline-block bg-linear-to-r from-[#ffbf69] via-[#ff7a7a] to-[#a78bfa] bg-clip-text font-display text-[1.6rem] font-bold text-transparent no-underline transition duration-200 hover:-translate-y-0.5 hover:brightness-125 ${focusRing}`}
          >
            Sirjana
          </a>
          <p className="m-0 mt-1 text-sm text-muted">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* links */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap justify-center gap-x-6 gap-y-1.5"
        >
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`relative py-1 text-[0.95rem] text-[#e8ecf6] no-underline transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:text-accent hover:after:scale-x-100 ${focusRing}`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* socials */}
        <ul
          aria-label="Social profiles"
          className="m-0 flex list-none justify-center gap-[1.1rem] p-0 md:justify-end"
        >
          {SOCIALS.map(({ label, icon: Icon, color, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                style={{ color }}
                className={`grid place-items-center text-[1.55rem] transition duration-200 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-lg ${focusRing}`}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* credit */}
      <p className="m-0 mt-8 text-center text-sm text-muted">
        Crafted with{" "}
        <FaHeart
          aria-label="love"
          className="mx-0.5 inline align-[-0.1em] text-[#ff4d6d] motion-safe:animate-beat"
        />{" "}
        by{" "}
        <a
          href="https://github.com/coderslife108-sirjana"
          target="_blank"
          rel="noreferrer"
          className={`text-muted no-underline transition-colors duration-200 hover:text-accent hover:underline hover:underline-offset-[3px] ${focusRing}`}
        >
          Sirjana
        </a>
      </p>
    </footer>
  );
}