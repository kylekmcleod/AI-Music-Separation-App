import * as React from 'react';
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
import { useCurrentUser } from '../App.js';
import AppAppBarSignedIn from './AppAppBarSignedIn';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      >
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.bool.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function Profile() {
  const currentUser = useCurrentUser();
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  
  const [formData, setFormData] = React.useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || ''
  });

  const [originalData, setOriginalData] = React.useState(formData);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const navigate = useNavigate();
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSave = async () => {
    const { firstName, lastName, email } = formData;
    
    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      alert('First name and last name cannot be blank');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Email must be in a valid format');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        setOriginalData(formData);
        alert('Profile updated successfully');
        window.location.reload();
      } else {
        alert(`Error updating profile: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
  };

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
          id="profile"
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
          <Box variant="outlined" sx={{ width: '100%', maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom sx={{ pt: 2 }}>
              Personal Information
              <Typography variant="body2" gutterBottom sx={{ pb: 2 }}>
                Edit your profile.
              </Typography>
            </Typography>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, width: '100%' }}>
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                size="small"
                value={formData.firstName}
                onChange={handleInputChange}
                InputProps={{ style: { width: '100%', textAlign: 'left' } }}
                sx={{ width: '48%' }}
              />
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                size="small"
                value={formData.lastName}
                onChange={handleInputChange}
                InputProps={{ style: { width: '100%', textAlign: 'left' } }}
                sx={{ width: '48%' }}
              />
            </Box>
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              size="small"
              fullWidth
              value={formData.email}
              onChange={handleInputChange}
              InputProps={{ style: { width: '100%', textAlign: 'left' } }}
              sx={{ mt: 2 }}
            />

            <Button
              color="primary"
              variant="outlined"
              size="small"
              sx={{ mt: 2, mr: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              variant="contained"
              size="small"
              sx={{ mt: 2 }}
              onClick={handleSave}
            >
              Save
            </Button>
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
