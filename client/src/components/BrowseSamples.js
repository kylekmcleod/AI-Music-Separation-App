import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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

export default function BrowseSamples() {
  const currentUser = useCurrentUser();
  const [mode, setMode] = useState('dark');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const [samples, setSamples] = useState([]);
  const [filteredSamples, setFilteredSamples] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [samplesPerPage] = useState(10);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-samples');
      const data = await response.json();
      setSamples(data);
      setFilteredSamples(data);
    } catch (error) {
      console.error('Error fetching samples:', error);
    }
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    const filtered = samples.filter((sample) =>
      sample._id.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSamples(filtered);
  };

  // Function to limit the characters in sample ID
  const limitCharacters = (text, limit) => {
    if (text.length > limit) {
      return text.slice(0, limit) + '...';
    }
    return text;
  };

  // Function to get current samples
  const indexOfLastSample = currentPage * samplesPerPage;
  const indexOfFirstSample = indexOfLastSample - samplesPerPage;
  const currentSamples = filteredSamples.slice(indexOfFirstSample, indexOfLastSample);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
          id="faq"
          sx={{
            pt: { xs: 4, sm: 12 },
            pb: { xs: 8, sm: 16 },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            gap: { xs: 3, sm: 6 },
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'justify', mt: 2, color: 'text.secondary' }}>
            <Typography variant="h2" sx={{ mt: 2, fontWeight: 'bold', color: 'white' }}>Browse Samples</Typography>
            To get your upload listed here, you must upload a file and agree to share your sample publicly. Please ensure that the content complies with our community guidelines before submitting.
          </Typography>

          <TextField
            id="search"
            label="Search"
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{ style: { width: '50%', textAlign: 'left' } }}
          />

          <Grid container spacing={3}>
            {currentSamples.length === 0 ? (
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    textAlign: 'left',
                    color: 'text.primary',
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                    minHeight: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, mt:7}}>
                    No results found.
                  </Typography>
                </Paper>
              </Grid>
            ) : (
              currentSamples.map((sample, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      textAlign: 'left',
                      color: 'text.primary',
                      backgroundColor: 'background.paper',
                      borderRadius: 2,
                      minHeight: '180px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div>
                      <Typography variant="h6" sx={{ textAlign: 'left', fontWeight: 'bold', mb: 1 }}>
                        {limitCharacters(sample._id, 50)}
                      </Typography>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        download
                      >
                        &#9825; Like
                      </Button>

                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        href={`/track/${sample._id}`}
                      >
                        View Sample
                      </Button>
                    </div>
                  </Paper>
                </Grid>
              ))
            )}
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            {Array.from({ length: Math.ceil(filteredSamples.length / samplesPerPage) }, (_, index) => (
              <Button
                key={index}
                onClick={() => paginate(index + 1)}
                sx={{ mx: 1 }}
                variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                color="primary"
              >
                {index + 1}
              </Button>
            ))}
          </Box>
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
