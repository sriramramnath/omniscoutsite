import { copyFileSync, existsSync } from "fs";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const port = Number(process.env.PORT ?? "5173");
const basePath = process.env.BASE_PATH ?? "/";
const outDir = path.resolve(import.meta.dirname, "dist");

/** Vercel serves 404.html for unknown paths; copy index.html so the SPA can render NotFound. */
function vercelSpaFallback(): Plugin {
  return {
    name: "vercel-spa-fallback",
    closeBundle() {
      const indexHtml = path.join(outDir, "index.html");
      if (!existsSync(indexHtml)) return;
      copyFileSync(indexHtml, path.join(outDir, "404.html"));
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss(), vercelSpaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir,
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: false,
    host: true,
  },
  preview: {
    port,
    host: true,
  },
});
