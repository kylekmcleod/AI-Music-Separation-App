import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

import { useTheme } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
const logoStyle = {
  width: '140px',
  height: 'auto',
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link href="#">Kyle McLeod&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const Navigate = useNavigate();
  const theme = useTheme();
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Box sx={{ ml: '-2px' }}>
              <img
                src={
                  theme.palette.mode === 'light'
                    ? 'https://i.ibb.co/BPJBPCr/Group-2.png'
                    : 'https://i.ibb.co/F0NL3Rh/Group-1.png'
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Effortlessly dissect songs with SongSeperator, offering precise separation for creative control.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Legal
          </Typography>
          <Link
            color="text.secondary"
            onClick={() => Navigate('/terms-of-service')}
            href="#"
          >
            Terms & Conditions
          </Link>
          <Link
            color="text.secondary"
            onClick={() => Navigate('/privacy-policy')}
            href="#"
          >
            Privacy
          </Link>
          <Link 
            color="text.secondary" 
            onClick={() => Navigate('/contact')}
            href="#"
            >
            Contact
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
