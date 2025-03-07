'use client';

import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = ['/', '/register'].includes(pathname);
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          {isAuthPage ? (
            <Box>{children}</Box>
          ) : (
            <ProtectedRoute>
              <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <Sidebar />
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Header />
                  <Box sx={{ flex: 1, padding: 3, backgroundColor: '#f7f9fc' }}>
                    {children}
                  </Box>
                </Box>
              </Box>
            </ProtectedRoute>
          )}
        </body>
      </html>
    </AuthProvider>
  );
}
