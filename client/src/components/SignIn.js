import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import formTheme from './formTheme';
import axios from 'axios';

export default function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await axios.post('http://localhost:5000/signin', user, {
        withCredentials: true,
      });
      if (response.data.success) {
        console.log('Logged in successfully:', response.data.user);
        navigate('/');
        window.location.reload();
      } else {
        setErrorMessage('Username or password incorrect');
        console.error('Failed to log in:', response.data);
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in');
      console.error('An error occurred while logging in:', error);
    }
  };

  return (
    <ThemeProvider theme={formTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'text.primary',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'white' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{ style: { color: 'text.primary' } }}
              InputProps={{ style: { color: 'text.primary' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{ style: { color: 'text.primary' } }}
              InputProps={{ style: { color: 'text.primary' } }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ color: 'text.primary' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="#" variant="body2" sx={{ color: 'white', textDecoration: 'underline', '&:hover': { textDecoration: 'underline' } }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/sign-up/" variant="body2" sx={{ color: 'white', textDecoration: 'underline', '&:hover': { textDecoration: 'underline' } }}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
          {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            gutterBottom
            sx={{ paddingTop: 2 }}
          >
            {errorMessage}
          </Typography>
        )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
