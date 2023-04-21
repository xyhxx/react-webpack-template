import '@styles/index.css';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {StrictMode} from 'react';
import {reportWebVitals} from '@utils';
import routes from '@routes';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  </StrictMode>,
);

process.env.NODE_ENV === 'development' && reportWebVitals();
