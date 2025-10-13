import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: 'unity-asset-fix',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Unity 정적 파일 요청일 경우
          if (req.url?.startsWith('/unity/')) {
            const filePath = path.join(process.cwd(), 'public', req.url);

            if (fs.existsSync(filePath)) {
              const stream = fs.createReadStream(filePath);
              // 파일 타입 자동 감지
              if (req.url.endsWith('.json')) {
                res.setHeader('Content-Type', 'application/json');
              } else if (req.url.endsWith('.unityweb')) {
                res.setHeader('Content-Type', 'application/octet-stream');
              } else if (req.url.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript');
              } else if (req.url.endsWith('.wasm')) {
                res.setHeader('Content-Type', 'application/wasm');
              }
              stream.pipe(res);
              return;
            }
          }
          next();
        });
      },
    },
  ],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
});
