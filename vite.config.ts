import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Configuración del servidor de desarrollo local
  server: {
    port: 3000,
    open: true // Abre el navegador automáticamente al ejecutar npm run dev
  },
  // Configuración de empaquetado para producción (Multi-página)
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        metodologia: resolve(__dirname, 'metodologia.html'),
        recursos: resolve(__dirname, 'recursos.html'),
        app: resolve(__dirname, 'App.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        legal: resolve(__dirname, 'legal.html'),
      },
    },
  },
});