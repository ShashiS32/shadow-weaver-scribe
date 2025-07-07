// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  // when deploying to GitHub Pages under /shadow-weaver-scribe/
  base: process.env.NODE_ENV === "production"
    ? "/shadow-weaver-scribe/"
    : "/",

  resolve: {
    alias: {
      // now @/… points to src/
      "@": resolve(__dirname, "src"),
    },
  },

  plugins: [
    react(),
  ],
});
