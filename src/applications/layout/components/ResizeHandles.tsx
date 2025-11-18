import React from 'react';
import { useDrag } from 'react-use-gesture';
import * as _ from '../style';
import type { useUI } from '../hooks/useUI';
import { setCursorImage, CURSOR_IMAGES } from '@/lib/setCursorImg';
import { isNotClickAtom } from '@/atoms/cursorState';
import { useAtom } from 'jotai';

type Props = ReturnType<typeof useUI>;

export const Bottom: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ xy: [x, y], initial: [ix, iy], last }) => {
    const container = document.getElementById('cursorContainer');
    if (!container) return;
    const bounds = container.getBoundingClientRect();

    // 가상 커서와 동일한 경계 제한 적용
    const constrainedY = Math.max(bounds.top, Math.min(bounds.bottom, y));

    // 제한된 movement 계산
    const my = constrainedY - iy;

    if (last) {
      // 드래그 끝: 최종 크기 적용
      setSize((size) => ({ width: size.width, height: size.height + my / 16 }));
      setSizeOffset({ width: 0, height: 0 });
    } else {
      // 드래그 중: offset 업데이트
      setSizeOffset({ width: 0, height: my / 16 });
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

    // movement는 드래그 시작점부터의 누적 이동량
    const newLeft = position.x * 16 + mx;
    const newWidth = size.width * 16 - mx;

    // 좌우 경계 제한
    const minLeft = -newWidth + 100;
    const maxLeft = globalThis.innerWidth - 100;
    const constrainedLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));

    // 제한된 위치로부터 역산한 크기
    const constrainedWidth = size.width * 16 - (constrainedLeft - position.x * 16);

    if (last) {
      // 드래그 끝: 최종 위치와 크기 적용
      setPosition({ x: constrainedLeft / 16, y: position.y });
      setSize({ width: constrainedWidth / 16, height: size.height + my / 16 });
      setPositionOffset({ x: 0, y: 0 });
      setSizeOffset({ width: 0, height: 0 });
    } else {
      // 드래그 중: offset만 업데이트
      setPositionOffset({ x: (constrainedLeft - position.x * 16) / 16, y: 0 });
      setSizeOffset({ width: (constrainedWidth - size.width * 16) / 16, height: my / 16 });
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
}) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ xy: [x, y], initial: [ix, iy], last }) => {
    const container = document.getElementById('cursorContainer');
    if (!container) return;
    const bounds = container.getBoundingClientRect();

    // 가상 커서와 동일한 경계 제한 적용
    const constrainedX = Math.max(bounds.left, Math.min(bounds.right, x));

    // 제한된 movement 계산
    const mx = constrainedX - ix;

    // movement는 드래그 시작점부터의 누적 이동량
    const newLeft = position.x * 16 + mx;
    const newWidth = size.width * 16 - mx;

    // 좌우 경계 제한
    const minLeft = -newWidth + 100;
    const maxLeft = globalThis.innerWidth - 100;
    const constrainedLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));

    // 제한된 위치로부터 역산한 크기
    const constrainedWidth = size.width * 16 - (constrainedLeft - position.x * 16);

    if (last) {
      // 드래그 끝: 최종 위치와 크기 적용
      setPosition({ x: constrainedLeft / 16, y: position.y });
      setSize({ width: constrainedWidth / 16, height: size.height });
      setSizeOffset({ width: 0, height: 0 });
      setPositionOffset({ x: 0, y: 0 });
    } else {
      // 드래그 중: offset만 업데이트
      setPositionOffset({ x: (constrainedLeft - position.x * 16) / 16, y: 0 });
      setSizeOffset({ width: (constrainedWidth - size.width * 16) / 16, height: 0 });
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

    // 오른쪽 리사이즈: 위치는 고정, 크기만 증가
    const newWidth = size.width * 16 + mx;

    // 오른쪽 경계 제한 (창의 오른쪽 끝이 화면을 넘지 않도록)
    const rightEdge = position.x * 16 + newWidth;
    const maxRight = globalThis.innerWidth - 100; // 100px 여유

    let constrainedWidth = newWidth;
    if (rightEdge > maxRight) {
      constrainedWidth = maxRight - position.x * 16;
    }

    if (last) {
      // 드래그 끝: 최종 크기 적용
      setSize({ width: constrainedWidth / 16, height: size.height + my / 16 });
      setSizeOffset({ width: 0, height: 0 });
    } else {
      // 드래그 중: offset만 업데이트
      setSizeOffset({ width: (constrainedWidth - size.width * 16) / 16, height: my / 16 });
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
}) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ xy: [x, y], initial: [ix, iy], last }) => {
    const container = document.getElementById('cursorContainer');
    if (!container) return;
    const bounds = container.getBoundingClientRect();

    // 가상 커서와 동일한 경계 제한 적용
    const constrainedX = Math.max(bounds.left, Math.min(bounds.right, x));

    // 제한된 movement 계산
    const mx = constrainedX - ix;

    // 오른쪽 리사이즈: 위치는 고정, 크기만 증가
    const newWidth = size.width * 16 + mx;

    // 오른쪽 경계 제한 (창의 오른쪽 끝이 화면을 넘지 않도록)
    const rightEdge = position.x * 16 + newWidth;
    const maxRight = globalThis.innerWidth - 100; // 100px 여유

    let constrainedWidth = newWidth;
    if (rightEdge > maxRight) {
      constrainedWidth = maxRight - position.x * 16;
    }

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
