import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import MillionLint from '@million/lint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    MillionLint.vite(), // Integración de Million.js para mejorar el rendimiento
    react(),            // Plugin de React para soporte JSX, transformación de archivos y Fast Refresh
  ],
});