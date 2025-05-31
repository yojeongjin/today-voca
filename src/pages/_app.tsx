import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useEffect } from 'react';
// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/globalstyles';
import theme from '@/styles/theme';
import '../styles/fonts/index.css';
import BottomNav from '@/component/Common/BottomNav/BottomNav';

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  useEffect(() => {
    setScreenSize();

    window.addEventListener('resize', setScreenSize);
    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
      <BottomNav />
    </ThemeProvider>
  );
};

export default App;
