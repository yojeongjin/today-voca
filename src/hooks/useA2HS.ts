import { useEffect, useState } from 'react';

const LOCALSTORAGE_KEY = 'kong_hide_a2hs_until';
const IOS_GUIDE_KEY = 'kong_ios_install_guide_hide_until';

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const getUserAgent = (): string => {
  if (typeof window === 'undefined' || !window.navigator) return '';
  return window.navigator.userAgent?.toLowerCase?.() || '';
};

const getPlatform = (): string => {
  if (typeof window === 'undefined' || !window.navigator) return '';
  return window.navigator.platform || '';
};

const isIOS = (): boolean => {
  const ua = getUserAgent();
  const platform = getPlatform();
  return /iphone|ipad|ipod/.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

const isSafari = (): boolean => {
  const ua = getUserAgent();
  return (
    ua.includes('safari') &&
    !ua.includes('crios') &&
    !ua.includes('fxios') &&
    !ua.includes('edgios') &&
    !ua.includes('opr') &&
    !ua.includes('chrome')
  );
};

const isAndroidChrome = (): boolean => {
  const ua = getUserAgent();
  return ua.includes('android') && ua.includes('chrome') && !ua.includes('crios');
};

const isInStandaloneMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia?.('(display-mode: standalone)')?.matches ||
    (window.navigator as any)?.standalone === true
  );
};

export const useA2HS = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false); // Android A2HS
  const [isIOSGuideVisible, setIsIOSGuideVisible] = useState(false); // iOS 가이드

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isInStandaloneMode()) return;

    const now = Date.now();

    // Android Chrome A2HS
    if (isAndroidChrome()) {
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
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }

    // iOS Safari 가이드
    try {
      const iosHideUntil = Number(localStorage.getItem(IOS_GUIDE_KEY));
      if (
        !isVisible &&
        isIOS() &&
        isSafari() &&
        !isInStandaloneMode() &&
        (!iosHideUntil || now > iosHideUntil)
      ) {
        setIsIOSGuideVisible(true);
      }
    } catch (e) {
      console.warn('localStorage error for iOS Guide:', e);
      if (!isVisible && isIOS() && isSafari() && !isInStandaloneMode()) {
        setIsIOSGuideVisible(true);
      }
    }
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
