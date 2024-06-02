import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    manifest: {
      theme_color: '#0097d5',
      short_name: 'Battery Calculator App',
      lang: 'en-GB',
      orientation: 'portrait',
    }
  })],
})
