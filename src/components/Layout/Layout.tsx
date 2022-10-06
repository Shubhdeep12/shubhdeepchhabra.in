import type { FC } from '../../types/FC';
import { styled, keyframes } from '../../../stiches.config';

// import BackToTop from '../BackToTop';
// import Footer from '../Footer';
import Navbar from '../Navbar';

const Layout: FC = (props) => {
  return (
    <>
      <Navbar />
      <Main>{props.children}</Main>
      {/* <Footer />
      <BackToTop /> */}
    </>
  );
};

export default Layout;

const pageTransition = keyframes({
  '0%': { transform: 'scale(0.975)', opacity: 0 },
  '100%': { transform: 'scale(1)', opacity: 1 },
});

const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  zIndex: 0,
  paddingTop: 'calc($$navbarHeight + 15px)',
  paddingBottom: '15px',
  canAnimate: {
    animationName: pageTransition,
    animationDuration: '300ms',
    animationDelay: '150ms',
    animationFillMode: 'backwards',
  },
});
