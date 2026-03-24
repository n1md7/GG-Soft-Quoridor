/// <reference types="vitest" />
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { browserslistToTargets } from 'lightningcss';
import { cwd, env } from 'node:process';

export default defineConfig(({ mode }) => {
  console.info(`Running in "${mode}" mode`);
  console.info(`Release version: ${env.VITE_RELEASE_VERSION}`);

  return {
    publicDir: 'public',
    envPrefix: 'VITE_',
    outDir: 'dist',
    envDir: cwd(),
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        // Convert modern CSS syntax (for example media range queries)
        // to syntax supported by older Safari/iPad browsers.
        targets: browserslistToTargets(['>= 0.5%', 'last 2 versions', 'not dead', 'safari >= 13', 'ios_saf >= 13']),
      },
    },
    server: {
      port: 4096,
      host: '0.0.0.0',
      open: '#debug',
    },
    resolve: {
      alias: {
        '@styles': cwd() + '/styles',
        '@assets': cwd() + '/assets',
        '@public': cwd() + '/public',
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
    plugins: [
      react(),
      tailwindcss(),
      glsl({
        watch: true,
      }),
    ],
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
