import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import logo from '../images/stems.png';

export default function Hero() {
  const [dragging, setDragging] = React.useState(false);

  const handleFileChange = (files) => {
    const file = files[0];
    if (file && (file.type === 'audio/mpeg' || file.type === 'audio/wav' || file.type === 'audio/flac')) {
      console.log('File uploaded:', file);
      // Process the file here
    } else {
      alert('Only .mp3, .wav, and .flac files are allowed.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    handleFileChange(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!dragging) {
      setDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleInputChange = (event) => {
    handleFileChange(event.target.files);
  };

  return (
    <Box
      id="hero"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      sx={{
        width: '100%',
        backgroundImage: (theme) =>
          theme.palette.mode === 'light'
            ? 'radial-gradient(circle, rgba(206, 229, 253, 0.9), rgba(255, 255, 255, 0.9))'
            : 'radial-gradient(circle, rgba(2, 41, 79, 0.4), rgba(9, 14, 16, 0.9))',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        border: '2px dashed',
        borderColor: dragging ? '#3f51b5' : 'transparent',
        transition: 'background-color 0.3s ease',
        backgroundColor: dragging ? alpha('#000', 0.7) : 'transparent',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            AI Music&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              Splitter
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Effortlessly extract and separate the various layers of any song with our advanced audio track splitter.
          </Typography>

          <Box
            component="img"
            src={logo}
            alt="AI Music Splitter"
            sx={{
              alignSelf: 'center',
              maxWidth: '80%',
              marginTop: 2,
              marginBottom: 2,
            }}
          />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', justifyContent: 'center', textAlign: 'center',} }}
          >
            <input
              accept=".mp3,.wav,.flac"
              style={{ display: 'none' }}
              id="upload-audio"
              type="file"
              onChange={handleInputChange}
            />
            <label htmlFor="upload-audio">
              <Button variant="contained" color="primary" component="span">
                Upload Audio
              </Button>
            </label>
          </Stack>

          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8, color: 'text.secondary' }}>
            .mp3, .wav, .flac supported
          </Typography>

          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            By clicking &quot;Upload Audio&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
