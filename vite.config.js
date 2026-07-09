import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuracion de Vite para el proyecto Farma 30 (React)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
