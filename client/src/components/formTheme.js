import { createTheme } from '@mui/material/styles';

const formTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#080C0E', 
    },
    text: {
      primary: '#FFFFFF', 
    },
    primary: {
      main: '#EF4A40',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#FFFFFF', 
          },
        },
      },
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    h1: {
      fontSize: 60,
      fontWeight: 600,
      lineHeight: 78 / 70,
      letterSpacing: -0.2,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
    },
    button: {
      fontFamily: ['Montserrat', 'sans-serif'].join(','),
      fontSize: 14,
      fontWeight: 600,
      textTransform: 'uppercase',
    },
  },
});

export default formTheme;
