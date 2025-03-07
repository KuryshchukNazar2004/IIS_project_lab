import React from 'react';
import {
  Grid,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';

interface EditMemberFormProps {
  member: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditMemberForm: React.FC<EditMemberFormProps> = ({ member, handleChange }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TextField
          label="First Name*"
          name="firstName"
          value={member?.firstName || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Last Name*"
          name="lastName"
          value={member?.lastName || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Company*"
          name="company"
          value={member?.company || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Chair*"
          name="chair"
          value={member?.chair || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Email Address*"
          name="email"
          value={member?.email || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Phone Number*"
          name="phone"
          value={member?.phone || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Date Started*"
          name="dateStarted"
          type="date"
          value={member?.dateStarted || ''}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Status*"
          name="status"
          value={member?.status || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Membership Expiration Date*"
          name="expiration"
          type="date"
          value={member?.expiration || ''}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Switch
              checked={member?.duesPaid === 'Yes'}
              onChange={handleChange}
              name="duesPaid"
            />
          }
          label="Dues Paid*"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Dues Paid Amount*"
          name="duesPaidAmount"
          value={member?.duesPaidAmount || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Dues Paid Date*"
          name="duesPaidDate"
          type="date"
          value={member?.duesPaidDate || ''}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default EditMemberForm;
