import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(async () => {
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;
  
  return {
    base: '/Portfolio/',
    plugins: [react({
      jsxRuntime: 'automatic'
    }), tsconfigPaths()],
    build: {
      rollupOptions: {
        // Any specific build configurations
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    }
  }
})