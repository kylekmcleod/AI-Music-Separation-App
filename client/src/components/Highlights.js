import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Versatile Audio Splitting',
    description:
      'Seamlessly divide and isolate audio tracks according to your preferences, empowering precise control and customization of your sound.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Enduring Performance Engine',
    description:
      'Harness the enduring power of our software, ensuring consistent, reliable performance that withstands the test of time for enduring value.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Intuitive User Interface',
    description:
      "Navigate effortlessly through our software's user-friendly interface, designed for intuitive operation and seamless integration into your workflow.",
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Cutting-Edge Audio Engineering',
    description:
      'Explore innovative audio manipulation features that redefine industry standards, offering unparalleled versatility and creative freedom.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Responsive Customer Assistance',
    description:
      "Access expert assistance and responsive support whenever you need it, ensuring smooth operation and maximizing your software's potential.",
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Exquisite Detailing for Audiophiles',
    description:
      'Delve into the intricacies of sound with meticulously crafted software, where every detail is finely tuned to deliver an immersive audio experience.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Why us?
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
          Uncover the essence of our app: adaptability, resilience, user-centric design, and cutting-edge innovation. Access dependable customer support and precision engineering in every feature.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
