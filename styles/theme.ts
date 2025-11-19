import { createTheme } from '@mui/material/styles';

// Central glass tokens for reuse
export const glassTokens = {
  baseBg: 'rgba(20,24,40,0.6)',
  heroGradient: 'linear-gradient(135deg, rgba(10,25,50,0.7) 0%, rgba(25,40,70,0.65) 100%)',
  border: '1px solid rgba(0,170,255,0.15)',
  borderStrong: '1px solid rgba(0,170,255,0.25)',
  shadowSm: '0 6px 24px rgba(0,100,200,0.2)',
  shadowMd: '0 8px 32px rgba(0,120,220,0.25)',
  shadowLg: '0 12px 48px rgba(0,150,255,0.3)',
  blur: 'blur(14px)',
  blurStrong: 'blur(18px)'
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00d4ff' },
    secondary: { main: '#ff006e' },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    background: {
      default: '#0f1419',
      paper: 'rgba(20,24,40,0.6)'
    }
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          position: 'relative',
          textDecoration: 'none',
          transition: 'color .3s ease',
          fontWeight: 500
        }
      }
    }
  }
});

export default theme;