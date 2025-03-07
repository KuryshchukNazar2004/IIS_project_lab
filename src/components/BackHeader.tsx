import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

interface BackHeaderProps {
  title: string;
}

const BackHeader: React.FC<BackHeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '16px 24px',
        borderRadius: 2,
        borderBottom: '1px solid #E0E0E0',
      }}
    >
      <IconButton
        onClick={() => router.back()}
        sx={{
          marginRight: 2,
          backgroundColor: '#F2F4F7',
          '&:hover': {
            backgroundColor: '#E0E0E0',
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1D1F20' }}>
        {title}
      </Typography>
    </Box>
  );
};

export default BackHeader;
