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
        default: '#14161A',
        paper: '#1f2228',
      },
      text: {
        primary: 'rgba(255,255,255,0.87)',
        secondary: 'rgba(255,255,255,0.54)',
        disabled: 'rgba(255,255,255,0.38)',
        hint: 'rgba(255,255,255,0.38)',
      },
    },
  });