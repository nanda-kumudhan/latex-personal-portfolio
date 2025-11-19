import { Paper, PaperProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface GlassPanelProps extends PaperProps {
  accent?: 'default' | 'hero' | 'section';
}

const StyledPaper = styled(Paper)<GlassPanelProps>(({ theme, accent = 'default' }) => ({
  padding: accent === 'hero' ? '3.5rem 3rem' : '2.25rem 2rem',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: accent === 'hero'
    ? 'linear-gradient(135deg, rgba(25,25,30,0.65) 0%, rgba(35,55,70,0.6) 100%)'
    : 'rgba(25,25,25,0.55)',
  backdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: accent === 'hero' ? 24 : 18,
  boxShadow: accent === 'hero'
    ? '0 12px 48px rgba(0,0,0,0.55)'
    : '0 8px 32px rgba(0,0,0,0.45)',
  transition: 'transform .35s ease, box-shadow .35s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 16px 56px rgba(0,0,0,0.65)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -120,
    left: -120,
    width: 240,
    height: 240,
    background: 'radial-gradient(circle at center, rgba(0,170,255,0.18), transparent 70%)',
    opacity: accent === 'hero' ? 1 : 0.55,
    pointerEvents: 'none'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -140,
    right: -140,
    width: 280,
    height: 280,
    background: 'radial-gradient(circle at center, rgba(0,170,255,0.12), transparent 70%)',
    opacity: accent === 'hero' ? 0.85 : 0.5,
    pointerEvents: 'none'
  }
}));

export default function GlassPanel({ accent = 'default', ...rest }: GlassPanelProps) {
  return <StyledPaper accent={accent} {...rest} />;
}