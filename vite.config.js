import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          framer: ['framer-motion'],
          icons: ['@heroicons/react', 'react-icons', 'lucide-react'],
          utils: ['axios', 'react-scroll', 'react-toastify'],
          timeline: ['react-vertical-timeline-component'],
          typewriter: ['react-simple-typewriter', 'react-typed']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      }
    },
    target: 'es2015',
    sourcemap: false,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['@heroicons/react', 'react-icons']
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  preview: {
    port: 4173,
    host: true
  }
})
