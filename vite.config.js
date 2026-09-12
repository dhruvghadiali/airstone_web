import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@screenComponent': new URL('./src/components/screen', import.meta.url).pathname,
      '@page': new URL('./src/pages', import.meta.url).pathname,
      '@shadcnComponent': new URL('./src/components/ui', import.meta.url).pathname,
      '@lib': new URL('./src/lib', import.meta.url).pathname,
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
})
