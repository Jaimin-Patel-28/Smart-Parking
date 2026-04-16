import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Avoid noisy Vercel warnings for known large third-party bundles.
    chunkSizeWarningLimit: 950,
  },
  server: {
    port: 5173,
    strictPort: false,
  },
});
