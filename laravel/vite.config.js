import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'

// Cambia por tu IP real en la red
const NETWORK_IP = 'TU IP';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: '0.0.0.0', // Permite el acceso desde la red
    port: 5173,
    strictPort: true, // Asegura que use este puerto
    hmr: {
      host: NETWORK_IP, // Usar la IP en vez de localhost
      protocol: 'ws', // WebSockets en vez de HTTP/2
    },
    cors: {
      origin: '*', // Permitir todas las conexiones (puedes cambiarlo por una URL específica)
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
