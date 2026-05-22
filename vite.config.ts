import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      input: {
        // Actualizamos las rutas apuntando a src/pages/
        main: resolve(__dirname, 'index.html'), // Apunta a la raíz
        nosotros: resolve(__dirname, 'src/pages/nosotros.html'),
        servicios: resolve(__dirname, 'src/pages/servicios.html'),
        metodologia: resolve(__dirname, 'src/pages/metodologia.html'),
        recursos: resolve(__dirname, 'src/pages/recursos.html'),
        app: resolve(__dirname, 'src/pages/App.html'),
        contacto: resolve(__dirname, 'src/pages/contacto.html'),
        legal: resolve(__dirname, 'src/pages/legal.html'),
      },
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name ?? '')) return 'assets/css/[name]-[hash].[ext]';
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name ?? '')) return 'assets/img/[name]-[hash].[ext]';
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@pages': resolve(__dirname, './src/pages'), // Nuevo alias por si lo necesitas
      '@scripts': resolve(__dirname, './src/scripts'),
      '@styles': resolve(__dirname, './src/styles'),
    },
  },
});