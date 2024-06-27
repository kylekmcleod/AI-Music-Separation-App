import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import formTheme from './formTheme';
import axios from 'axios';
import Footer from './Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const fieldLabels = {
    name: 'Name',
    email: 'Email',
    message: 'Message',
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors = {};
    for (const key in formData) {
      if (formData[key].trim() === '') {
        newErrors[key] = `${fieldLabels[key]} is required`;
      }
    }

    // Email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email is not in a valid format';
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Handle form submission
    axios.post('http://localhost:5000/contact', formData)
      .then(response => {
        console.log('Message sent:', response.data);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'white' }}>
            <ContactMailOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <Typography variant="caption" color="error">{errors.name}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <Typography variant="caption" color="error">{errors.email}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  id="message"
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && <Typography variant="caption" color="error">{errors.message}</Typography>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Message
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2" sx={{ color: 'text.secondary' }}>
                  Back to Home
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
