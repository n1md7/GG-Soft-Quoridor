/// <reference types="vitest" />
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import { cwd } from 'node:process';

export default defineConfig(({ mode }) => {
  console.info(`Running in "${mode}" mode`);

  return {
    publicDir: 'public',
    envPrefix: 'VITE_',
    outDir: 'dist',
    envDir: cwd(),
    server: {
      port: 4096,
      host: '0.0.0.0',
      open: '#debug',
    },
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    resolve: {
      alias: {
        '@styles': cwd() + '/styles',
        '@assets': cwd() + '/assets',
        '@tests': cwd() + '/tests',
        '@src': cwd() + '/src',
      },
    },
    base: './',
    build: {
      chunkSizeWarningLimit: 700,
      reportCompressedSize: true,
      sourcemap: true,
      assetsDir: '.',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: 'index.html',
        },
      },
    },
    plugins: [react(), glsl()],
    test: {
      clearMocks: true,
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      alias: {
        '@styles': cwd() + '/src/styles',
        '@assets': cwd() + '/assets',
        '@tests': cwd() + '/tests',
        '@src': cwd() + '/src',
      },
      coverage: {
        all: true,
        provider: 'v8',
        reporter: ['cobertura', 'text', 'html'],
        exclude: ['*.cjs', '*.config.*', 'dist/**', 'src/**.d.ts', 'tests'],
      },
    },
  };
});
