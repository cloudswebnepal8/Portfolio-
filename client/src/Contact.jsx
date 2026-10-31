import React, { useState } from "react";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiGithub,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";

const validators = {
  name: (value) => value.trim().length >= 2 || "Enter your name.",
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ||
    "Enter a valid email address.",
  subject: (value) =>
    value.trim().length >= 3 || "Add a short subject (3+ characters).",
  message: (value) =>
    value.trim().length >= 10 || "Tell me a little more (10+ characters).",
};

const contactItems = [
  {
    icon: FiPhone,
    label: "Phone",
    value: "9867154544",
    href: "tel:+9779867154544",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Binayi Triveni 1, Nawalpur",
  },
  {
    icon: FiBriefcase,
    label: "Availability",
    value: "Available for freelance work",
  },
];

function Field({
  id,
  label,
  type = "text",
  error,
  onBlur,
  onChange,
  multiline = false,
}) {
  const sharedProps = {
    id: `contact-${id}`,
    name: id,
    required: true,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `contact-${id}-error` : undefined,
    className: `mt-2 w-full rounded-xl border bg-[#0b1020]/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#63d0c8]/70 focus:ring-2 focus:ring-[#63d0c8]/15 ${
      error ? "border-red-400/60" : "border-white/10"
    }`,
    onBlur: (event) => onBlur(id, event.target.value),
    onChange: (event) => onChange(id, event.target.value),
  };

  return (
    <div>
      <label
        className="text-sm font-medium text-slate-200"
        htmlFor={`contact-${id}`}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          {...sharedProps}
          rows={5}
          placeholder="Share a little about what you have in mind..."
        />
      ) : (
        <input
          {...sharedProps}
          type={type}
          autoComplete={id === "name" ? "name" : id === "email" ? "email" : "off"}
          placeholder={
            id === "name"
              ? "Your name"
              : id === "email"
                ? "you@example.com"
                : "What would you like to discuss?"
          }
        />
      )}
      {error && (
        <span
          className="mt-1.5 block text-xs text-red-300"
          id={`contact-${id}-error`}
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default function Contact() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ message: "", success: false });
  const [sending, setSending] = useState(false);

  const validateField = (field, value) => {
    const result = validators[field](value);
    setErrors((current) => ({
      ...current,
      [field]: result === true ? "" : result,
    }));
    return result === true;
  };

  const clearError = (field, value) => {
    if (errors[field] && validators[field](value) === true) {
      setErrors((current) => ({ ...current, [field]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ message: "", success: false });

    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());
    const data = Object.fromEntries(
      Object.entries(formData).map(([field, value]) => [
        field,
        String(value).trim(),
      ])
    );
    const valid = Object.keys(validators)
      .map((field) => validateField(field, data[field] ?? ""))
      .every(Boolean);

    if (!valid) {
      setStatus({
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
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || "Unable to send your message.");
      }

      form.reset();
      setErrors({});
      setStatus({
        message: "Message sent. I’ll reply as soon as I can.",
        success: true,
      });
    } catch (error) {
      setStatus({
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
    <section className="px-5 py-20 sm:px-8 sm:py-28" id="contact">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#63d0c8]">
            Get in touch
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Have an idea?
            <br />
            <span className="text-[#ffbf69]">Let’s build it.</span>
          </h2>
          <p className="mt-4 leading-7 text-slate-400">
            Have a project, internship, or collaboration in mind? Send me a
            message and I’ll get back to you.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            className="rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#121a2e] to-[#0e1526] p-5 shadow-xl shadow-black/15 sm:p-8"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                error={errors.name}
                onBlur={validateField}
                onChange={clearError}
              />
              <Field
                id="email"
                label="Email"
                type="email"
                error={errors.email}
                onBlur={validateField}
                onChange={clearError}
              />
            </div>
            <div className="mt-5">
              <Field
                id="subject"
                label="Subject"
                error={errors.subject}
                onBlur={validateField}
                onChange={clearError}
              />
            </div>
            <div className="mt-5">
              <Field
                id="message"
                label="Message"
                multiline
                error={errors.message}
                onBlur={validateField}
                onChange={clearError}
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ffbf69] px-6 py-3 font-semibold text-[#17120a] transition hover:bg-[#ffd28c] disabled:cursor-wait disabled:opacity-70"
                disabled={sending}
              >
                {sending ? "Sending…" : "Send message"}
                <FiSend aria-hidden="true" />
              </button>
              <p
                className={`text-sm ${
                  status.success ? "text-emerald-300" : "text-red-300"
                }`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            </div>
          </form>

          <aside className="flex flex-col justify-between rounded-2xl border border-white/[0.09] bg-[radial-gradient(ellipse_at_100%_0%,rgba(99,208,200,0.11),transparent_48%),linear-gradient(145deg,#121a2e,#0e1526)] p-6 sm:p-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-white">
                Let’s start a conversation
              </h3>
              <p className="mt-3 leading-7 text-slate-400">
                I’m always happy to connect with people building thoughtful
                products and useful web experiences.
              </p>

              <ul className="mt-8 list-none space-y-4 p-0">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <li className="flex items-start gap-4" key={label}>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#ffbf69]/10 text-lg text-[#ffbf69]">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <small className="block text-xs text-slate-500">
                        {label}
                      </small>
                      {href ? (
                        <a
                          className="mt-1 block text-sm font-medium text-slate-200 transition hover:text-[#ffbf69]"
                          href={href}
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="mt-1 block text-sm font-medium text-slate-200">
                          {value}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              className="mt-10 inline-flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 font-medium text-slate-200 transition hover:border-[#63d0c8]/40 hover:text-white"
              href="https://github.com/coderslife108-sirjana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub aria-hidden="true" />
              GitHub profile
              <FiArrowUpRight className="text-slate-400" aria-hidden="true" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
