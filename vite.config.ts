import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    target: "esnext",
    cssCodeSplit: true,
    minify: "esbuild",
    sourcemap: false,
    chunkSizeWarningLimit: 500,
  },

  server: {
    hmr: {
      overlay: true,
    },
  },

  preview: {
    port: 4173,
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router",
      "@reduxjs/toolkit",
      "react-redux",
      "@tanstack/react-query",
    ],
  },
});
