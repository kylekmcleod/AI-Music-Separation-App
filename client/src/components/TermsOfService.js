import * as React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AppAppBar from './AppAppBar';
import UploadSection from './UploadSection';
import Highlights from './Highlights';
import Features from './Features';
import FAQ from './FAQ';
import Footer from './Footer';
import getLPTheme from './getLPTheme';
import FileUploaded from './FileUploaded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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

export default function TermsOfService() {
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
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
            alignItems: 'center',
            gap: { xs: 3, sm: 6 },
          }}
        >
        <Typography
            component="h1"
            variant="h3"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              pt: 3,
            }}
          >
          Terms of Service
        </Typography>

        <Typography variant="body1" sx={{ textAlign: 'justify', mt: 2, color: 'text.secondary' }}>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>Introduction</Typography>
          Welcome to our AI Music Splitter, provided by SongSeperator ("we", "us", or "our"). By using our website and services, you agree to comply with and be bound by the following terms and conditions ("Terms"). Please read these Terms carefully before accessing or using our website or services.

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>1. Acceptance of Terms</Typography>
          By accessing or using our website or services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access our website or use our services.

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>2. Description of Service</Typography>
          Song Seperator is an advanced audio track splitter that allows users to effortlessly extract and separate the various layers of any song. Our service supports .mp3, .wav, and .flac audio formats.

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>3. Usage Policies</Typography>
          You agree to use our website and services only for lawful purposes and in accordance with these Terms. You may not use our website or services for any illegal or unauthorized purpose.

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>4. Intellectual Property</Typography>
          All content and materials available on our website, including but not limited to logos, text, graphics, images, and software, are the property of SongSeperator and are protected by copyright and other intellectual property laws.
        
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>5. Privacy Policy</Typography>
          Your use of our website and services is also subject to our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
        
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>6. Changes to Terms</Typography>
          We reserve the right to update or modify these Terms at any time without prior notice. By continuing to access or use our website or services after any changes to these Terms, you agree to be bound by the updated Terms.
        </Typography>


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
