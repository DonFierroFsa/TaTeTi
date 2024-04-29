import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://donfierrofsa.github.io/TaTeTi/", // npm install --save-dev gh-pages     "deploy": "npm run build && gh-pages -d dist"
});
