import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    {
      name: "preload-hero-image",
      transformIndexHtml(html) {
        const webp = path.resolve("public/optimized/profile-1200.webp");
        const jpeg = path.resolve("public/profile.jpeg");
        const jpg = path.resolve("public/profile.jpg");
        if (fs.existsSync(webp)) {
          return html.replace(
            "<head>",
            `<head>\n    <link rel="preload" as="image" href="/optimized/profile-1200.webp" type="image/webp" fetchpriority="high" />`
          );
        }
        if (fs.existsSync(jpeg)) {
          return html.replace(
            "<head>",
            `<head>\n    <link rel="preload" as="image" href="/profile.jpeg" fetchpriority="high" />`
          );
        }
        if (fs.existsSync(jpg)) {
          return html.replace(
            "<head>",
            `<head>\n    <link rel="preload" as="image" href="/profile.jpg" fetchpriority="high" />`
          );
        }
        return html;
      },
    },
  ],
});
