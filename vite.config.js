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
      const { default: clientTripsHandler } = await import(
        "./api/clients/[clientId]/trips.js"
      );
      const { default: tripIntentHandler } = await import("./api/trip-intent.js");
      const { default: tripRequestHandler } = await import("./api/trip-request.js");
      const mount = (path, h) =>
        server.middlewares.use(path, (req, res) => {
          Promise.resolve(h(req, res)).catch((err) => {
            res.statusCode = 500;
            res.setHeader("content-type", "application/json");
            res.end(
              JSON.stringify({ error: String((err && err.message) || err) }),
            );
          });
        });
      mount("/api/trip-intent", tripIntentHandler);
      mount("/api/trip-request", tripRequestHandler);
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
      // Dynamic route /api/clients/:clientId/trips — mounted as a catch-all so
      // the full path (with the id) reaches the handler untouched.
      server.middlewares.use((req, res, next) => {
        const path = (req.url || "").split("?")[0];
        if (!/^\/api\/clients\/[^/]+\/trips$/.test(path)) return next();
        Promise.resolve(clientTripsHandler(req, res)).catch((err) => {
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
  // Dev mode only auto-loads .env / .env.local / .env.development, but the real
  // keys live in .env.prod — load it as a fallback so `npm run dev` can reach
  // the CRM. Mode-specific files still win when both define a key.
  const env = {
    ...loadEnv("prod", process.cwd(), ""),
    ...loadEnv(mode, process.cwd(), ""),
  };
  return {
    plugins: [react(), devApi(env)],
  };
});
