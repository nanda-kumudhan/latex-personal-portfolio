import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Box, Flex, Button, IconButton, Text } from '@radix-ui/themes';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from '../styles/navbar.module.css';

const sections = ['home', 'education', 'experience', 'projects', 'skills', 'contact'];

const Navbar = () => {
  const [active, setActive] = useState<string>('home');
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

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
    <>
      <Box
        className={styles.navbar}
        role="navigation"
        aria-label="Main navigation"
      >
        <Flex
          justify="center"
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
            {sections.map(section => (
              <Link key={section} href={`#${section}`} passHref legacyBehavior>
                <a
                  className={`${styles.navLink} ${
                    active === section ? styles.active : ''
                  }`}
                  onClick={() => handleNavClick(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </Link>
            ))}
          </Flex>

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
                  {sections.map(section => (
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
                  ))}
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
