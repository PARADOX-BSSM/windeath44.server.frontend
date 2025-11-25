import { useDrag } from "react-use-gesture";
import { CURSOR_IMAGES, setCursorImage } from "@/lib/setCursorImg";
import * as _ from "@/applications/discover/style";
import { useAtom } from 'jotai';
import { updateIconPositionAtom, CELL_W, CELL_H, Position } from '@/atoms/gridManager'; 
import React, { useState, forwardRef } from "react";

type Props = {
  appId: string;
  position: Position;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: Function;
  className?: string;
  isSelected?: boolean;
};

export const IconContainer = forwardRef<HTMLDivElement, Props>(({
  position,
  children,
  className,
  onDoubleClick,
  appId,
  isSelected,
  onClick
}, ref) => {
  const [positionOffset, setPositionOffset] = useState<Position>({ x: 0, y: 0 });
  const [, updateIconPosition] = useAtom(updateIconPositionAtom);

  const bind = useDrag(({ xy: [x, y], initial: [ix, iy], last }) => {
    const container = document.querySelector(".discover"); 
    if (!container) return;

    const bounds = container.getBoundingClientRect();

    const constrainedX = Math.max(bounds.left, Math.min(bounds.right, x));
    const constrainedY = Math.max(bounds.top, Math.min(bounds.bottom, y));

    const mx = constrainedX - ix;
    const my = constrainedY - iy;

    const currentLeft = position.x * CELL_W;
    const currentTop = position.y * CELL_H;

    const newLeft = currentLeft + mx;
    const newTop = currentTop + my;

    if (last) {
      const snappedX = Math.round(newLeft / CELL_W);
      const snappedY = Math.round(newTop / CELL_H);
      updateIconPosition({ id: appId, newPosition: { x: snappedX, y: snappedY } });
      setPositionOffset({ x: 0, y: 0 });
    } else {
      setPositionOffset({
        x: (newLeft - currentLeft) / CELL_W, 
        y: (newTop - currentTop) / CELL_H,
      });
    }
  }, {
    onDragStart: () => setPositionOffset({ x: 0, y: 0 })
  });

  const renderLeft = (position.x + positionOffset.x) * CELL_W;
  const renderTop = (position.y + positionOffset.y) * CELL_H;

  return (
    <_.AppContainer
      {...bind()}
      isSelected={isSelected}
      className={`draggable ${className}`}
      style={{
        position: "absolute",
        left: renderLeft,
        top: renderTop,
        zIndex: 0,
      }}
      onClick={onClick}
      onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag_move)}
      onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
      onDoubleClick={() => onDoubleClick?.()}
      ref={ref} // 이제 forwardRef로 전달됨
    >
      {children}
    </_.AppContainer>
  );
});

IconContainer.displayName = "IconContainer";
