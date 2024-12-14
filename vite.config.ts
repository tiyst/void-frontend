import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': '/src/styles'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/colors.scss" as *;`
      }
    }
  }
})
