import React, { useCallback } from 'react';
import { useDrag } from 'react-use-drag';
import * as _ from '../style';
import type { useUI } from '../hooks/useUI';

type Props = ReturnType<typeof useUI>;

export const Bottom: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const onRelativePositionChange = useCallback(
    (_x: number, y: number) => setSizeOffset({ width: 0, height: y / 16 }),
    [setSizeOffset],
  );
  const onEnd = useCallback(
    (_x: number, y: number) => {
      setSize((size) => ({ width: size.width, height: size.height + y / 16 }));
      setSizeOffset({ width: 0, height: 0 });
    },
    [setSize, setSizeOffset],
  );
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return (
    <_.BottomContainer
      className="draggable"
      {...elementProps}
    />
  );
};

export const Header: React.FC<Props & { title?: string; children?: React.ReactNode }> = ({
  setPosition,
  setPositionOffset,
  title,
  children,
}) => {
  const onRelativePositionChange = useCallback(
    (x: number, y: number) => setPositionOffset({ x: x / 16, y: y / 16 }),
    [setPositionOffset],
  );
  const onEnd = useCallback(
    (x: number, y: number) => {
      setPosition((pos) => ({ x: pos.x + x / 16, y: pos.y + y / 16 }));
      setPositionOffset({ x: 0, y: 0 });
    },
    [setPosition, setPositionOffset],
  );
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return (
    <_.HeaderContainer
      className="draggable"
      {...elementProps}
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
  const onRelativePositionChange = useCallback(
    (x: number, y: number) => {
      setPositionOffset({ x: x / 16, y: 0 });
      setSizeOffset({ width: -(x / 16), height: y / 16 });
    },
    [setPositionOffset, setSizeOffset],
  );
  const onEnd = useCallback(
    (x: number, y: number) => {
      setPosition((position) => ({ x: position.x + x / 16, y: position.y }));
      setSize((size) => ({ width: size.width - x / 16, height: size.height + y / 16 }));
      setPositionOffset({ x: 0, y: 0 });
      setSizeOffset({ width: 0, height: 0 });
    },
    [setPosition, setSize, setPositionOffset, setSizeOffset],
  );
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return (
    <_.LeftCornerContainer
      className="draggable"
      {...elementProps}
      style={{ left: 0 }}
    />
  );
};

export const LeftSide: React.FC<Props> = ({
  setPosition,
  setPositionOffset,
  setSize,
  setSizeOffset,
}) => {
  const onRelativePositionChange = useCallback(
    (x: number) => {
      setSizeOffset({ width: -(x / 16), height: 0 });
      setPositionOffset({ x: x / 16, y: 0 });
    },
    [setSizeOffset, setPositionOffset],
  );
  const onEnd = useCallback(
    (x: number) => {
      setSize((size) => ({ width: size.width - x / 16, height: size.height }));
      setPosition((position) => ({ x: position.x + x / 16, y: position.y }));
      setSizeOffset({ width: 0, height: 0 });
      setPositionOffset({ x: 0, y: 0 });
    },
    [setSize, setPosition, setSizeOffset, setPositionOffset],
  );
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return (
    <_.SideContainer
      className="draggable"
      {...elementProps}
      style={{ left: 0 }}
    />
  );
};

export const RightCorner: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const onRelativePositionChange = useCallback(
    (x: number, y: number) => {
      setSizeOffset({ width: x / 16, height: y / 16 });
    },
    [setSizeOffset],
  );
  const onEnd = useCallback(
    (x: number, y: number) => {
      setSize((size) => ({ width: size.width + x / 16, height: size.height + y / 16 }));
      setSizeOffset({ width: 0, height: 0 });
    },
    [setSize, setSizeOffset],
  );
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return (
    <_.RightCornerContainer
      className="draggable"
      {...elementProps}
      style={{ right: 0 }}
    />
  );
};

export const RightSide: React.FC<Props> = ({ setSize, setSizeOffset }) => {
  const onRelativePositionChange = useCallback(
    (x: number) => setSizeOffset({ width: x / 16, height: 0 }),
    [setSizeOffset],
  );
  const onEnd = useCallback(
    (x: number) => {
      setSize((size) => ({ width: size.width + x / 16, height: size.height }));
      setSizeOffset({ width: 0, height: 0 });
    },
    [setSize, setSizeOffset],
  );
  const { elementProps } = useDrag({ onRelativePositionChange, onEnd });
  return (
    <_.SideContainer
      className="draggable"
      {...elementProps}
      style={{ right: 0 }}
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
