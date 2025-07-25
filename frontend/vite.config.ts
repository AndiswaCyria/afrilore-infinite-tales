import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/socket.io": {
        target: process.env.VITE_SOCKET_URL || "http://localhost:5000",
        ws: true,
      },
    },
  },
  plugins: [react()],
  base: "/", 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
