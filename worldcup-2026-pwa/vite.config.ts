import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const appBase = process.env.NODE_ENV === 'production' ? '/worldcup-2026-pwa/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base: appBase,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: '2026 世界杯数据中心',
        short_name: '世界杯2026',
        description: '个人和亲友使用的 2026 世界杯比分、积分、榜单和集锦 PWA。',
        theme_color: '#16b33f',
        background_color: '#f4f5f4',
        display: 'standalone',
        lang: 'zh-CN',
        scope: appBase,
        start_url: appBase,
        icons: [
          {
            src: `${appBase}favicon.svg`,
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
