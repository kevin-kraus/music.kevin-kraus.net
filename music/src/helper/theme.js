import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
      primary: {
        main: '#bd359b',
      },
      secondary: {
        main: '#05acc0',
      },
      background: {
        default: '#282C34',
        paper: '#333842',
      },
      text: {
        primary: 'rgba(255,255,255,0.87)',
        secondary: 'rgba(255,255,255,0.54)',
        disabled: 'rgba(255,255,255,0.38)',
        hint: 'rgba(255,255,255,0.38)',
      },
    },
  });