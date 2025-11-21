import { useDrag } from "react-use-gesture";
import { CURSOR_IMAGES, setCursorImage } from "@/lib/setCursorImg";
import * as _ from "@/applications/discover/style";
import React from "react";
import { useIcon } from "../hooks/useIcon";

type Props = ReturnType<typeof useIcon> & {
  children?: React.ReactNode;
  onDoubleClick?: Function;
  className?: string;
};

export const IconContainer: React.FC<Props> = ({
  position,
  positionOffset,
  setPosition,
  setPositionOffset,
  children,
  className,
  onDoubleClick
}) => {
  const GRID_WIDTH = 5 * 16;
  const GRID_HEIGHT = 6 * 16;
  const GRID_GAP = 1 * 16;

  const CELL_W = GRID_WIDTH + GRID_GAP;
  const CELL_H = GRID_HEIGHT + GRID_GAP;

  const bind = useDrag(({ xy: [x, y], initial: [ix, iy], last }) => {
    const container = document.querySelector(".shell");
    if (!container) return;

    const bounds = container.getBoundingClientRect();

    const constrainedX = Math.max(bounds.left, Math.min(bounds.right, x));
    const constrainedY = Math.max(bounds.top, Math.min(bounds.bottom, y));

    const mx = constrainedX - ix;
    const my = constrainedY - iy;

    const newLeft = position.x * CELL_W + mx;
    const newTop = position.y * CELL_H + my;

    if (last) {
      const snappedX = Math.round(newLeft / CELL_W);
      const snappedY = Math.round(newTop / CELL_H);

      setPosition({ x: snappedX, y: snappedY });
      setPositionOffset({ x: 0, y: 0 });
    } else {
      setPositionOffset({
        x: (newLeft - position.x * CELL_W) / CELL_W,
        y: (newTop - position.y * CELL_H) / CELL_H,
      });
    }
  });

  // ⭐ 실제 렌더 위치
  const renderLeft = (position.x + positionOffset.x) * CELL_W;
  const renderTop = (position.y + positionOffset.y) * CELL_H;

  return (
    <_.AppContainer
      {...bind()}
      className={`draggable ${className}`}
      style={{
        position: "absolute",
        left: renderLeft,
        top: renderTop,
        zIndex: 0,
      }}
      onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag_move)}
      onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
      onDoubleClick={() => onDoubleClick?.()}
    >
      {children}
    </_.AppContainer>
  );
};
