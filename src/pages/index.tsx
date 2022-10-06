import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { useTheme } from '../providers/theme';

import { styled } from '../../stiches.config';

const Home: NextPage = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <Layout>
      <>Hello current theme is {isDark ? 'Dark' : 'Light'}</>
      <Button onClick={toggleTheme}>Toggle</Button>
    </Layout>
  );
};

export default Home;

const Button = styled('button', {});
