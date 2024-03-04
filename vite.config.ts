import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const _dirname = dirname(fileURLToPath(import.meta.url));

const resolveRelativePath = (relativePath: string) =>
  resolve(_dirname, relativePath);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolveRelativePath("src"),
      "@/features": resolveRelativePath("src/features"),
    },
  },
});
