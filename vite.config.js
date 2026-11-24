import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/three|@react-three/.test(id)) return 'three'
          if (/framer-motion|gsap|lenis/.test(id)) return 'motion'
        },
      },
    },
  },
})
