import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: {
      origin: 'http://yuuki08noah.com', // 허용할 도메인
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
      allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
      credentials: true, // 쿠키를 포함할지 여부
    },
    allowedHosts: [
      "yuuki08noah.com"
    ],
    port: 3000,
    host: '0.0.0.0'
   },
})
