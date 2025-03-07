'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = (): void => {
    logout(); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '64px',
        backgroundColor: '#fff',
        padding: '0 24px',
        borderBottom: '1px solid #E6EAF0',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Button
        variant="text"
        onClick={handleLogout}
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          color: '#0D2EED',
          '&:hover': {
            backgroundColor: '#f4f5f7',
          },
        }}
      >
        Log Out
      </Button>
    </Box>
  );
};

export default Header;
