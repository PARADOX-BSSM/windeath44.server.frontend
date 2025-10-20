import { defineConfig } from 'vite';
import tsconfigPath from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

const ReactCompilerConfig = {
  target: '18'
};

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.gif'],
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig]
        ]
      }
    }),
    tsconfigPath()],
});
