import { createTheme } from '@mui/material/styles';

// Central glass tokens for reuse
export const glassTokens = {
  baseBg: 'rgba(25,25,30,0.55)',
  heroGradient: 'linear-gradient(135deg, rgba(25,25,30,0.65) 0%, rgba(35,55,70,0.6) 100%)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderStrong: '1px solid rgba(255,255,255,0.12)',
  shadowSm: '0 6px 24px rgba(0,0,0,0.45)',
  shadowMd: '0 8px 32px rgba(0,0,0,0.5)',
  shadowLg: '0 12px 48px rgba(0,0,0,0.65)',
  blur: 'blur(14px)',
  blurStrong: 'blur(18px)'
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00aaff' },
    background: {
      default: '#0f2027',
      paper: 'rgba(20,20,20,0.55)'
    }
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
  },
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: 'glass' },
          style: {
            background: glassTokens.baseBg,
            backdropFilter: glassTokens.blur,
            borderRadius: '18px',
            border: glassTokens.border,
            boxShadow: glassTokens.shadowMd,
            position: 'relative',
            overflow: 'hidden'
          }
        },
        {
          props: { variant: 'glassElevated' },
          style: {
            background: glassTokens.heroGradient,
            backdropFilter: glassTokens.blurStrong,
            borderRadius: '22px',
            border: glassTokens.borderStrong,
            boxShadow: glassTokens.shadowLg
          }
        }
      ]
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          position: 'relative',
          textDecoration: 'none',
          transition: 'color .3s ease',
          fontWeight: 500
        }
      },
      variants: [
        {
          props: { variant: 'nav' },
          style: {
            padding: '0.25rem 0',
            fontSize: '1.05rem'
          }
        }
      ]
    }
  }
});

export default theme;