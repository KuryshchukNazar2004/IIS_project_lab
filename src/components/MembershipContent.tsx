'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchMembersApi, createMemberApi } from '@/api/members';
import AddMemberModal from './AddMemberModal';
import { useRouter } from 'next/navigation';

const MembershipContent: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]); 
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleAddMember = async (member: any) => {
    try {
      await createMemberApi(member);
      fetchMembers();
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMembersApi();
      setMembers(data);
      setFilteredMembers(data); 
    } catch (err: any) {
      setError(err.message || 'Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMember = (id: string) => {
    router.push(`/members/${id}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = members.filter(
      (member) =>
        member.firstName.toLowerCase().includes(lowercasedQuery) ||
        member.lastName.toLowerCase().includes(lowercasedQuery) ||
        member.email.toLowerCase().includes(lowercasedQuery) ||
        member.phone.toLowerCase().includes(lowercasedQuery) ||
        member.company.toLowerCase().includes(lowercasedQuery) ||
        member.chair.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredMembers(filtered);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            color: '#2C3E50',
          }}
        >
          Membership
          <IconButton
            onClick={fetchMembers}
            sx={{
              ml: 1,
              color: '#0D2EED',
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Typography>
        <TextField
          placeholder="Search"
          size="small"
          variant="outlined"
          value={searchQuery} 
          onChange={(e) => handleSearch(e.target.value)}
          sx={{
            width: 300,
            backgroundColor: '#F9F9F9',
            borderRadius: 20,
            '& .MuiOutlinedInput-root': {
              borderRadius: 20,
              paddingLeft: '12px',
            },
            '& input': {
              padding: '6px 8px',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: 20,
            padding: '6px 16px',
            backgroundColor: '#0D2EED',
            '&:hover': {
              backgroundColor: '#002ECC',
            },
          }}
        >
          + Add New Member
        </Button>
        <AddMemberModal
          open={open}
          onClose={() => setOpen(false)}
          onAddMember={handleAddMember}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ padding: 4 }}>
            {error}
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: '#f7f9fc',
                  '& th': {
                    color: '#5e6c84',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    padding: '10px',
                  },
                }}
              >
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Phone No.</TableCell>
                <TableCell>Chair</TableCell>
                <TableCell>Date Started</TableCell>
                <TableCell>Dues Paid</TableCell>
                <TableCell>Expiration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f4f8fb',
                    },
                    '& td': {
                      fontSize: '14px',
                      color: '#4a4a4a',
                      padding: '12px',
                    },
                  }}
                >
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.chair}</TableCell>
                  <TableCell>{row.dateStarted}</TableCell>
                  <TableCell>{row.duesPaid}</TableCell>
                  <TableCell>{row.expiration}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleViewMember(row.id)}
                      sx={{
                        color: '#007BFF',
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default MembershipContent;
