import { useEffect, useState } from 'react';

const LOCALSTORAGE_KEY = 'kong_hide_a2hs_until';
const IOS_GUIDE_KEY = 'kong_ios_install_guide_hide_until';

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export const useA2HS = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false); // Android A2HS
  const [isIOSGuideVisible, setIsIOSGuideVisible] = useState(false); // iOS 가이드

  const isInstalled = () => {
    if (typeof window === 'undefined') return false;

    try {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      );
    } catch (e) {
      return false;
    }
  };

  const isIOS = () => {
    if (typeof window === 'undefined') return false;
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent.toLowerCase());
  };

  const isSafari = () => {
    if (typeof window === 'undefined') return false;
    return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent.toLowerCase());
  };

  const isInStandaloneMode = () => {
    if (typeof window === 'undefined') return false;
    return 'standalone' in window.navigator && (window.navigator as any).standalone;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isInstalled()) return;

    const now = Date.now();

    // Android: beforeinstallprompt
    let hideUntil = 0;
    try {
      hideUntil = Number(localStorage.getItem(LOCALSTORAGE_KEY));
    } catch (e) {
      console.warn('localStorage not available (Android hideUntil):', e);
    }

    if (!hideUntil || now > hideUntil) {
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setIsVisible(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }

    // iOS: 홈화면 설치 유도 가이드
    let iosHideUntil = 0;
    try {
      iosHideUntil = Number(localStorage.getItem(IOS_GUIDE_KEY));
    } catch (e) {
      console.warn('localStorage not available (iOS hideUntil):', e);
    }

    if (isIOS() && isSafari() && !isInStandaloneMode() && (!iosHideUntil || now > iosHideUntil)) {
      setIsIOSGuideVisible(true);
    }
  }, []);

  // Android 설치 진행
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
    try {
      const threeDaysLater = Date.now() + 3 * 24 * 60 * 60 * 1000;
      localStorage.setItem(LOCALSTORAGE_KEY, `${threeDaysLater}`);
    } catch (e) {
      console.warn('Error during cancel:', e);
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const cancelIOSGuide = () => {
    try {
      const threeDaysLater = Date.now() + 3 * 24 * 60 * 60 * 1000;
      localStorage.setItem(IOS_GUIDE_KEY, `${threeDaysLater}`);
    } catch (e) {
      console.warn('Error during cancelIOSGuide:', e);
    }

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
