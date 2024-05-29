import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

export default function TrackPlayer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        height: '79vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pt: { xs: 8, sm: 12 },
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 0 },
          pb: { xs: 8, sm: 12 },
        }}
      > 


        <Typography
            component="h1"
            variant="h4"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
          Files put here...
        </Typography>

        
      </Container>
    </Box>
  );
}
