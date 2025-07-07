import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // ensure asset URLs work on GH Pages under /<repo-name>/
  base: process.env.NODE_ENV === "production"
    ? "/shadow-weaver-scribe>/"
    : "/",
  plugins: [
    react(),
    tsconfigPaths()  // lets you keep using "@/…" paths
  ],
});
