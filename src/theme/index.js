import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: colors.grey[100],
      light: colors.grey[50],
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.teal[700]
    },
    secondary: {
      main: colors.teal[300]
    },
    text: {
      logo: "#FFF",
      highlight: colors.orange[500],
      light: colors.grey[200],
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
});

export default theme;
