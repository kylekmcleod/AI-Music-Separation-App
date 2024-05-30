import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

export default function TrackPlayer({files}) {
  const theme = useTheme();

  const bass = files.find(file => file.name === 'bass.wav');
  const drums = files.find(file => file.name === 'drums.wav');
  const vocals = files.find(file => file.name === 'vocals.wav');
  const other = files.find(file => file.name === 'other.wav');
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
          component="h4"
          variant="h4"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column'},
            alignSelf: 'center',
            textAlign: 'center',
          }}
        >
          Enjoy the individual tracks of your song:
          <Button variant="contained" href={bass ? bass.url : '#'}sx={{mt: 1, mb: 1, mr: 1}}>Bass</Button>
          <Button variant="contained" href={drums ? drums.url : '#'}sx={{mt: 1, mb: 1, mr: 1}}>Drums</Button>
          <Button variant="contained" href={vocals ? vocals.url : '#'}sx={{mt: 1, mb: 1, mr: 1}}>Vocals</Button>
          <Button variant="contained" href={other ? other.url : '#'}sx={{mt: 1, mb: 1, mr: 1}}>Instruments</Button>
        </Typography>
      </Container>
    </Box>
  );
}
