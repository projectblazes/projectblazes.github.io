import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/projectblaze/', // This should match your repository name
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
  }
}) 