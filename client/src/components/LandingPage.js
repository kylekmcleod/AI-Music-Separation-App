import React, { useState, useEffect } from 'react';

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
import axios from 'axios';
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

export default function LandingPage() {
  const currentUser = useCurrentUser();
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));

  const [isFileUploaded, setIsFileUploaded] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const [files, setFiles] = React.useState([]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleFileUpload = () => {
    setIsFileUploaded(true);
  };

  const handleProcessingDone = (isDone, files) => {
    setIsDone(isDone);
    setFiles(files);
  };
  
  
  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      {currentUser ? (
        <AppAppBarSignedIn mode={mode} toggleColorMode={toggleColorMode} />
      ) : (
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      )}

      {isFileUploaded ? (
        isDone ? <TrackPlayer files={files} /> : <FileUploaded />
      ) : (
        <UploadSection onFileUpload={handleFileUpload} onProcessingDone={handleProcessingDone} />
      )}

      <Box sx={{ bgcolor: 'background.default' }}>
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
    </ThemeProvider>
  );
}
