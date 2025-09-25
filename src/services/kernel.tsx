import { useEffect, useState } from 'react';
import Booting from '@/services/booting/index.tsx';
import WindowManager from './windowManager/index.tsx';
import MobileConnect from '@/services/MobileConnect';

const SESSION_KEY = 'hasBootedSession';

function Kernel() {
  const [isBooting, setIsBooting] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) !== 'true';
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|Tablet/i;
    setIsMobile(mobileRegex.test(ua));
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = '16px';
  }, []);

  useEffect(() => {
    if (isBooting) {
      const id = window.setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setIsBooting(false);
      }, 2700);
      return () => clearTimeout(id);
    }
  }, [isBooting]);

  if (isMobile) {
    return <MobileConnect />;
  }

  if (isBooting) {
    return <Booting />;
  }

  return (
    <div className="kernel">
      <WindowManager />
    </div>
  );
}

export default Kernel;
