import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa'; // Don't forget to import VitePWA

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'My Vite App',
        short_name: 'ViteApp',
        description: 'My awesome Vite app!',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
