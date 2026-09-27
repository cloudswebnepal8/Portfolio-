/* =========================================================
   Footer year
   ========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================================================
   Mobile nav toggle
   ========================================================= */
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile nav after clicking a link
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   Active nav link on scroll
   ========================================================= */
const navLinks = document.querySelectorAll("[data-nav]");
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = () => {
  const scrollPos = window.scrollY + 140;
  let currentId = null;

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", targetId === currentId);
  });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

/* =========================================================
   Reveal skill bars when scrolled into view
   ========================================================= */
const skillBars = document.querySelectorAll(".skill-bars i");

if ("IntersectionObserver" in window) {
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((bar) => barObserver.observe(bar));
} else {
  // Fallback: reveal immediately if IntersectionObserver isn't supported
  skillBars.forEach((bar) => bar.classList.add("in-view"));
}

/* =========================================================
   Contact form validation (client-side only demo)
   ========================================================= */
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const validators = {
  name: (value) => value.trim().length >= 2 || "Enter your name.",
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Enter a valid email address.",
  message: (value) => value.trim().length >= 10 || "Tell me a little more (10+ characters).",
};

const showFieldError = (field, message) => {
  const input = form.elements[field];
  const errorEl = form.querySelector(`[data-error-for="${field}"]`);
  if (message) {
    input.classList.add("invalid");
    errorEl.textContent = message;
  } else {
    input.classList.remove("invalid");
    errorEl.textContent = "";
  }
};

Object.keys(validators).forEach((field) => {
  form.elements[field].addEventListener("blur", () => {
    const result = validators[field](form.elements[field].value);
    showFieldError(field, result === true ? "" : result);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  Object.keys(validators).forEach((field) => {
    const result = validators[field](form.elements[field].value);
    showFieldError(field, result === true ? "" : result);
    if (result !== true) isValid = false;
  });

  if (!isValid) {
    formStatus.textContent = "Please fix the highlighted fields.";
    formStatus.classList.remove("success");
    return;
  }

  // No backend is wired up in this template — replace this block with a
  // fetch() call to your form endpoint (Formspree, your own API, etc.)
  formStatus.textContent = "Thanks! Your message has been noted — wire this form up to an endpoint to actually send it.";
  formStatus.classList.add("success");
  form.reset();
});
