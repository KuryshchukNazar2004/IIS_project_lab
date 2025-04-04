'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import {
  fetchMembersApi,
  updateMemberApi,
  deleteMemberApi,
} from '@/api/members';
import BackHeader from '@/components/BackHeader';
import MemberTabs from '@/components/MemberTabs';

const MemberDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id;
  const [originalMember, setOriginalMember] = useState<any>(null);
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModified, setIsModified] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); 
  const router = useRouter();

  const fetchMemberDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMembersApi();
      const foundMember = data.find((m: any) => m.id === id);
      setOriginalMember(foundMember);
      setMember(foundMember);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch member details');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateMemberApi(id as string, member);
      setSnackbar({
        open: true,
        message: 'Member information updated successfully!',
        severity: 'success',
      });
      setOriginalMember(member);
      setIsModified(false);
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: 'Failed to update member.',
        severity: 'error',
      });
    }
  };

  const handleCancel = () => {
    setMember(originalMember);
    setIsModified(false);
  };

  const handleDelete = async () => {
    try {
      await deleteMemberApi(id as string);
      setSnackbar({
        open: true,
        message: 'Member deleted successfully!',
        severity: 'success',
      });
      router.push('/membership');
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: 'Failed to delete member.',
        severity: 'error',
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const updatedMember = {
      ...member,
      [name]: type === 'checkbox' ? (checked ? 'Yes' : 'No') : value,
    };
    setMember(updatedMember);
    setIsModified(
      JSON.stringify(updatedMember) !== JSON.stringify(originalMember)
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (id) fetchMemberDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            flex: 1,
            padding: 3,
            backgroundColor: '#f7f9fc',
            minHeight: '100vh',
          }}
        >
          <BackHeader
            title={`${member?.firstName || ''} ${member?.lastName || ''}`}
          />
          <MemberTabs
            member={member}
            handleChange={handleChange}
            handleDelete={handleDelete}
            setDeleteDialogOpen={setDeleteDialogOpen}
            isModified={isModified}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography textAlign="center">
            Are you sure you want to delete this member?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              textTransform: 'none',
              backgroundColor: '#E0E0E0',
              color: '#555',
              '&:hover': { backgroundColor: '#D0D0D0' },
            }}
          >
            shos tam
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            sx={{
              textTransform: 'none',
              backgroundColor: '#D32F2F',
              color: '#fff',
              '&:hover': { backgroundColor: '#B71C1C' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MemberDetails;
