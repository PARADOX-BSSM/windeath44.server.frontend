import { defineConfig } from 'vite';
import tsconfigPath from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import babelPlugin from 'vite-plugin-babel';

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.gif'],
  plugins: [react(),
    babelPlugin({
      babelConfig:{
        plugins: ['babel-plugin-react-compiler']
      }
    }),
    tsconfigPath()],
});
