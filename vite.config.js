import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    // Konfigurasi untuk menangani client-side routing
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /^\/profil\/.*/, to: '/index.html' },
        { from: /.*/, to: '/index.html' },
      ],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false, 
        timeout: 60000 // 1 menit timeout
      },
      '/register': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        timeout: 60000 // 1 menit timeout
      },
      '/login': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        timeout: 60000 // 1 menit timeout
      },
      '/refresh-token': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/designerdetails': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/profil': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/meet_designers': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/portofolio': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/register': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/login': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/profile-picture': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
})
