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
import { useCurrentUser } from '../App.js'
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
  const currentUser = useCurrentUser();
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

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>Acceptance of Terms</Typography>
          By accessing or using our website or services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access our website or use our services.

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>Description of Service</Typography>
          Song Seperator is an advanced audio track splitter that allows users to effortlessly extract and separate the various layers of any song. Our service supports .mp3, .wav, and .flac audio formats.

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>Limits</Typography>
          You acknowledge and agree that Song Separator imposes limits on the size and number of requests you may send to the Service. Song Separator may change these limits at any time, at Song Separator’s sole discretion.

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>Payment</Typography>
          Listed prices are in U.S. dollars (USD) and include any sales tax (VAT) when applicable. The charged prices are equal to the listed prices regardless of the amount of sales tax to be paid. Payments are not refundable.
          Song Separator uses a credit system. Each user is allocated a certain number of credits. If you do not have sufficient credits, you may not be able to use the Song Separator service.

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>Usage Policies</Typography>
          You represent and warrant that your use of the Song Separator service will not infringe the proprietary rights, including but not limited to the copyright, 
          patent, trademark, or trade secret rights, of any third party. You affirm that you have legal authorization to modify files and submit YouTube videos for 
          separation using the Song Separator service, and that the content you submit does not contain or install any viruses, worms, malware, Trojan horses, or other 
          harmful or destructive content. Furthermore, you agree not to use the Song Separator service in any manner that may disable, damage, or overburden it. Your use 
          of the Song Separator service will be in strict accordance with this Agreement and with all applicable laws and regulations, including without limitation any 
          local laws or regulations in your country, state, city, or other governmental area. Song Separator reserves the right, in its sole discretion, to refuse or 
          remove content, terminate any subscription, and deny or limit access to use of the Song Separator service to any individual or entity if the terms of this Agreement 
          are violated.

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>Intellectual Property</Typography>
          All content and materials available on our website, including but not limited to logos, text, graphics, images, and software, are the property of SongSeperator and are protected by copyright and other intellectual property laws.
        
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>Changes to Terms</Typography>
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
