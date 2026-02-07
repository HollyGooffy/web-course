import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
      alias: {
          '@': resolve(__dirname, './src'),
          '@app': resolve(__dirname, './src/app'),
          '@pages': resolve(__dirname, './src/pages'),
          '@widgets': resolve(__dirname, './src/widgets'),
          '@features': resolve(__dirname, './src/features'),
          '@entities': resolve(__dirname, './src/entities'),
          '@shared': resolve(__dirname, './src/shared'),
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@shared/ui'],
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      }
    },
    server: {
      port: 5173,
        proxy: {
          '/api': {
              target: 'http://localhost:3001',
              changeOrigin: true,
          }
        },
        host: '0.0.0.0',
        strictPort: false,
    }
})
