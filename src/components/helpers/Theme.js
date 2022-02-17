import {createTheme} from '@mui/material/styles';

export const fontTheme = createTheme({
    typography: {
      fontFamily: [
        'Poppins',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Times New Roman',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

export const colorTheme = createTheme({
  palette: {
    mainColor: {
      main: '#EFC9AF',
      contrastText: '#104C91',
    },
    secondaryColor: {
        main: '#104C91',
        contrastText: '#fff'
    },
    helperColor: {
      main: '#1F8AC0',
      contrastText: '#fff'
    }
  },
})