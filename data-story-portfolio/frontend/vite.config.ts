import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve as pathResolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Remove the external configuration
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  }
})
function resolve(__dirname: string, arg1: string): string {
  return pathResolve(__dirname, arg1);
}

