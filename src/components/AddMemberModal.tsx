import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  Grid,
  Switch,
  FormControlLabel,
  MenuItem,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
  onAddMember: (member: any) => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  open,
  onClose,
  onAddMember,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    chair: '',
    dateStarted: '',
    status: 'Active',
    duesPaid: 'No',
    expiration: '',
    duesPaidAmount: '',
    duesPaidDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 'Yes' : 'No') : value,
    });
  };

  const handleSubmit = () => {
    onAddMember(formData);
    setFormData({
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      chair: '',
      dateStarted: '',
      status: 'Active',
      duesPaid: 'No',
      expiration: '',
      duesPaidAmount: '',
      duesPaidDate: '',
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        '& .MuiPaper-root': {
          width: '702px',
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        Create New Member
        <IconButton onClick={onClose} sx={{ color: '#555' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: 3, marginTop: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name*"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name*"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Company*"
              name="company"
              value={formData.company}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Chair*"
              name="chair"
              value={formData.chair}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email Address*"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone Number*"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Status*"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              size="small"
              select
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date Started*"
              name="dateStarted"
              type="date"
              value={formData.dateStarted}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Membership Expiration Date*"
              name="expiration"
              type="date"
              value={formData.expiration}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.duesPaid === 'Yes'}
                  onChange={handleChange}
                  name="duesPaid"
                />
              }
              label="Dues Paid*"
              sx={{ marginLeft: 0 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Dues Paid Amount*"
              name="duesPaidAmount"
              value={formData.duesPaidAmount}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Dues Paid Date*"
              name="duesPaidDate"
              type="date"
              value={formData.duesPaidDate}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'end',
          padding: '16px 24px',
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            backgroundColor: '#F3F6F9',
            color: '#0D2EED',
            fontWeight: 'bold',
            borderRadius: '24px',
            padding: '8px 24px',
            '&:hover': {
              backgroundColor: '#E0E0E0',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            textTransform: 'none',
            backgroundColor: '#0D2EED',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '24px',
            padding: '8px 24px',
            marginLeft: '16px',
            '&:hover': {
              backgroundColor: '#002ECC',
            },
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberModal;
