import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
<<<<<<< HEAD
  server: {
    port: 3000, // 포트 번호를 3000으로 고정합니다.
  }
=======
>>>>>>> bc7183e25098eb47dd10dfa8b21cb865074659cb
})
