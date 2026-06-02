import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 環境変数プレフィックス: VITE_ に加え UPNOTE_ も読む（後方互換・CLAUDE.md R9）
export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'UPNOTE_'],
  base: process.env.VITE_BASE || '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
