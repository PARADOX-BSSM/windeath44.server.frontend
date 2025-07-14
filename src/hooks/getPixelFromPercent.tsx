import { useEffect, useState } from 'react';

export const usePixelFromPercent = (
  direction: 'width' | 'height',
  percent: number,
  containerId: string = 'cursorContainer'
): number => {
  const [pixel, setPixel] = useState(0);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`[usePixelFromPercent] element with id "${containerId}" not found.`);
      return;
    }

    if (percent < 0 || percent > 100) {
      console.warn(`[usePixelFromPercent] Invalid percent value: ${percent}. Expected 0-100.`);
      return;
    }

    const computed = window.getComputedStyle(container);
    const size =
      direction === 'width'
        ? parseFloat(computed.width)
        : parseFloat(computed.height);

    setPixel(size * (percent / 100));
  }, [direction, percent, containerId]);

  return pixel;
};