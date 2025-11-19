// Radix UI Theme Configuration
// Uses the predefined Radix theme system with dark mode

export const radixThemeConfig = {
  appearance: 'dark',
  accentColor: 'cyan',
  grayColor: 'slate',
  panelBackground: 'solid',
  scaling: '100%' as const,
  radius: 'medium' as const,
} as const;

// Glass effect tokens for custom styling
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

// Color palette aligned with Radix UI
export const colors = {
  primary: '#00d4ff',
  secondary: '#ff006e',
  success: '#10b981',
  warning: '#f59e0b',
  background: '#0f1419',
  surface: '#1a1a2e',
  text: '#e0e0e0',
  textSecondary: '#b0b0b0',
} as const;