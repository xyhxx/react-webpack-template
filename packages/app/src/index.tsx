import '@styles/index.css';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {QueryClientProvider} from '@tanstack/react-query';
import {StrictMode} from 'react';
import {QUERY_CLIENT} from '@utils';
import routes from '@routes';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <QueryClientProvider client={QUERY_CLIENT}>
      <ReactQueryDevtools
        position="right"
        buttonPosition="bottom-right"
        initialIsOpen={false}
      />
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>,
);
