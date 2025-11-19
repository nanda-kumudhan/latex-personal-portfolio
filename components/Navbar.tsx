import Link from 'next/link';
import { AppBar, Toolbar, Box, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useEffect, useState, useCallback } from 'react';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(20, 20, 20, 0.7)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'fixed',
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '2rem',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  }
}));

const StyledLink = styled('a', {
  shouldForwardProp: (prop) => prop !== 'active'
})<{active?: boolean}>(({ theme, active }) => ({
  color: active ? '#00aaff' : 'white',
  textDecoration: 'none',
  fontSize: '1.05rem',
  fontWeight: 500,
  position: 'relative',
  padding: '0.25rem 0',
  transition: 'color 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    color: '#00aaff',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '2px',
    width: active ? '100%' : '0%',
    background: '#00aaff',
    transition: 'width 0.3s ease',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  }
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: 'rgba(15,15,15,0.9)',
    backdropFilter: 'blur(10px)',
    width: '70%',
    borderRight: '1px solid rgba(255,255,255,0.1)'
  }
}));

const sections = ['home','education','experience','projects','skills','contact'];

const Navbar = () => {
  const [active, setActive] = useState<string>('home');
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);
  const handleOpen = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    console.log('🔗 [NAVBAR] Navigation component mounted');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        // Trigger when top of section crosses 25% from top
        root: null,
        threshold: 0.3,
        rootMargin: '-10% 0px -50% 0px'
      }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    handleClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <StyledAppBar role="navigation" aria-label="Main navigation">
      <Toolbar sx={{ justifyContent: 'center', gap: 2 }}>
        <MobileMenuButton aria-label="Open menu" onClick={handleOpen}>
          <MenuIcon />
        </MobileMenuButton>
        <NavLinks aria-hidden={open}>
          {sections.map(section => (
            <Link key={section} href={`#${section}`} passHref legacyBehavior>
              <StyledLink active={active === section}>{section.charAt(0).toUpperCase() + section.slice(1)}</StyledLink>
            </Link>
          ))}
        </NavLinks>
      </Toolbar>
      <MobileDrawer anchor="left" open={open} onClose={handleClose} ModalProps={{ keepMounted: true }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <Box component="span" sx={{ fontWeight: 600, letterSpacing: 1 }}>Menu</Box>
          <IconButton aria-label="Close menu" onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {sections.map(section => (
            <ListItemButton
              key={section}
              onClick={() => handleNavClick(section)}
              selected={active === section}
              sx={{
                '&.Mui-selected': { background: 'rgba(0,170,255,0.15)' },
                '&:hover': { background: 'rgba(0,170,255,0.1)' }
              }}
              aria-label={`Go to ${section} section`}
            >
              <ListItemText primary={section.charAt(0).toUpperCase() + section.slice(1)} primaryTypographyProps={{ sx: { color: active === section ? '#00aaff' : 'white', fontWeight: active === section ? 600 : 500 } }} />
            </ListItemButton>
          ))}
        </List>
      </MobileDrawer>
    </StyledAppBar>
  );
};

export default Navbar;
