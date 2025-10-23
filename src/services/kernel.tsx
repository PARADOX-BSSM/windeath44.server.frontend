import { useEffect, useState } from 'react';
import Booting from '@/services/booting/index.tsx';
import WindowManager from './windowManager/index.tsx';
import MobileConnect from '@/services/MobileConnect';
import Caution from '@/services/spoiler-caution';

const SESSION_KEY = 'hasBootedSession';

function Kernel() {
  const [isBooting, setIsBooting] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY) !== 'true';
  });
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof navigator === 'undefined') return false;
    return /Mobi|Android|iPhone|iPad|iPod|Tablet/i.test(navigator.userAgent);
  });
  const [isCaution, setIsCaution] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) !== 'true';
  });
  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    setIsMobile(/Mobi|Android|iPhone|iPad|iPod|Tablet/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = '16px';
  }, []);

  useEffect(() => {
    if (isBooting) {
      const id = window.setTimeout(() => {
        setIsBooting(false);
      }, 3300);
      return () => clearTimeout(id);
    }
  }, [isBooting]);

  if (isMobile) {
    return <MobileConnect />;
  }
  if (isBooting) {
    return <Booting />;
  }
  if (isCaution) {
    return <Caution setIsCaution={setIsCaution} />;
  }
  return (
    <div className="kernel">
      <WindowManager />
    </div>
  );
}

export default Kernel;
