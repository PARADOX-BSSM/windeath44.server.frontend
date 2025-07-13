import { useEffect, useState } from 'react';
import Booting from '@/services/booting/index.tsx';
import WindowManager from './windowManager/index.tsx';
import { getPixelFromPercent } from '@/lib/getPixelFromPercent.tsx';

function Kernel() {
  const [isBooting, setIsBooting] = useState(() => {
    return localStorage.getItem('hasBooted') !== 'true';
  });

  useEffect(() => {
    const px = getPixelFromPercent('width', 1.75);
    if (px > 0) {
      document.documentElement.style.fontSize = `${px}px`;
    }
  }, []);

  useEffect(() => {
    // if (isBooting) {
    //   setTimeout(() => {
    //     localStorage.setItem('hasBooted', 'true');
    //     setIsBooting(false);
    //   }, 2000);
    // }
  }, [isBooting]);

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
