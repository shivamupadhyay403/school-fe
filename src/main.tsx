import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { queryClient } from './query-client';
export const VITE_APP_TYPE: string = import.meta.env.VITE_APP_TYPE ?? import.meta.env.MODE;

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element "#root" not found');
}

const app = (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

createRoot(rootElement).render(import.meta.env.DEV ? <StrictMode>{app}</StrictMode> : app);
