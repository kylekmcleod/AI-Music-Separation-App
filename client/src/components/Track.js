import * as React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import getLPTheme from './getLPTheme';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useCurrentUser } from '../App.js';
import AppAppBarSignedIn from './AppAppBarSignedIn';

const defaultTheme = createTheme({});

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      />
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.bool.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function Track() {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const [track, setTrack] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  React.useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-sample/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch track');
        }
        const data = await response.json();
        setTrack(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching track:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTrack();
  }, [id]);

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      {currentUser ? (
        <AppAppBarSignedIn mode={mode} toggleColorMode={toggleColorMode} />
      ) : (
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      )}
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <Container
          id="track"
          sx={{
            pt: { xs: 4, sm: 12 },
            pb: { xs: 8, sm: 16 },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 6 },
          }}
        >
          {loading ? (
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Loading...
            </Typography>
          ) : error ? (
            <Typography variant="h6" sx={{ color: 'error.main' }}>
              Error: {error}
            </Typography>
          ) : track ? (
            <>
              <Typography variant="h2" sx={{ mt: 2, fontWeight: 'bold', color: 'white' }}>
                {track._id}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Track not found.
            </Typography>
          )}
        </Container>
        <Footer />
      </Box>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
