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

  const bind = useDrag(({ movement: [, my], last }) => {
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

export const Header: React.FC<Props & { title?: string; children?: React.ReactNode }> = ({
  setPosition,
  setPositionOffset,
  title,
  children,
}) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ movement: [mx, my], last }) => {
    if (last) {
      // 드래그 끝: 최종 위치 적용
      setPosition((pos) => ({ x: pos.x + mx / 16, y: pos.y + my / 16 }));
      setPositionOffset({ x: 0, y: 0 });
    } else {
      // 드래그 중: offset 업데이트
      setPositionOffset({ x: mx / 16, y: my / 16 });
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
}) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ movement: [mx, my], last }) => {
    if (last) {
      // 드래그 끝: 최종 위치와 크기 적용
      setPosition((position) => ({ x: position.x + mx / 16, y: position.y }));
      setSize((size) => ({ width: size.width - mx / 16, height: size.height + my / 16 }));
      setPositionOffset({ x: 0, y: 0 });
      setSizeOffset({ width: 0, height: 0 });
    } else {
      // 드래그 중: offset 업데이트
      setPositionOffset({ x: mx / 16, y: 0 });
      setSizeOffset({ width: -(mx / 16), height: my / 16 });
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
}) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ movement: [mx], last }) => {
    if (last) {
      // 드래그 끝: 최종 위치와 크기 적용
      setSize((size) => ({ width: size.width - mx / 16, height: size.height }));
      setPosition((position) => ({ x: position.x + mx / 16, y: position.y }));
      setSizeOffset({ width: 0, height: 0 });
      setPositionOffset({ x: 0, y: 0 });
    } else {
      // 드래그 중: offset 업데이트
      setSizeOffset({ width: -(mx / 16), height: 0 });
      setPositionOffset({ x: mx / 16, y: 0 });
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

export const RightCorner: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ movement: [mx, my], last }) => {
    if (last) {
      // 드래그 끝: 최종 크기 적용
      setSize((size) => ({ width: size.width + mx / 16, height: size.height + my / 16 }));
      setSizeOffset({ width: 0, height: 0 });
    } else {
      // 드래그 중: offset 업데이트
      setSizeOffset({ width: mx / 16, height: my / 16 });
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

export const RightSide: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const [isNotClick, setIsNotClick] = useAtom(isNotClickAtom);

  const bind = useDrag(({ movement: [mx], last }) => {
    if (last) {
      // 드래그 끝: 최종 크기 적용
      setSize((size) => ({ width: size.width + mx / 16, height: size.height }));
      setSizeOffset({ width: 0, height: 0 });
    } else {
      // 드래그 중: offset 업데이트
      setSizeOffset({ width: mx / 16, height: 0 });
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
