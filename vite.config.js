import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Mounts the /api/quotes serverless function into the Vite dev server so
// `npm run dev` exercises the same handler that runs on Vercel in production.
function devApi(env) {
  return {
    name: "dev-api",
    async configureServer(server) {
      // Make the (non-VITE_ prefixed, server-only) Airtable vars visible to the handler.
      for (const key of [
        "AIRTABLE_TOKEN",
        "AIRTABLE_BASE_ID",
        "AIRTABLE_TABLE",
        "TRKIT_SECRET_KEY",
        "TRKIT_PUBLIC_KEY",
        "TRIPKIT_SECRET_KEY",
        "TRIPKIT_PUBLIC_KEY",
      ]) {
        if (env[key]) process.env[key] = env[key];
      }
      const { default: handler } = await import("./api/quotes.js");
      const { default: trkitRegisterHandler } = await import(
        "./api/trkit-register.js"
      );
      server.middlewares.use("/api/quotes", (req, res) => {
        Promise.resolve(handler(req, res)).catch((err) => {
          res.statusCode = 500;
          res.setHeader("content-type", "application/json");
          res.end(
            JSON.stringify({ error: String((err && err.message) || err) }),
          );
        });
      });
      server.middlewares.use("/api/trkit-register", (req, res) => {
        Promise.resolve(trkitRegisterHandler(req, res)).catch((err) => {
          res.statusCode = 500;
          res.setHeader("content-type", "application/json");
          res.end(
            JSON.stringify({ error: String((err && err.message) || err) }),
          );
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), devApi(env)],
  };
});
