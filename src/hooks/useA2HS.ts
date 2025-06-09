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
    if (typeof window === 'undefined') return false;

    try {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      );
    } catch {
      return false;
    }
  };

  const isIOS = () => {
    if (typeof window === 'undefined') return false;
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent.toLowerCase());
  };

  const isSafari = () => {
    if (typeof window === 'undefined') return false;

    const ua = window.navigator.userAgent.toLowerCase();
    return ua.includes('safari') && !ua.includes('chrome') && !ua.includes('crios');
  };

  const isInStandaloneMode = () => {
    if (typeof window === 'undefined') return false;
    return (window.navigator as any).standalone === true;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isInstalled()) return;

    const now = Date.now();

    // Android: Always register listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      try {
        const hideUntil = Number(localStorage.getItem(LOCALSTORAGE_KEY));
        if (!hideUntil || now > hideUntil) {
          setIsVisible(true);
        }
      } catch {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // iOS Guide 처리
    try {
      const iosHideUntil = Number(localStorage.getItem(IOS_GUIDE_KEY));
      if (isIOS() && isSafari() && !isInStandaloneMode() && (!iosHideUntil || now > iosHideUntil)) {
        setIsIOSGuideVisible(true);
      }
    } catch {
      // fallback to showing
      if (isIOS() && isSafari() && !isInStandaloneMode()) {
        setIsIOSGuideVisible(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'dismissed') {
        const threeDaysLater = Date.now() + 3 * 24 * 60 * 60 * 1000;
        localStorage.setItem(LOCALSTORAGE_KEY, `${threeDaysLater}`);
      }
    } catch (e) {
      console.warn('Error during installApp:', e);
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
