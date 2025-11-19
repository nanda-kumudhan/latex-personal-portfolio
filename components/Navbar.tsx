import Link from 'next/link';
import { AppBar, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(20, 20, 20, 0.7)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'fixed',
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '2rem',
}));

const StyledLink = styled('a')(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.1rem',
  transition: 'color 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    color: '#0070f3',
  },
}));

const Navbar = () => {
  return (
    <StyledAppBar>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <NavLinks>
          <Link href="#home" passHref legacyBehavior>
            <StyledLink>Home</StyledLink>
          </Link>
          <Link href="#education" passHref legacyBehavior>
            <StyledLink>Education</StyledLink>
          </Link>
          <Link href="#experience" passHref legacyBehavior>
            <StyledLink>Experience</StyledLink>
          </Link>
          <Link href="#projects" passHref legacyBehavior>
            <StyledLink>Projects</StyledLink>
          </Link>
          <Link href="#skills" passHref legacyBehavior>
            <StyledLink>Skills</StyledLink>
          </Link>
          <Link href="#contact" passHref legacyBehavior>
            <StyledLink>Contact</StyledLink>
          </Link>
        </NavLinks>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
