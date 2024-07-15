import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    assetsDir: "",
  },
  rollupOptions: {
    input: "src/main.js",
  },
  // base: "src/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
