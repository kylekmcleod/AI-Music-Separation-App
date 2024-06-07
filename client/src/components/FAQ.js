import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
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
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="h3" variant="subtitle2">
            Is the Music Splitter free?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body3"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' },  color: 'text.secondary' }}
            >
              Yes, the Music Splitter feature is available for free, allowing users to separate mixed audio tracks into individual components. However, each user account comes with a limited number of credits. These credits are used for accessing premium features or for additional usage beyond the free tier. For more details on credit usage and premium features, please refer to our pricing page.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle2">
            What are audio stems?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body3"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' },  color: 'text.secondary' }}
            >
              Audio stems are individual tracks or components that constitute a mixed audio recording. For instance, in a music track, stems could include separate files for vocals, drums, bass, guitar, and other instruments. These stems enable users to manipulate and edit specific elements of the audio independently, offering greater flexibility in audio production and remixing.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="h3" variant="subtitle2">
            What audio formats are accepted?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body3"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' },  color: 'text.secondary' }}
            >
              Accepted formats include MP3, WAV, and FLAC.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
