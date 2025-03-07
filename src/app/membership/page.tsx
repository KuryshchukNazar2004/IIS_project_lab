'use client';

import { Box } from '@mui/material';
import MembershipContent from '@/components/MembershipContent';

const Membership: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <MembershipContent />
      </Box>
    </Box>
  );
};

export default Membership;
