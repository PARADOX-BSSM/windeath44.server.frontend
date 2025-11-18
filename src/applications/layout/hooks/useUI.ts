import { useState } from 'react';
import type { PositionType, SizeType } from '@/modules/typeModule';

export const useUI = () => {
  const [position, setPosition] = useState<PositionType>({ x: 0, y: 0 });
  const [positionOffset, setPositionOffset] = useState<PositionType>({ x: 0, y: 0 });
  const [size, setSize] = useState<SizeType>({ width: 200, height: 200 });
  const [sizeOffset, setSizeOffset] = useState<SizeType>({ width: 0, height: 0 });

  return {
    position,
    setPosition,
    positionOffset,
    setPositionOffset,
    size,
    setSize,
    sizeOffset,
    setSizeOffset,
  };
};
