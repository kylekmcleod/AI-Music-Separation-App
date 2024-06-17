import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#080C0E',
        overflow: 'hidden',
      }}
    >
      <CircularProgress 
        sx={{ color: '#EF4A40' }}
      />
    </Box>
  );
}
