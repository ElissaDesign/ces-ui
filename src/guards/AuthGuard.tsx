// src/guards/AuthGuard.tsx
import { Navigate, useLocation } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('token');

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
