import { useState } from 'react';
import type { PositionType, SizeType } from '@/modules/typeModule';

export const useIcon = () => {
  const [position, setPosition] = useState<PositionType>({ x: 0, y: 0 });
  const [positionOffset, setPositionOffset] = useState<PositionType>({ x: 0, y: 0 });

  return {
    position,
    setPosition,
    positionOffset,
    setPositionOffset,
  };
};
