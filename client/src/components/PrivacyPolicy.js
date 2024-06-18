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

export default function PrivacyPolicy() {
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
          Privacy Policy
        </Typography>

        <Typography variant="body1" sx={{ textAlign: 'justify', mt: 2, color: 'text.secondary' }}>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main' }}>What information do we collect?</Typography>
        We collect information from you when you use our Song Separator service. This may include:
        <ul>
          <li>Personal information such as your name and email address.</li>
          <li>Payment information when you purchase a subscription or pay for additional services.</li>
          <li>Files and audio files you submit for processing through our service.</li>
        </ul>

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>What do we use your information for?</Typography>
          The information we collect from you may be used in the following ways:
          <ul>
            <li>To process transactions, deliver the purchased product or service, and manage your transactions.</li>
            <li>To improve our Song Separator service based on the information and feedback we receive.</li>
          </ul>

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>How do we protect your information?</Typography>
          We are committed to ensuring the security of your personal information. We implement a variety of security measures to maintain 
          the safety of your information when you submit it. All sensitive information, such as payment details, is transmitted via Secure
          Socket Layer (SSL) technology and encrypted in our database. We do not store credit card information on our servers after transactions 
          are completed.

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>Do we use cookies?</Typography>
          Yes, we use cookies to enhance your experience on our website, remember your preferences, and facilitate the shopping cart functionality.
          You can choose to disable cookies through your browser settings, but this may affect the functionality of some services on our site.

          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main'}}>Do we disclose any information to outside parties?</Typography>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties
          who assist us in operating our website, conducting our business, or servicing you, provided that these parties agree to keep your information confidential. 
          We may release your information when we believe it is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, 
          or safety.

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
