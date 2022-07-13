import express from "express";
import { dirname, join } from "path";

import postRoutes from "./routes/posts.routes.js";
import { fileURLToPath } from "url";

const app = express();

// Middlewares
app.use(express.json());
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../client/build/index.html"));
});

// routes
app.use(postRoutes);

export default app;
