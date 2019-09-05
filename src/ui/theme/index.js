import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#320336' },
  secondary: { main: '#01f780' },
};

const themeName = 'PL Purple-Green';

export default createMuiTheme({
  palette,
  themeName,
  typography: {
    fontFamily: [
      'PremierSans-Regular',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['PremierSans-Regular'],
      },
    },
  },
});
