'use client';

import React, { useState } from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupWorkOutlinedIcon from '@mui/icons-material/GroupWorkOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { useRouter, usePathname } from 'next/navigation';
import logo from '@/assets/image/Logo_Sidebar.svg';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const menuItems = [
    { text: 'Membership', icon: <BadgeOutlinedIcon />, route: '/membership' },
    { text: 'Weekly Meets', icon: <BadgeOutlinedIcon />, route: '/weekly-meets' },
    { text: 'Meet-Ups', icon: <EventNoteIcon />, route: '/meet-ups' },
    { text: 'Referrals', icon: <GroupWorkOutlinedIcon />, route: '/referrals' },
    {
      text: 'Closed Business',
      icon: <BusinessCenterOutlinedIcon />,
      route: '/closed-business',
    },
    { text: 'Visitors', icon: <PeopleAltIcon />, route: '/visitors' },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          width: isCollapsed ? 80 : 250,
          backgroundColor: 'rgba(39, 58, 138, 1)',
          color: 'white',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'start',
            padding: 2,
          }}
        >
          <IconButton onClick={toggleSidebar} color="inherit">
            <MenuIcon />
          </IconButton>
          {!isCollapsed && (
            <Image src={logo} alt="Logo" width={100} height={100} style={{ marginLeft: 20 }} />
          )}
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.route)}
                sx={{
                  display: 'flex',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  backgroundColor:
                    pathname === item.route ? 'rgba(0, 0, 0, 0.2)' : 'inherit',
                  borderRadius: '8px',
                  margin: '4px 8px',
                  padding: isCollapsed ? '8px' : '8px 16px',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'white',
                    minWidth: 'auto',
                    marginRight: isCollapsed ? 0 : 2,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
