import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress certain warnings for CI/CD
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      }
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/zerodayone.in/' : '/'
})
