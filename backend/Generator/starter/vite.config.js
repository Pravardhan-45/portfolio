import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const customPrintUrlsPlugin = () => ({
  name: 'custom-print-urls',
  configureServer(server) {
    // Override Vite's default URL printing
    server.printUrls = () => {
      const colorUrl = (url) => `\x1b[36m${url}\x1b[0m`;
      const colorLabel = (label) => `\x1b[1m${label}\x1b[0m`;
      const colorArrow = `\x1b[32m➜\x1b[0m`;
      
      const networkUrls = server.resolvedUrls?.network || [];
      const urlToPrint = networkUrls.length > 0 ? networkUrls[0] : 'http://localhost:5173/';
      
      console.log(`  ${colorArrow}  ${colorLabel('Network:')} ${colorUrl(urlToPrint)}`);
      console.log(`  ${colorArrow}  press ${colorLabel('h')} + enter to show help\n`);
    };
  }
});

export default defineConfig({
  base: "./",
  plugins: [react(), customPrintUrlsPlugin()],

  server: {
    host: "0.0.0.0",
    port: 5173,
    open: false,
  },

  preview: {
    port: 4173,
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
});