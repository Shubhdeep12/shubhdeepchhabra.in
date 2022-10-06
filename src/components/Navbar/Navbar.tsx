import { FC } from '../../../src/types/FC';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { styled } from '../../../stiches.config';

import Icon from '../Icon';
import Text from '../Text';

import { useTheme } from '../../providers/theme';


const Navbar: FC = () => {
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <NavbarContainer>
      <Nav aria-expanded={isExpanded}>
        <UpperDeck><StyledName onClick={() => router.push('/')} size="lar">
          Shubhdeep Chhabra
        </StyledName>
        <Links>
          <Link
            aria-current={router.route.includes('/about') ? 'page' : undefined}
            onClick={() => router.push('/about')}
          >
            <StyledText size="lar">About</StyledText>
          </Link>
          <Link
            aria-current={router.route.includes('/blogs') ? 'page' : undefined}
            onClick={() => router.push('/blogs')}
          >
            <StyledText size="lar">Blogs</StyledText>
          </Link>
        </Links>
        <Icons>
          <StyledIconBackground onClick={toggleTheme}>
            <Icon name="themeToggle" size={17} />
          </StyledIconBackground>
          
          <MobileMenu
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}>
            {!isExpanded ?
              <Icon name="menu" size={22} />
              :
              <Icon name="cross" size={22} />
            }
          </MobileMenu>
          </Icons>
        </UpperDeck>
        {isExpanded &&
          <LowerDeck>
            <MobileLinks>
              <Link
                aria-current={router.route.includes('/about') ? 'page' : undefined}
                onClick={() => router.push('/about')}
              >
                <StyledText size="lar">About</StyledText>
              </Link>
              <Link
                aria-current={router.route.includes('/blogs') ? 'page' : undefined}
                onClick={() => router.push('/blogs')}
              >
                <StyledText size="lar">Blogs</StyledText>
              </Link>
            </MobileLinks>
          </LowerDeck>
        }
      </Nav>

    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled('div', {
  position: 'fixed',
  padding: '15px 10px 0px 10px',
  height: '72px',
  width: '100%',
  maxWidth: 'var(--sizes-max-page-width)',
  zIndex: '2',
});

const Nav = styled('div', {
  
  height: '$$navbarHeight',
  '@@bpMobile': {
    transition: 'height 0.3s ease',
    '&[aria-expanded = true]': {
      height: 'calc($$navbarHeight + 40px)', 
    }
  },
  backgroundColor: 'rgba(235 240 251 / .75)',
  padding: '0px 15px',
  borderRadius: '8px',
  backdropFilter: 'blur(10px) saturate(150%)',
  boxShadow: '0 0 6px 1px rgb(45 82 171 / 16%)',
  border: '1px solid rgba(45 82 171 / 0.12)',
});

const UpperDeck = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const LowerDeck = styled('div', {
  display: 'flex',
});

const Links = styled('div', {
  display: 'flex',
  flex: 0.5,
  justifyContent: 'space-evenly',
  '@@bpMobile': {
    display: 'none',
    
  }
});

const MobileLinks = styled('div', {
  display: 'none',
  '@@bpMobile': {
    display: 'flex',
    flex: 0.5,
    justifyContent: 'space-evenly',    
  }
});

const Link = styled('div', {
  transition: 'background-color 0.3s ease',
  minHeight: '40px',
  minWidth: '70px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(45 82 171 / 0.1)',
  },
  '&:active': {
    backgroundColor: 'rgba(45 82 171 / 0.2)',
  },
  '&[aria-current = "page"]': {
    backgroundColor: 'rgba(45 82 171 / 0.1)',
  },
});

const StyledText = styled(Text, {
  lineHeight: '19px',
  fontWeight: '600',
});

const StyledName = styled(Text, {
  transition: 'background-color 0.3s ease',
  minHeight: '40px',
  minWidth: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.375rem',
  fontWeight: '600',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(45 82 171 / 0.1)',
  },
  '&:active': {
    backgroundColor: 'rgba(45 82 171 / 0.2)',
  },
});

const Icons = styled('div', {
  display: 'flex',
  alignItems: 'center'
})
const StyledIconBackground = styled('div', {
  transition: 'background-color 0.3s ease',
  minHeight: '40px',
  minWidth: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(45 82 171 / 0.1)',
  },
  '&:active': {
    backgroundColor: 'rgba(45 82 171 / 0.2)',
  },
});

const MobileMenu = styled('div', {
  display: 'none',
  '@@bpMobile': {
    transition: 'background-color 0.3s ease',
    minHeight: '40px',
    minWidth: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(45 82 171 / 0.1)',
    },
    '&:active': {
      backgroundColor: 'rgba(45 82 171 / 0.2)',
    },
    '&[aria-expanded = true]': {
      backgroundColor: 'rgba(45 82 171 / 0.1)',
    },
  }
});