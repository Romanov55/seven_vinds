import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Путь, который будет проксироваться
        target: 'http://185.244.172.108:8081', // Адрес API
        changeOrigin: true, // Меняет заголовки, чтобы избежать CORS-проблем
        secure: false, // Игнорирует HTTPS (если сервер только HTTP)
        rewrite: (path) => path.replace(/^\/api/, ''), // Удаляет `/api` из пути
      },
    },
  },
})
