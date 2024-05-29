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
import TrackPlayer from './TrackPlayer';

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

export default function LandingPage() {
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));

  const [isFileUploaded, setIsFileUploaded] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const resetComponents = () => {
    setIsFileUploaded(false);
    setIsDone(false);
  };

  const handleFileUpload = () => {
    setIsFileUploaded(true);
  };

  const handleProcessingDone = (isDone) => {
    setIsDone(isDone);
  };
  
  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

      {isFileUploaded ? (
        isDone ? <TrackPlayer /> : <FileUploaded />
      ) : (
        <UploadSection onFileUpload={handleFileUpload} onProcessingDone={handleProcessingDone} />
      )}

      <Box sx={{ bgcolor: 'background.default' }}>
        <Features />
        <Divider />
        <Divider />
        <Highlights />
        <Divider />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>

      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
      <Button onClick={resetComponents}>Reset Components</Button>
    </ThemeProvider>
  );
}
