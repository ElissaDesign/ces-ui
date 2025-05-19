import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';

import App from './app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { routesSection } from './routes/sections';
import { ErrorBoundary } from './routes/components';
import  QueryProvider  from './providers/query-provider';


// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Outlet />
      </App>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
     <QueryProvider>
    <RouterProvider router={router} />
     </QueryProvider>
  </StrictMode>
);
