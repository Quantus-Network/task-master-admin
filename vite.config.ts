import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(),tsconfigPaths()],
  server: {
    port: 6060,
    host: true,
  },
  build: {
    sourcemap: mode === "development",
    rollupOptions: {
      output: {
        manualChunks: {
          "react-admin": ["react-admin"],
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
  base: "./",
}));
