/**
 * Paths for build-time optimized images (see scripts/optimize-images.mjs).
 * OptimizedImg tries AVIF → WebP → original on decode error.
 */

export const HERO_PROFILE_OPTIMIZED_BASE = "/optimized/profile-1200";

/** @param {string} publicPath e.g. "/skills/taste_ai.png" */
export function skillOptimizedStem480(publicPath) {
  const m = String(publicPath).match(/\/skills\/([^/]+)\.(png|jpe?g)$/i);
  if (!m) return null;
  return `/optimized/skills/${m[1]}-480`;
}

/** @param {string} publicPath e.g. "/projects/neon_tasteai.png" */
export function projectOptimizedStem480(publicPath) {
  const m = String(publicPath).match(/\/projects\/([^/]+)\.(png|jpe?g)$/i);
  if (!m) return null;
  return `/optimized/projects/${m[1]}-480`;
}
