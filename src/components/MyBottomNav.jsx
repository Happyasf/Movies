import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { BiSolidMoviePlay } from "react-icons/bi";
import { MdOutlineScreenSearchDesktop, MdLiveTv } from "react-icons/md";
import { useNavigate } from 'react-router';

export const MyBottomNav = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate('/');
    if (newValue === 1) navigate('/tvseries');
    if (newValue === 2) navigate('/search');
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 1000, // mindig felül maradjon
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          bgcolor: '#0d1b2a',
          color: 'white',
          boxShadow: '0 -4px 10px rgba(0,0,0,0.5)',
        }}
      >
        <BottomNavigationAction
          sx={{
            color: 'white',
            '&.Mui-selected': { color: '#ff4d4d' },
            '&:hover': { color: '#ff4d4d' },
          }}
          label="Movies"
          icon={<BiSolidMoviePlay />}
        />
        <BottomNavigationAction
          sx={{
            color: 'white',
            '&.Mui-selected': { color: '#ff4d4d' },
            '&:hover': { color: '#ff4d4d' },
          }}
          label="TVSeries"
          icon={<MdLiveTv />}
        />
        <BottomNavigationAction
          sx={{
            color: 'white',
            '&.Mui-selected': { color: '#ff4d4d' },
            '&:hover': { color: '#ff4d4d' },
          }}
          label="Search"
          icon={<MdOutlineScreenSearchDesktop />}
        />
      </BottomNavigation>
    </Box>
  );
};
