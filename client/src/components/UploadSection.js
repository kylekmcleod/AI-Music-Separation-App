import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import logo from '../images/stems.png';
import { useCurrentUser } from '../App.js';
import { useTheme } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
export default function UploadSection({ onFileUpload, onProcessingDone }) {
  const currentUser = useCurrentUser();
  const [dragging, setDragging] = React.useState(false);
  const theme = useTheme();
  const Navigate = useNavigate();

  const handleFileChange = (files) => {
    const file = files[0];
    if (currentUser.credits > 0) { // Check if user has enough credits
      if (file && (file.type === 'audio/mpeg' || file.type === 'audio/wav' || file.type === 'audio/flac')) { // Check if file is correct type
        const audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = () => {
          const duration = audio.duration;
          if (duration <= 600) { // Check if file is less than 10 minutes
            console.log('File uploaded:', file);
            onFileUpload();
            const formData = new FormData();
            formData.append('audioFile', file);

            fetch('http://localhost:5000/upload', {
              method: 'POST',
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                onProcessingDone(data.isDone, data.files);
                if (data.isDone) {
                  fetch('http://localhost:5000/deduct-credit', {
                    method: 'POST',
                    credentials: 'include',
                  })
                    .then((response) => response.json())
                    .then((creditData) => {
                      console.log('Credit deducted:', creditData);
                      currentUser.credits = creditData.credits;
                    })
                    .catch((error) => {
                      console.error('Error deducting credit:', error);
                    });
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          } else {
            alert('Audio file duration exceeds the allowed limit of 10 minutes.');
          }
        };
      } else {
        alert('Only .mp3, .wav, and .flac files are allowed.');
      }
    } else {
      alert('You do not have enough credits to process this file.');
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
      onDrop={currentUser ? handleDrop : null}
      onDragOver={currentUser ? handleDragOver : null}
      onDragLeave={currentUser ? handleDragLeave : null}
      sx={{
        width: '100%',
        backgroundImage: (theme) =>
          theme.palette.mode === 'light' ? '' : '',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        border: '2px dashed',
        borderColor: dragging ? '#EF4A40' : 'transparent',
        transition: 'background-color 0.3s ease',
        backgroundColor: dragging && theme.palette.mode === 'dark' ? alpha('#000', 0.7) : 'transparent',
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
            sx={{ pt: 2, width: { xs: '100%', justifyContent: 'center', textAlign: 'center' } }}
          >
            {currentUser ? (
              <>
                <input
                  accept=".mp3,.wav,.flac"
                  style={{ display: 'none' }}
                  id="upload-audio"
                  type="file"
                  onChange={handleInputChange}
                />
                <Stack spacing={1} alignItems="center" sx={{ pt: 2, width: { xs: '100%', justifyContent: 'center', textAlign: 'center' } }}>
                  <Button variant="contained" color="primary" component="span">
                    Upload Audio
                  </Button>

                  <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8, color: 'text.secondary' }}>
                    .mp3, .wav, .flac supported
                  </Typography>
                  <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
                    By clicking &quot;Upload Audio&quot; you agree to our&nbsp;
                    <Link
                      color="primary"
                      onClick={() => Navigate('/terms-of-service')}
                      href="#"
                    >
                      Terms & Conditions
                    </Link>
                    .
                  </Typography>
                </Stack>
              </>
            ) : (
              <Typography variant="body1" textAlign="center" color="text.secondary">
                Please <span style={{ color: 'white', fontWeight: 'bold' }}>sign in</span> to upload audio files.
              </Typography>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
