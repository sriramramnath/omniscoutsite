import { copyFileSync, existsSync, writeFileSync } from "fs";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { buildRobotsTxt, buildSitemapXml } from "./src/lib/sitemap";
import { DEFAULT_SITE_URL } from "./src/config/site-routes";

const port = Number(process.env.PORT ?? "5173");
const basePath = process.env.BASE_PATH ?? "/";
const outDir = path.resolve(import.meta.dirname, "dist");
const siteUrl = process.env.VITE_SITE_URL ?? DEFAULT_SITE_URL;

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

function generateSitemapAndRobots(): Plugin {
  return {
    name: "generate-sitemap-and-robots",
    closeBundle() {
      writeFileSync(path.join(outDir, "sitemap.xml"), buildSitemapXml(siteUrl));
      writeFileSync(path.join(outDir, "robots.txt"), buildRobotsTxt(siteUrl));
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss(), vercelSpaFallback(), generateSitemapAndRobots()],
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
