import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/shadow-weaver-scribe/" : "/",
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  plugins: [react()],
});
