// import { useEffect, useState } from 'react';
// import Booting from '@/services/booting/index.tsx';
// import WindowManager from './windowManager/index.tsx';
//
// const SESSION_KEY = 'hasBootedSession';

import ErrorPage from '@/services/MobileConnect';

function Kernel() {
  // const [isBooting, setIsBooting] = useState(() => {
  //   return sessionStorage.getItem(SESSION_KEY) !== 'true';
  // });
  //
  // useEffect(() => {
  //   const px = 16;
  //   if (px > 0) {
  //     document.documentElement.style.fontSize = `${px}px`;
  //   }
  // }, []);
  //
  // useEffect(() => {
  //   if (isBooting) {
  //     const id = window.setTimeout(() => {
  //       sessionStorage.setItem(SESSION_KEY, 'true'); // 세션 동안만 유지
  //       setIsBooting(false);
  //     }, 2700);
  //     return () => clearTimeout(id);
  //   }
  // }, [isBooting]);
  //
  // if (isBooting) {
  //   return <Booting />;
  // }

  return (
    <div className="kernel">
      {/*<WindowManager />*/}
      <ErrorPage />
    </div>
  );
}

export default Kernel;
