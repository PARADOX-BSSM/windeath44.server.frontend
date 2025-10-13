import { defineConfig } from 'vite';
import tsconfigPath from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.gif'],
  plugins: [react(), tsconfigPath()],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
});
