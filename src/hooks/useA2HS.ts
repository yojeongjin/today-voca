import { useEffect, useState } from 'react';

const LOCALSTORAGE_KEY = 'kong_hide_a2hs_until';
const IOS_GUIDE_KEY = 'kong_ios_install_guide_hide_until';

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export const useA2HS = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false); // Android
  const [isIOSGuideVisible, setIsIOSGuideVisible] = useState(false); // iOS

  const isInstalled = () => {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    );
  };

  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
  const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent.toLowerCase());
  const isInStandaloneMode = () =>
    'standalone' in window.navigator && (window.navigator as any).standalone;

  useEffect(() => {
    if (isInstalled()) return;

    const now = Date.now();

    // Android 설치 이벤트
    const hideUntil = Number(localStorage.getItem(LOCALSTORAGE_KEY));
    if (!hideUntil || now > hideUntil) {
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setIsVisible(true);
      };
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    // iOS 설치 가이드
    const iosHideUntil = Number(localStorage.getItem(IOS_GUIDE_KEY));
    if (isIOS() && isSafari() && !isInStandaloneMode() && (!iosHideUntil || now > iosHideUntil)) {
      setIsIOSGuideVisible(true);
    }
  }, []);

  // Android
  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'dismissed') {
      const threeDaysLater = Date.now() + 3 * 24 * 60 * 60 * 1000;
      localStorage.setItem(LOCALSTORAGE_KEY, `${threeDaysLater}`);
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const cancel = () => {
    const threeDaysLater = Date.now() + 3 * 24 * 60 * 60 * 1000;
    localStorage.setItem(LOCALSTORAGE_KEY, `${threeDaysLater}`);
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  // iOS
  const cancelIOSGuide = () => {
    const threeDaysLater = Date.now() + 3 * 24 * 60 * 60 * 1000;
    localStorage.setItem(IOS_GUIDE_KEY, `${threeDaysLater}`);
    setIsIOSGuideVisible(false);
  };

  return {
    isVisible,
    isIOSGuideVisible,
    installApp,
    cancel,
    cancelIOSGuide,
  };
};
