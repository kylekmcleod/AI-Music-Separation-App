import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TermsOfService() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Terms of Service
      </Typography>
      <Box>
        <Typography variant="body1" paragraph>
          Your terms of service content goes here. You can add multiple paragraphs, lists, headings, and other elements as needed.
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
        </Typography>
        {/* Add more content as needed */}
      </Box>
    </Container>
  );
}
