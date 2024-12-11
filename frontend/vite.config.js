import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': 'https://trackmyjob-server.vercel.app',
      secure: false,
    },
  },
  plugins: [react()],
  build: {
    outDir: './build',
    emptyOutDir: false,// Specify the output directory
  }
})
