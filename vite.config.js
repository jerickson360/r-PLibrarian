// r-PLibrarian/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  
  // Tell Vite to build in library mode, which is suitable for multiple entry points
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        console: resolve(__dirname, 'console.html'),
      },
    },
  },

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
}));