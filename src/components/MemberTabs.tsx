'use client';

import React from 'react';
import { Tabs, Tab, Box, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import GroupWorkOutlinedIcon from '@mui/icons-material/GroupWorkOutlined';

import EditMemberForm from '@/components/EditMemberForm';

interface MemberTabsProps {
  member: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: () => void;
  setDeleteDialogOpen: (value: boolean) => void;
  isModified: boolean;
  handleSave: () => void;
  handleCancel: () => void;
}

const MemberTabs: React.FC<MemberTabsProps> = ({
  member,
  handleChange,
  setDeleteDialogOpen,
  isModified,
  handleSave,
  handleCancel,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: 'General Info', icon: <BadgeOutlinedIcon /> },
    { label: 'Weekly', icon: <BadgeOutlinedIcon /> },
    { label: 'Meet-Up', icon: <EventNoteIcon /> },
    { label: 'Referrals', icon: <GroupWorkOutlinedIcon /> },
    { label: 'Closed Business', icon: <BusinessCenterOutlinedIcon /> },
    { label: 'Visitors', icon: <PeopleAltIcon /> },
    { label: 'Points', icon: <EmojiEventsIcon /> },
  ];

  return (
    <Box>
      <Box
        sx={{
          marginTop: 2,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: '#fff',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ paddingTop: 3 }}>
        {activeTab === 0 && (
          <Box
            sx={{
              backgroundColor: '#fff',
              paddingX: 3,
              borderRadius: 2,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <EditMemberForm member={member} handleChange={handleChange} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 3,
                paddingBottom: 3,
              }}
            >
              <IconButton
                onClick={() => setDeleteDialogOpen(true)}
                sx={{
                  color: 'red',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                }}
              >
                <DeleteIcon />
              </IconButton>
              {isModified && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        )}
        {activeTab === 1 && (
          <Typography variant="body1" textAlign="center">
            Weekly Content Here
          </Typography>
        )}
        {activeTab === 2 && (
          <Typography variant="body1" textAlign="center">
            Meet-Up Content Here
          </Typography>
        )}
        {activeTab === 3 && (
          <Typography variant="body1" textAlign="center">
            Referrals Content Here
          </Typography>
        )}
        {activeTab === 4 && (
          <Typography variant="body1" textAlign="center">
            Closed Business Content Here
          </Typography>
        )}
        {activeTab === 5 && (
          <Typography variant="body1" textAlign="center">
            Visitors Content Here
          </Typography>
        )}
        {activeTab === 6 && (
          <Typography variant="body1" textAlign="center">
            Points Content Here
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MemberTabs;
