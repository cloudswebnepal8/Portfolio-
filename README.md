# Portfolio Template

A self-contained personal portfolio built with plain HTML, CSS, and JavaScript — no build tools, no frameworks, no dependencies. Just open it and go.

## Files

```
portfolio/
├── index.html   → structure & content
├── style.css    → all styling (design tokens at the top)
├── script.js    → nav toggle, scroll effects, form validation
└── README.md    → this file
```

## Run it

**Option A — just open it**
Double-click `index.html`, or drag it into a browser tab.

**Option B — VS Code Live Server (recommended)**
1. Open the folder in VS Code.
2. Install the "Live Server" extension if you don't have it.
3. Right-click `index.html` → "Open with Live Server".
4. It'll auto-reload as you edit.

## Customize it

1. **Your info** — edit the text directly inside `index.html`:
   - Name/title: `.hero-title` and the `<title>` tag
   - Intro panel: `.panel-card` rows (currently, based in, stack, open to)
   - Projects: each `<li class="project">` block — swap in your real projects, links, and tags
   - About text, skills bars, experience timeline, contact email/socials

2. **Your photo** — replace the placeholder `.about-frame` div with an `<img>` tag:
   ```html
   <div class="about-media">
     <img src="your-photo.jpg" alt="Your name" class="about-photo">
   </div>
   ```
   Add matching CSS (border-radius, aspect-ratio, object-fit: cover) next to `.about-frame` in `style.css`.

3. **Colors** — everything is driven by CSS custom properties at the top of `style.css`:
   ```css
   :root {
     --bg: #14171C;       /* page background */
     --accent: #E8A33D;   /* primary accent (buttons, links, index numbers) */
     --teal: #4FA8A0;     /* secondary accent (project tags) */
     --paper: #F3EFE6;    /* contact section background */
     ...
   }
   ```
   Change these and the whole site updates.

4. **Fonts** — headings use "Fraunces" (serif), body text uses "IBM Plex Sans", and small labels use "IBM Plex Mono". Loaded from Google Fonts in the `<head>` of `index.html` — swap the `<link>` tags and the `--font-*` variables in `style.css` to change them.

5. **Contact form** — the form validates on the client side but doesn't send anywhere yet. Open `script.js` and find the comment `// No backend is wired up`. Easiest options:
   - [Formspree](https://formspree.io) — add `action="https://formspree.io/f/yourFormId"` and `method="POST"` to the `<form>` tag in `index.html`, and you can delete the JS submit handler entirely.
   - Your own backend — replace the block with a `fetch()` call to your API.

6. **Sections** — to remove a section (e.g. "Experience"), delete its `<section>` block in `index.html` and its corresponding nav link.

## Notes

- Fully responsive down to small mobile screens.
- Respects `prefers-reduced-motion`.
- No build step, no `node_modules` — just static files.
- Google Fonts are loaded over the network, so an internet connection is needed the first time a browser renders the page (fonts are then cached).
