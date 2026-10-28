import React, { useEffect, useState } from "react";
import "../../style.css";

const projects = [
  {
    title: "To-Do List App",
    role: "Interactive frontend project",
    description:
      "A simple task-list experience for writing down tasks and keeping everyday work organized.",
    tags: ["HTML", "CSS", "JavaScript"],
    repository: "https://github.com/coderslife108-sirjana/To-Do-List-App-",
  },
  {
    title: "Social Media App",
    role: "Interactive frontend project",
    description:
      "A responsive social feed with an interactive post composer, feed search, likes, and comment forms.",
    tags: ["HTML", "CSS", "JavaScript"],
    repository: "https://github.com/coderslife108-sirjana/Social-media-app",
  },
  {
    title: "Frequency Music Player",
    role: "Full-stack MERN application",
    description:
      "A music player with a searchable library, genre filters, playlists, likes, recently played tracks, and playback controls.",
    tags: ["React", "Vite", "Express", "MongoDB"],
    repository: "https://github.com/coderslife108-sirjana/music-player",
  },
  {
    title: "Bazar Management Portal",
    role: "Full-stack MERN application",
    description:
      "A community portal for managing members, notices, and private messages, with role-based access for administrators, notice managers, and members.",
    tags: ["React", "Express", "MongoDB", "Role-based access"],
    repository:
      "https://github.com/coderslife108-sirjana/Bazar-Byabasthapan-Samiti",
  },
  {
    title: "Book Store",
    role: "Full-stack web application",
    description:
      "An online bookstore with a React frontend and a dedicated backend, bringing book discovery and store functionality together.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    repository: "https://github.com/coderslife108-sirjana/book-store",
  },
  {
    title: "Brew & Flour",
    role: "Full-stack café website",
    description:
      "A café website with menu and gallery content, plus backend-powered reservations, contact messages, and newsletter signups.",
    tags: ["React", "Vite", "Node.js", "Express"],
    repository:
      "https://github.com/coderslife108-sirjana/brew-and-flour-full-stack",
  },
  {
    title: "Job Platform Management",
    role: "Full-stack job platform",
    description:
      "A job platform built with a separate React frontend and backend, bringing together application workflows and management tools.",
    tags: ["React", "Redux", "Express", "MongoDB"],
    repository:
      "https://github.com/coderslife108-sirjana/Job-platform-management",
  },
];

const skillGroups = [
  {
    title: "Languages",
    skills: [
      ["HTML", 92],
      ["CSS", 90],
      ["JavaScript", 88],
      ["MongoDB", 72],
    ],
  },
  {
    title: "Frontend & backend",
    skills: [
      ["React", 88],
      ["UI/UX basics", 86],
      ["Express.js", 76],
      ["Node.js", 82],
    ],
  },
  {
    title: "Tools & learning",
    skills: [
      ["Git & GitHub", 78],
      ["Figma", 72],
      ["REST APIs", 74],
      ["Problem solving", 85],
    ],
  },
];

const timeline = [
  {
    period: "2022 — Present",
    title: "BSc.CSIT Student",
    description:
      "Pursuing a degree in Computer Science and Information Technology while building practical projects and strengthening my technical foundation.",
  },
  {
    period: "2023 — 2024",
    title: "Frontend and backend learning",
    description:
      "Started building projects and learning interface design, backend logic, APIs, data flow, and user interactions.",
  },
  {
    period: "2024 — 2025",
    title: "MERN project development",
    description:
      "Built web projects including a movie website, online bookstore, school website, and coffee shop site using MERN stack concepts.",
  },
];

const validators = {
  name: (value) => value.trim().length >= 2 || "Enter your name.",
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ||
    "Enter a valid email address.",
  message: (value) =>
    value.trim().length >= 10 || "Tell me a little more (10+ characters).",
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState({ message: "", success: false });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const links = Array.from(document.querySelectorAll("[data-nav]"));
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    const setCurrentSection = () => {
      const current = sections.reduce(
        (id, section) =>
          section.offsetTop <= window.scrollY + 140 ? section.id : id,
        ""
      );
      setActiveSection(current);
    };

    window.addEventListener("scroll", setCurrentSection, { passive: true });
    setCurrentSection();

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("in-view");
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.4 }
          )
        : null;

    const bars = document.querySelectorAll(".skill-bars i");
    if (observer) {
      bars.forEach((bar) => observer.observe(bar));
    } else {
      bars.forEach((bar) => bar.classList.add("in-view"));
    }

    return () => {
      window.removeEventListener("scroll", setCurrentSection);
      observer?.disconnect();
    };
  }, []);

  const validateField = (field, value) => {
    const result = validators[field](value);
    setErrors((current) => ({
      ...current,
      [field]: result === true ? "" : result,
    }));
    return result === true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus({ message: "", success: false });
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const validationResults = Object.keys(validators).map((field) =>
      validateField(field, String(data[field] ?? ""))
    );
    const valid = validationResults.every(Boolean);

    if (!valid) {
      setFormStatus({
        message: "Please fix the highlighted fields.",
        success: false,
      });
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to send your message.");
      }
      form.reset();
      setErrors({});
      setFormStatus({
        message: "Thanks! Your message has been sent.",
        success: true,
      });
    } catch (error) {
      setFormStatus({
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your message. Please try again.",
        success: false,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="grain" />
      <header className="site-header" id="top">
        <div className="header-inner">
          <a href="#top" className="mark" aria-label="Sirjana, back to top">
            S<span className="mark-dot">.</span>
          </a>
          <nav
            className={`main-nav${menuOpen ? " open" : ""}`}
            aria-label="Main navigation"
          >
            {[
              ["work", "Projects"],
              ["about", "About"],
              ["skills", "Skills"],
              ["experience", "Journey"],
              ["testimonials", "More"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <a
                href={`#${id}`}
                data-nav
                key={id}
                className={`${id === "contact" ? "nav-cta " : ""}${
                  activeSection === id ? "active" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <button
            className={`nav-toggle${menuOpen ? " open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-inner">
            <p className="hero-eyebrow">BSc.CSIT student · Kathmandu, Nepal</p>
            <h1 className="hero-title">
              Sirjana builds
              <br />
              meaningful web
              <br />
              experiences.
            </h1>
            <div className="hero-foot">
              <p className="hero-lede">
                I’m a Computer Science and Information Technology student
                focused on building responsive, user-friendly web applications.
                I enjoy turning ideas into polished websites and full-stack
                systems, and I’m working toward a career building useful
                products with the MERN stack.
              </p>
              <div className="hero-actions">
                <a href="#work" className="btn btn-primary">
                  View my projects
                </a>
                <a href="#contact" className="btn btn-ghost">
                  Let’s connect
                </a>
              </div>
            </div>
          </div>
          <div className="hero-panel">
            <div className="panel-card">
              <PanelRow label="Currently" value="BSc.CSIT student" />
              <PanelRow label="Based in" value="Kathmandu, Nepal" />
              <PanelRow label="Focus" value="MERN stack · UI/UX · Full-stack" />
              <PanelRow
                label="Ambition"
                value="Create thoughtful, useful web applications"
              />
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Key strengths">
          <p>Building</p>
          <ul>
            <li>MERN projects</li>
            <li>Full-stack web apps</li>
            <li>Community platforms</li>
            <li>Book store</li>
            <li>Café experience</li>
          </ul>
        </section>

        <section className="work" id="work">
          <SectionHead
            title="Selected work"
            description="A selection of projects I’ve built. Open a project’s source code to explore its implementation."
          />
          <ol className="project-list">
            {projects.map((project, index) => (
              <li className="project" key={project.title}>
                <div className="project-preview" aria-hidden="true">
                  <span className="project-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="project-preview-label">Featured project</span>
                  <span className="project-preview-mark">S.</span>
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p className="project-role">{project.role}</p>
                  <p className="project-desc">{project.description}</p>
                  <ul className="project-tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-actions">
                  {project.demo && (
                    <a
                      className="project-button project-button-primary"
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live demo <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  <a
                    className="project-button"
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    View source <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about" id="about">
          <div className="about-media">
            <div className="about-frame">
              <span className="about-frame-label">About me</span>
              <img src="/photo.jpeg" alt="Sirjana" className="about-photo" />
            </div>
          </div>
          <div className="about-copy">
            <p className="section-kicker">Background</p>
            <p className="about-lead">
              I’m Sirjana, a student from Kathmandu, Nepal, studying BSc.CSIT.
            </p>
            <p>
              I’m passionate about web development, digital design, and
              building practical solutions that are both functional and
              visually appealing. Through my projects, I’ve developed a strong
              interest in creating user-friendly interfaces and working across
              the full stack.
            </p>
            <p>
              My goal is to keep growing as a developer by building more
              real-world projects and improving both my technical and creative
              skills.
            </p>
            <a href="#contact" className="text-link">
              Let’s work together →
            </a>
          </div>
        </section>

        <section className="background-section">
          <SectionHead
            title="Education & certifications"
            description="My academic background and professional learning."
          />
          <div className="content-cards">
            <article className="info-card">
              <p className="card-kicker">Education</p>
              <h3>BSc.CSIT</h3>
              <p>
                Computer Science and Information Technology · Kathmandu, Nepal
              </p>
              <span>2022 — Present</span>
            </article>
            <article className="info-card">
              <p className="card-kicker">Certifications</p>
              <h3>Add certifications</h3>
              <p>
                No certifications have been provided yet. Add verified
                credentials here when ready.
              </p>
            </article>
          </div>
        </section>

        <section className="skills" id="skills">
          <SectionHead
            title="What I work with"
            description="Technical and problem-solving skills I’m developing through study and projects."
          />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul className="skill-bars">
                  {group.skills.map(([name, level]) => (
                    <li key={name}>
                      <span>{name}</span>
                      <i
                        role="img"
                        aria-label={`${name}: ${level}%`}
                        style={{ "--level": `${level}%` }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="experience" id="experience">
          <SectionHead
            title="Experience & journey"
            description="My academic path and growth in web development."
          />
          <ul className="timeline">
            {timeline.map((item) => (
              <li className="timeline-item" key={item.title}>
                <div className="timeline-year">{item.period}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="content-section" id="testimonials">
          <SectionHead
            title="Testimonials"
            description="Endorsements from people I’ve studied or worked with."
          />
          <div className="empty-state">
            Add a genuine endorsement here, with the speaker’s permission.
          </div>
        </section>

        <section className="content-section" id="writing">
          <SectionHead
            title="Blog & articles"
            description="Notes, tutorials, and ideas about technology and learning."
          />
          <div className="empty-state">
            Published articles will be linked here.
          </div>
        </section>

        <section className="content-section" id="achievements">
          <SectionHead
            title="Achievements"
            description="Awards, honors, and milestones worth celebrating."
          />
          <div className="empty-state">
            Add verified awards and achievements here.
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-inner">
            <p className="section-kicker light">Contact</p>
            <h2 className="contact-title">Have a project worth building?</h2>
            <p className="contact-sub">
              I’m open to opportunities, collaborations, and internship
              experiences related to web development and design.
            </p>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <FormField
                  id="name"
                  label="Name"
                  error={errors.name}
                  onBlur={validateField}
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  error={errors.email}
                  onBlur={validateField}
                />
              </div>
              <div className="field">
                <label htmlFor="message">What are you building?</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={errors.message ? "invalid" : ""}
                  onBlur={(event) =>
                    validateField("message", event.target.value)
                  }
                />
                {errors.message && (
                  <span className="field-error" id="message-error">
                    {errors.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-wide"
                disabled={sending}
              >
                {sending ? "Sending…" : "Send message"}
              </button>
              <p
                className={`form-status${
                  formStatus.success ? " success" : formStatus.message ? " error" : ""
                }`}
                role="status"
                aria-live="polite"
              >
                {formStatus.message}
              </p>
            </form>
            <div className="contact-direct">
              <span className="contact-placeholder">
                Add your email address and LinkedIn profile here.
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Sirjana. Built with the MERN stack.</p>
        <a href="#top" className="back-top">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}

function PanelRow({ label, value }) {
  return (
    <div className="panel-row">
      <span className="panel-label">{label}</span>
      <span className="panel-value">{value}</span>
    </div>
  );
}

function SectionHead({ title, description }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function FormField({ id, label, type = "text", error, onBlur }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        required
        autoComplete={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={error ? "invalid" : ""}
        onBlur={(event) => onBlur(id, event.target.value)}
      />
      {error && (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export default App;
