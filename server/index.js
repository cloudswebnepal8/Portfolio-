import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ContactMessage from "./models/ContactMessage.js";

const app = express();
const port = Number(process.env.PORT) || 5000;
const rootDir = path.dirname(fileURLToPath(import.meta.url));

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", database: mongoose.connection.readyState === 1 });
});

app.post("/api/contact", async (request, response, next) => {
  const { name, email, message } = request.body ?? {};
  const normalizedName = typeof name === "string" ? name.trim() : "";
  const normalizedEmail = typeof email === "string" ? email.trim() : "";
  const normalizedMessage = typeof message === "string" ? message.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    normalizedName.length < 2 ||
    normalizedName.length > 100 ||
    !emailPattern.test(normalizedEmail) ||
    normalizedEmail.length > 254 ||
    normalizedMessage.length < 10 ||
    normalizedMessage.length > 5000
  ) {
    return response.status(400).json({
      message: "Enter a valid name, email address, and message.",
    });
  }

  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({
      message: "The message service is temporarily unavailable. Please try again later.",
    });
  }

  try {
    await ContactMessage.create({
      name: normalizedName,
      email: normalizedEmail,
      message: normalizedMessage,
    });
    return response.status(201).json({ message: "Message received." });
  } catch (error) {
    return next(error);
  }
});

app.use("/api", (_request, response) => {
  response.status(404).json({ message: "API route not found." });
});

if (process.env.NODE_ENV === "production") {
  const clientDist = path.resolve(rootDir, "../client/dist");
  app.use(express.static(clientDist));
  app.use((_request, response) => {
    response.sendFile(path.join(clientDist, "index.html"));
  });
}

app.use((error, _request, response, _next) => {
  console.error("Request failed:", error);
  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({ message: "Request body must be valid JSON." });
  }
  return response.status(500).json({ message: "An unexpected server error occurred." });
});

async function start() {
  const mongoUri = process.env.MONGODB_URI;
  app.listen(port, () => {
    console.log(`Portfolio API listening on http://localhost:${port}`);
  });

  if (!mongoUri) {
    console.warn(
      "MONGODB_URI is not set. The portfolio will run, but contact submissions are unavailable."
    );
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Could not connect to MongoDB; contact submissions are unavailable:", error);
  }
}

start().catch((error) => {
  console.error("Failed to start portfolio API:", error);
  process.exitCode = 1;
});
