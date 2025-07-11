import { getPixelFromPercent } from '@/lib/getPixelFromPercent.tsx';
import WindowManager from './windowManager/index.tsx';

function Kernel() {
  //작업 관리를 위한 메니저 호출

  const px = getPixelFromPercent("width", 1.75);
  if (px > 0) {
    document.documentElement.style.fontSize = `${px}px`;
  }

  return (
    <div className="kernel">
      <WindowManager />
    </div>
  )
}

export default Kernel;
