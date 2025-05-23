import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { Outlet , Navigate} from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { AuthGuard } from 'src/guards/AuthGuard';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------
export const LandingPage = lazy(() => import('src/pages/landing'));
export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const TagsPage = lazy(() => import('src/pages/tags'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
   {
    index: true,
    element: (
      <Suspense fallback={renderFallback()}>
              <AuthLayout>
                <LandingPage />
                </AuthLayout>

      </Suspense>
    ),
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={renderFallback()}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { index:true, element: <DashboardPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'agencies', element: <ProductsPage /> },
      { path: 'tags', element: <TagsPage /> },
      { path: 'tickets', element: <TagsPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
];
