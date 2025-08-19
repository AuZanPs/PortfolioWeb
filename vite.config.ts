import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React ecosystem
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          
          // Three.js core
          if (id.includes('three') && !id.includes('@react-three')) {
            return 'three-core';
          }
          
          // React Three Fiber
          if (id.includes('@react-three/fiber')) {
            return 'r3f';
          }
          
          // React Three Drei (split by functionality)
          if (id.includes('@react-three/drei')) {
            if (id.includes('shapes') || id.includes('Sphere') || id.includes('Box') || id.includes('Octahedron')) {
              return 'drei-shapes';
            }
            if (id.includes('materials') || id.includes('MeshDistortMaterial')) {
              return 'drei-materials';
            }
            return 'drei-utils';
          }
          
          // UI components
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Email service
          if (id.includes('@emailjs/browser')) {
            return 'email';
          }
          
          // Performance utilities
          if (id.includes('src/utils/performance')) {
            return 'performance';
          }
          
          // Node modules (other)
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increased to reduce warnings while maintaining performance
    minify: 'terser',
    target: 'es2020',
    sourcemap: false, // Disable sourcemaps for production
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})
