import React from 'react';
import { useDrag } from 'react-use-gesture';
import * as _ from '../style';
import type { useUI } from '../hooks/useUI';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { isNotClickAtom } from '@/atoms/cursorState';
import { useAtom } from 'jotai';

type Props = ReturnType<typeof useUI> & {
  minWidth?: number;
  minHeight?: number;
};

export const Bottom: React.FC<Props> = ({ setSize, setSizeOffset, size, minHeight }) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ xy: [, y], initial: [, iy], last }) => {
    const container = document.getElementById('cursorContainer');
    if (!container) return;
    const bounds = container.getBoundingClientRect();

    // 가상 커서와 동일한 경계 제한 적용
    const constrainedY = Math.max(bounds.top, Math.min(bounds.bottom, y));

    // 제한된 movement 계산
    const my = constrainedY - iy;

    // 최소 높이
    const minH = minHeight ? minHeight / 16 : 10;

    // 새로운 높이 계산
    const newHeight = size.height + my / 16;
    const constrainedHeight = Math.max(minH, newHeight);

    if (last) {
      // 드래그 끝: 최종 크기 적용
      setSize({
        width: size.width,
        height: constrainedHeight,
      });
      setSizeOffset({ width: 0, height: 0 });
    } else {
      // 드래그 중: offset 업데이트 (최소 높이 고려)
      setSizeOffset({ width: 0, height: constrainedHeight - size.height });
    }
  });

  return (
    <_.BottomContainer
      className="draggable"
      {...bind()}
      onMouseEnter={() => {
        setCursorImage(CURSOR_IMAGES.drag_vertical);
        setIsNotClick(true);
      }}
      onMouseLeave={() => {
        setCursorImage(CURSOR_IMAGES.default);
        setIsNotClick(false);
      }}
    />
  );
};

export const Header: React.FC<
  Props & { title?: string; children?: React.ReactNode; onDoubleClick?: Function }
> = ({
  setPosition,
  setPositionOffset,
  position,
  size,
  positionOffset,
  sizeOffset,
  title,
  children,
  onDoubleClick,
}) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ xy: [x, y], initial: [ix, iy], last }) => {
    const container = document.getElementById('cursorContainer');
    if (!container) return;
    const bounds = container.getBoundingClientRect();

    // 가상 커서와 동일한 경계 제한 적용
    const constrainedX = Math.max(bounds.left, Math.min(bounds.right, x));
    const constrainedY = Math.max(bounds.top, Math.min(bounds.bottom, y));

    // 제한된 movement 계산
    const mx = constrainedX - ix;
    const my = constrainedY - iy;

    // movement를 기반으로 새로운 위치 계산
    const newLeft = position.x * 16 + mx;
    const newTop = position.y * 16 + my;

    // 화면 경계 제한
    const minTop = 0;
    const maxTop = globalThis.innerHeight - 90; // 하단 경계
    const minLeft = -(size.width * 16) + 100; // 좌측 경계 (100px은 보이도록)
    const maxLeft = globalThis.innerWidth - 100; // 우측 경계

    // 경계 내로 제한
    const constrainedTop = Math.max(minTop, Math.min(maxTop, newTop));
    const constrainedLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));

    if (last) {
      // 드래그 끝: 최종 위치 적용
      setPosition({ x: constrainedLeft / 16, y: constrainedTop / 16 });
      setPositionOffset({ x: 0, y: 0 });
    } else {
      // 드래그 중: offset만 업데이트
      setPositionOffset({
        x: (constrainedLeft - position.x * 16) / 16,
        y: (constrainedTop - position.y * 16) / 16,
      });
    }
  });

  return (
    <_.HeaderContainer
      className="draggable"
      {...bind()}
      onMouseEnter={() => {
        setCursorImage(CURSOR_IMAGES.drag_move);
        setIsNotClick(true);
      }}
      onMouseLeave={() => {
        setCursorImage(CURSOR_IMAGES.default);
        setIsNotClick(false);
      }}
      onDoubleClick={() => {
        if (onDoubleClick) onDoubleClick();
      }}
    >
      {children || title}
    </_.HeaderContainer>
  );
};

export const LeftCorner: React.FC<Props> = ({
  setPosition,
  setPositionOffset,
  setSize,
  setSizeOffset,
  position,
  size,
  positionOffset,
  sizeOffset,
  minWidth,
  minHeight,
}) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ xy: [x, y], initial: [ix, iy], last }) => {
    const container = document.getElementById('cursorContainer');
    if (!container) return;
    const bounds = container.getBoundingClientRect();

    // 가상 커서와 동일한 경계 제한 적용
    const constrainedX = Math.max(bounds.left, Math.min(bounds.right, x));
    const constrainedY = Math.max(bounds.top, Math.min(bounds.bottom, y));

    // 제한된 movement 계산
    const mx = constrainedX - ix;
    const my = constrainedY - iy;

    // 최소 크기
    const minW = minWidth ? minWidth / 16 : 20;
    const minH = minHeight ? minHeight / 16 : 10;

    // movement는 드래그 시작점부터의 누적 이동량
    const newLeft = position.x * 16 + mx;
    const newWidth = size.width * 16 - mx;

    // 좌우 경계 제한
    const minLeft = -newWidth + 100;
    const maxLeft = globalThis.innerWidth - 100;
    const constrainedLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));

    // 제한된 위치로부터 역산한 크기
    let constrainedWidth = size.width * 16 - (constrainedLeft - position.x * 16);

    // 최소 너비 제한
    if (constrainedWidth < minW * 16) {
      constrainedWidth = minW * 16;
    }

    // 높이 계산 (최소 높이 적용)
    const newHeight = size.height + my / 16;
    const constrainedHeight = Math.max(minH, newHeight);

    if (last) {
      // 드래그 끝: 최종 위치와 크기 적용
      // 최소 너비 제한으로 인해 위치도 조정 필요
      const finalLeft =
        constrainedWidth === minW * 16
          ? position.x + size.width - minW
          : constrainedLeft / 16;
      setPosition({ x: finalLeft, y: position.y });
      setSize({
        width: constrainedWidth / 16,
        height: constrainedHeight,
      });
      setPositionOffset({ x: 0, y: 0 });
      setSizeOffset({ width: 0, height: 0 });
    } else {
      // 드래그 중: offset만 업데이트
      const finalLeft =
        constrainedWidth === minW * 16 ? position.x + size.width - minW : constrainedLeft / 16;
      setPositionOffset({ x: finalLeft - position.x, y: 0 });
      setSizeOffset({ width: constrainedWidth / 16 - size.width, height: constrainedHeight - size.height });
    }
  });

  return (
    <_.LeftCornerContainer
      className="draggable"
      {...bind()}
      style={{ left: 0 }}
      onMouseEnter={() => {
        setCursorImage(CURSOR_IMAGES.drag_45);
        setIsNotClick(true);
      }}
      onMouseLeave={() => {
        setCursorImage(CURSOR_IMAGES.default);
        setIsNotClick(false);
      }}
    />
  );
};

export const LeftSide: React.FC<Props> = ({
  setPosition,
  setPositionOffset,
  setSize,
  setSizeOffset,
  position,
  size,
  positionOffset,
  sizeOffset,
  minWidth,
}) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ xy: [x], initial: [ix], last }) => {
    const container = document.getElementById('cursorContainer');
    if (!container) return;
    const bounds = container.getBoundingClientRect();

    // 가상 커서와 동일한 경계 제한 적용
    const constrainedX = Math.max(bounds.left, Math.min(bounds.right, x));

    // 제한된 movement 계산
    const mx = constrainedX - ix;

    // 최소 크기
    const minW = minWidth ? minWidth / 16 : 20;

    // movement는 드래그 시작점부터의 누적 이동량
    const newLeft = position.x * 16 + mx;
    const newWidth = size.width * 16 - mx;

    // 좌우 경계 제한
    const minLeft = -newWidth + 100;
    const maxLeft = globalThis.innerWidth - 100;
    const constrainedLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));

    // 제한된 위치로부터 역산한 크기
    let constrainedWidth = size.width * 16 - (constrainedLeft - position.x * 16);

    // 최소 너비 제한
    if (constrainedWidth < minW * 16) {
      constrainedWidth = minW * 16;
    }

    if (last) {
      // 드래그 끝: 최종 위치와 크기 적용
      // 최소 너비 제한으로 인해 위치도 조정 필요
      const finalLeft =
        constrainedWidth === minW * 16
          ? position.x + size.width - minW
          : constrainedLeft / 16;
      setPosition({ x: finalLeft, y: position.y });
      setSize({ width: constrainedWidth / 16, height: size.height });
      setSizeOffset({ width: 0, height: 0 });
      setPositionOffset({ x: 0, y: 0 });
    } else {
      // 드래그 중: offset만 업데이트
      const finalLeft =
        constrainedWidth === minW * 16 ? position.x + size.width - minW : constrainedLeft / 16;
      setPositionOffset({ x: finalLeft - position.x, y: 0 });
      setSizeOffset({ width: constrainedWidth / 16 - size.width, height: 0 });
    }
  });

  return (
    <_.SideContainer
      className="draggable"
      {...bind()}
      style={{ left: 0 }}
      onMouseEnter={() => {
        setCursorImage(CURSOR_IMAGES.drag_horizontal);
        setIsNotClick(true);
      }}
      onMouseLeave={() => {
        setCursorImage(CURSOR_IMAGES.default);
        setIsNotClick(false);
      }}
    />
  );
};

export const RightCorner: React.FC<Props> = ({
  setPosition,
  setPositionOffset,
  setSize,
  setSizeOffset,
  position,
  size,
  positionOffset,
  sizeOffset,
  minWidth,
  minHeight,
}) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ xy: [x, y], initial: [ix, iy], last }) => {
    const container = document.getElementById('cursorContainer');
    if (!container) return;
    const bounds = container.getBoundingClientRect();

    // 가상 커서와 동일한 경계 제한 적용
    const constrainedX = Math.max(bounds.left, Math.min(bounds.right, x));
    const constrainedY = Math.max(bounds.top, Math.min(bounds.bottom, y));

    // 제한된 movement 계산
    const mx = constrainedX - ix;
    const my = constrainedY - iy;

    // 최소 크기
    const minW = minWidth ? minWidth / 16 : 20;
    const minH = minHeight ? minHeight / 16 : 10;

    // 오른쪽 리사이즈: 위치는 고정, 크기만 증가
    const newWidth = size.width * 16 + mx;

    // 오른쪽 경계 제한 (창의 오른쪽 끝이 화면을 넘지 않도록)
    const rightEdge = position.x * 16 + newWidth;
    const maxRight = globalThis.innerWidth - 100; // 100px 여유

    let constrainedWidth = newWidth;
    if (rightEdge > maxRight) {
      constrainedWidth = maxRight - position.x * 16;
    }

    // 최소 너비 제한
    constrainedWidth = Math.max(minW * 16, constrainedWidth);

    // 높이 계산 (최소 높이 적용)
    const newHeight = size.height + my / 16;
    const constrainedHeight = Math.max(minH, newHeight);

    if (last) {
      // 드래그 끝: 최종 크기 적용
      setSize({
        width: constrainedWidth / 16,
        height: constrainedHeight,
      });
      setSizeOffset({ width: 0, height: 0 });
    } else {
      // 드래그 중: offset만 업데이트
      setSizeOffset({ width: (constrainedWidth - size.width * 16) / 16, height: constrainedHeight - size.height });
    }
  });

  return (
    <_.RightCornerContainer
      className="draggable"
      {...bind()}
      style={{ right: 0 }}
      onMouseEnter={() => {
        setCursorImage(CURSOR_IMAGES.drag_135);
        setIsNotClick(true);
      }}
      onMouseLeave={() => {
        setCursorImage(CURSOR_IMAGES.default);
        setIsNotClick(false);
      }}
    />
  );
};

export const RightSide: React.FC<Props> = ({
  setPosition,
  setPositionOffset,
  setSize,
  setSizeOffset,
  position,
  size,
  positionOffset,
  sizeOffset,
  minWidth,
}) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ xy: [x], initial: [ix], last }) => {
    const container = document.getElementById('cursorContainer');
    if (!container) return;
    const bounds = container.getBoundingClientRect();

    // 가상 커서와 동일한 경계 제한 적용
    const constrainedX = Math.max(bounds.left, Math.min(bounds.right, x));

    // 제한된 movement 계산
    const mx = constrainedX - ix;

    // 최소 크기
    const minW = minWidth ? minWidth / 16 : 20;

    // 오른쪽 리사이즈: 위치는 고정, 크기만 증가
    const newWidth = size.width * 16 + mx;

    // 오른쪽 경계 제한 (창의 오른쪽 끝이 화면을 넘지 않도록)
    const rightEdge = position.x * 16 + newWidth;
    const maxRight = globalThis.innerWidth - 100; // 100px 여유

    let constrainedWidth = newWidth;
    if (rightEdge > maxRight) {
      constrainedWidth = maxRight - position.x * 16;
    }

    // 최소 너비 제한
    constrainedWidth = Math.max(minW * 16, constrainedWidth);

    if (last) {
      // 드래그 끝: 최종 크기 적용
      setSize({ width: constrainedWidth / 16, height: size.height });
      setSizeOffset({ width: 0, height: 0 });
    } else {
      // 드래그 중: offset만 업데이트
      setSizeOffset({ width: (constrainedWidth - size.width * 16) / 16, height: 0 });
    }
  });

  return (
    <_.SideContainer
      className="draggable"
      {...bind()}
      style={{ right: 0 }}
      onMouseEnter={() => {
        setCursorImage(CURSOR_IMAGES.drag_horizontal);
        setIsNotClick(true);
      }}
      onMouseLeave={() => {
        setCursorImage(CURSOR_IMAGES.default);
        setIsNotClick(false);
      }}
    />
  );
};

const Resize = {
  Bottom,
  Header,
  LeftCorner,
  LeftSide,
  RightCorner,
  RightSide,
};

export default Resize;
