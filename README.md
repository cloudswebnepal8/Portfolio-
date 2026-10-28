# Sirjana's MERN portfolio

A responsive personal portfolio built with React, Express, and MongoDB. The
React app presents projects, education, skills, experience, testimonials,
articles, achievements, and contact information. The Express API validates and
saves contact form submissions in MongoDB.

## Requirements

- Node.js 18 or later
- npm
- MongoDB running locally, or a MongoDB connection URI

## Run locally

1. Install dependencies:

   ```sh
   npm install
   ```

2. To enable contact form submissions, copy `.env.example` to `.env` and set
   `MONGODB_URI` to your MongoDB connection string. The example uses a local
   MongoDB instance. Without this setting, the portfolio and API still start,
   but the contact form reports that message storage is unavailable.
3. Start the frontend and API:

   ```sh
   npm run dev
   ```

4. Open the Vite URL printed in the terminal (normally
   `http://localhost:5173`).

The frontend proxies `/api` requests to the Express server at
`http://localhost:5000`. The health check is available at `/api/health`.
Contact submissions are stored in the `contactmessages` collection. Do not
commit your `.env` file.

## Production

```sh
npm run build
npm start
```

Set `NODE_ENV=production` and `MONGODB_URI` in the server environment. Express
serves the built React app and API from the same origin.

## Personalize the portfolio

- Update the intro, education, project descriptions, skills, and experience in
  `client/src/App.jsx`.
- Replace `client/public/photo.jpeg` with your preferred photo.
- Add only real, permission-approved testimonials, published article links,
  verified achievements, and certifications in the matching sections of
  `client/src/App.jsx`.
- Replace the contact section prompt with your real email and LinkedIn URL.
- Project cards in `client/src/App.jsx` link directly to each source
  repository. Add a `demo` URL to a project to show its live-demo button after
  deploying that project.
- The To-Do List and Social Media repositories are currently frontend projects;
  Frequency is the additional full-stack MERN music player.
- Adjust colors, typography, and responsive styles in `style.css`.

The testimonials, articles, and achievements sections intentionally contain
prompts rather than invented personal details. Contact form messages are saved
to MongoDB; add appropriate access controls, retention rules, and spam
protection before using the form publicly.
