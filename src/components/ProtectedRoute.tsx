'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/'); 
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized) return null; 

  if (!isAuthenticated) return null; 

  return <>{children}</>;
};

export default ProtectedRoute;
