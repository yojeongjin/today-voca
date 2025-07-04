import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useEffect } from 'react';
// store'
import { useSelector } from 'react-redux';
import wrapper from '@/redux/store';
import { RootState } from '@/redux/modules/reducer';
// persist
import { PersistGate } from 'redux-persist/integration/react';
// hook
import useRouteLoading from '@/hooks/useRouteLoading';
// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/globalstyles';
import theme from '@/styles/theme';
// components
import Layout from '@/component/Common/Layout/Layout';
import Loading from '@/component/Common/Loading/Loading';

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  useRouteLoading();
  const loading = useSelector((state: RootState) => state.common.setLoading);
  const { store } = wrapper.useWrappedStore(pageProps);

  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  useEffect(() => {
    // 화면 높이 계산
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

    // 서비스 워커 등록
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered:', registration);
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }

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
            {loading && <Loading />}
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      )}
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
