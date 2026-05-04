/**
 * Build-time image optimization: generates AVIF/WebP variants in public/optimized/
 * Run: npm run optimize:images
 * Safe no-op if source files are missing (e.g. fresh clone without assets).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const outDir = path.join(publicDir, "optimized");
const skillsOut = path.join(outDir, "skills");
const projectsOut = path.join(outDir, "projects");

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn("[optimize-images] sharp not installed; skip.");
    process.exit(0);
  }

  if (!fs.existsSync(publicDir)) {
    console.log("[optimize-images] no public/ folder; skip.");
    process.exit(0);
  }

  ensureDir(skillsOut);
  ensureDir(projectsOut);

  const profileCandidates = ["profile.jpeg", "profile.jpg", "profile.png"].map((f) =>
    path.join(publicDir, f)
  );
  const profileIn = profileCandidates.find((p) => fs.existsSync(p));

  if (profileIn) {
    const base = sharp(profileIn).rotate();
    await base.clone().resize(1200, null, { withoutEnlargement: true, fit: "inside" }).avif({ quality: 55 }).toFile(path.join(outDir, "profile-1200.avif"));
    await base.clone().resize(1200, null, { withoutEnlargement: true, fit: "inside" }).webp({ quality: 78 }).toFile(path.join(outDir, "profile-1200.webp"));
    await base.clone().resize(800, null, { withoutEnlargement: true, fit: "inside" }).webp({ quality: 80 }).toFile(path.join(outDir, "profile-800.webp"));
    console.log("[optimize-images] profile → optimized/profile-*.{avif,webp}");
  } else {
    console.log("[optimize-images] no profile.{jpeg,jpg,png} in public/; skip profile.");
  }

  const skillsDir = path.join(publicDir, "skills");
  if (fs.existsSync(skillsDir)) {
    const files = fs.readdirSync(skillsDir).filter((f) => /\.(png|jpe?g)$/i.test(f));
    for (const file of files) {
      const slug = path.basename(file, path.extname(file));
      const input = path.join(skillsDir, file);
      const img = sharp(input).rotate();
      await img.clone().resize(480, null, { withoutEnlargement: true, fit: "inside" }).avif({ quality: 52 }).toFile(path.join(skillsOut, `${slug}-480.avif`));
      await img.clone().resize(480, null, { withoutEnlargement: true, fit: "inside" }).webp({ quality: 78 }).toFile(path.join(skillsOut, `${slug}-480.webp`));
      await img.clone().resize(720, null, { withoutEnlargement: true, fit: "inside" }).webp({ quality: 80 }).toFile(path.join(skillsOut, `${slug}-720.webp`));
      console.log(`[optimize-images] skills/${file} → optimized/skills/${slug}-*.{avif,webp}`);
    }
    if (files.length === 0) console.log("[optimize-images] public/skills empty; skip skills.");
  } else {
    console.log("[optimize-images] no public/skills/; skip skills.");
  }

  const projectsDir = path.join(publicDir, "projects");
  if (fs.existsSync(projectsDir)) {
    const projFiles = fs.readdirSync(projectsDir).filter((f) => /\.(png|jpe?g)$/i.test(f));
    for (const file of projFiles) {
      const slug = path.basename(file, path.extname(file));
      const input = path.join(projectsDir, file);
      const img = sharp(input).rotate();
      await img.clone().resize(480, null, { withoutEnlargement: true, fit: "inside" }).avif({ quality: 52 }).toFile(path.join(projectsOut, `${slug}-480.avif`));
      await img.clone().resize(480, null, { withoutEnlargement: true, fit: "inside" }).webp({ quality: 78 }).toFile(path.join(projectsOut, `${slug}-480.webp`));
      await img.clone().resize(720, null, { withoutEnlargement: true, fit: "inside" }).webp({ quality: 80 }).toFile(path.join(projectsOut, `${slug}-720.webp`));
      console.log(`[optimize-images] projects/${file} → optimized/projects/${slug}-*.{avif,webp}`);
    }
    if (projFiles.length === 0) console.log("[optimize-images] public/projects empty; skip projects.");
  } else {
    console.log("[optimize-images] no public/projects/; skip projects.");
  }

  console.log("[optimize-images] done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
