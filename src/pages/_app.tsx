import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useEffect } from 'react';
// store
import wrapper from '@/redux/store';
// persist
import { PersistGate } from 'redux-persist/integration/react';
// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/globalstyles';
import theme from '@/styles/theme';
import '../styles/fonts/index.css';
// components
import Layout from '@/component/Common/Layout/Layout';

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const { store } = wrapper.useWrappedStore(pageProps);

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
      {store.__persistor && (
        <PersistGate loading={null} persistor={store.__persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      )}
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
