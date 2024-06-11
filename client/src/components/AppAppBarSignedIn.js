import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import { useCurrentUser } from '../App.js';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function AppAppBarSignedIn({ mode, toggleColorMode}) {
  const currentUser = useCurrentUser();
  console.log(currentUser);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const currentPath = window.location.pathname;
    if(currentPath !== '/') {
      window.location.href = `/`;
    }
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };
  const handleSignOut = async () => {
    try {
      await axios.post('http://localhost:5000/signout', null, { withCredentials: true });
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  


  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 1)'
                  : 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(14px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
            })}
          >
            
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '0px',
                px: 0,
              }}
            >
              <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={
                  theme.palette.mode === 'light'
                    ? 'https://i.ibb.co/BPJBPCr/Group-2.png'
                    : 'https://i.ibb.co/F0NL3Rh/Group-1.png'
                }
                style={{...logoStyle, marginRight: '10px', marginTop: '-4px'}}
                alt="logo of sitemark"
              />
              </a>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  onClick={() => scrollToSection('highlights')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    About
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('faq')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => navigate('/browse-samples')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Browse Samples
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              
              <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
              >
                {currentUser.email}
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                onClick = {handleSignOut}
                
              >
                Sign out
              </Button>
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => scrollToSection('highlights')}>
                    About
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>
                    FAQ
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/browse-samples')}>
                    Browse Samples
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      target="_blank"
                      sx={{ width: '100%'}}
                    >
                      {currentUser.email}
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      target="_blank"
                      sx={{ width: '100%' }}
                      onClick = {handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBarSignedIn.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

export default AppAppBarSignedIn;
