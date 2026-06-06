import { DEFAULT_SITE_URL } from "./site-routes";

/** Canonical site origin (no trailing slash). Override with VITE_SITE_URL at build time. */
export const SITE_URL = import.meta.env.VITE_SITE_URL ?? DEFAULT_SITE_URL;

export { DEFAULT_SITE_URL, staticRoutes } from "./site-routes";
