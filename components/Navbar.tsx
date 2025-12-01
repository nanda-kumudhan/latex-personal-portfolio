import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Box, Flex, Button, IconButton, Text } from '@radix-ui/themes';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import styles from '../styles/navbar.module.css';

const sections = ['home', 'education', 'experience', 'projects', 'skills', 'contact'];

const Navbar = () => {
  const [active, setActive] = useState<string>('home');
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    console.log('[NAVBAR] Navigation component mounted');
    
    // Set initial theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
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

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (typeof window !== 'undefined') {
      (window as any).__toggleTheme?.();
    }
  };

  return (
    <>
      <Box
        className={styles.navbar}
        role="navigation"
        aria-label="Main navigation"
      >
        <Flex
          justify="between"
          align="center"
          gap="6"
          className={styles.navContent}
        >
          {/* Desktop Navigation */}
          <Flex
            gap="8"
            className={styles.desktopNav}
            aria-hidden={open ? 'true' : 'false'}
          >
            {sections.map(section => {
              const href = section === 'home' ? '/' : `#${section}`;
              return (
                <Link key={section} href={href} passHref legacyBehavior>
                  <a
                    className={`${styles.navLink} ${
                      active === section ? styles.active : ''
                    }`}
                    onClick={() => section !== 'home' && handleNavClick(section)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </Link>
              );
            })}
          </Flex>

          {/* Theme Toggle Button */}
          {mounted && (
            <IconButton
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label="Toggle theme"
              size="3"
              variant="ghost"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </IconButton>
          )}

          {/* Mobile Menu Button */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <IconButton
                className={styles.mobileMenuBtn}
                aria-label="Open menu"
                size="3"
                variant="ghost"
              >
                <FiMenu size={24} />
              </IconButton>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className={styles.dialogOverlay} />
              <Dialog.Content
                className={styles.mobileMenuContent}
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <Flex
                  justify="between"
                  align="center"
                  p="4"
                  className={styles.mobileHeader}
                >
                  <Text weight="bold" size="5" className={styles.menuTitle}>
                    Menu
                  </Text>
                  <Dialog.Close asChild>
                    <IconButton
                      aria-label="Close menu"
                      size="3"
                      variant="ghost"
                    >
                      <FiX size={24} />
                    </IconButton>
                  </Dialog.Close>
                </Flex>

                <Box className={styles.mobileMenu}>
                  {sections.map(section => {
                    const href = section === 'home' ? '/' : `#${section}`;
                    return section === 'home' ? (
                      <Link key={section} href={href} passHref legacyBehavior>
                        <a
                          className={`${styles.mobileMenuItem} ${
                            active === section ? styles.mobileMenuItemActive : ''
                          }`}
                          aria-label={`Go to ${section} section`}
                          onClick={() => handleClose()}
                        >
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </a>
                      </Link>
                    ) : (
                      <button
                        key={section}
                        className={`${styles.mobileMenuItem} ${
                          active === section ? styles.mobileMenuItemActive : ''
                        }`}
                        onClick={() => handleNavClick(section)}
                        aria-label={`Go to ${section} section`}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </button>
                    );
                  })}
                </Box>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
