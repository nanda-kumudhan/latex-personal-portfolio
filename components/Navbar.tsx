import Link from 'next/link';
import { AppBar, Toolbar, Box, Link as MUILink } from '@mui/material';
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

const StyledLink = styled(MUILink)(({ theme }) => ({
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
          <StyledLink component={Link} href="#home">
            Home
          </StyledLink>
          <StyledLink component={Link} href="#education">
            Education
          </StyledLink>
          <StyledLink component={Link} href="#experience">
            Experience
          </StyledLink>
          <StyledLink component={Link} href="#projects">
            Projects
          </StyledLink>
          <StyledLink component={Link} href="#skills">
            Skills
          </StyledLink>
          <StyledLink component={Link} href="#contact">
            Contact
          </StyledLink>
        </NavLinks>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
