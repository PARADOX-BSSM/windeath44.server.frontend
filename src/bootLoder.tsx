import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Kernel from '@/services/kernel.tsx';
import '@/Theme.css';
const queryClient = new QueryClient();
createRoot(document.getElementById('display') as HTMLElement).render(
  //커널 스크립트 호출
  <QueryClientProvider client={queryClient}>
    <Kernel />
  </QueryClientProvider>,
);
