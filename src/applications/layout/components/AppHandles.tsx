import { useDrag } from "react-use-gesture";
import { CURSOR_IMAGES, setCursorImage } from "@/lib/setCursorImg";
import * as _ from "@/applications/discover/style";
import React, { useState } from "react";
import { useAtom } from 'jotai';
import { updateIconPositionAtom, CELL_W, CELL_H, Position } from '@/atoms/gridManager'; 

type Props = {
  appId: string;
  position: Position;
  children?: React.ReactNode;
  onDoubleClick?: Function;
  className?: string;
};

export const IconContainer: React.FC<Props> = ({
  position,
  children,
  className,
  onDoubleClick,
  appId
}) => {
  // 로컬 상태: 드래그 중 임시 시각적 오프셋
  const [positionOffset, setPositionOffset] = useState<Position>({ x: 0, y: 0 });
  
  // Jotai 쓰기 전용 아톰: 위치 업데이트 로직 호출
  const [, updateIconPosition] = useAtom(updateIconPositionAtom);
  
  const bind = useDrag(({ xy: [x, y], initial: [ix, iy], last }) => {
    const container = document.querySelector(".discover"); 
    if (!container) return;

    const bounds = container.getBoundingClientRect();

    // 마우스 포인터가 컨테이너 경계를 벗어나지 않도록 제약
    const constrainedX = Math.max(bounds.left, Math.min(bounds.right, x));
    const constrainedY = Math.max(bounds.top, Math.min(bounds.bottom, y));

    const mx = constrainedX - ix;
    const my = constrainedY - iy;

    // 현재 그리드 위치를 기준으로 한 픽셀 좌표
    const currentLeft = position.x * CELL_W;
    const currentTop = position.y * CELL_H;

    // 드래그 중의 새 픽셀 위치
    const newLeft = currentLeft + mx;
    const newTop = currentTop + my;

    if (last) {
      // 드래그 종료: 그리드 위치로 스내핑
      const snappedX = Math.round(newLeft / CELL_W);
      const snappedY = Math.round(newTop / CELL_H);

      // Jotai 상태 업데이트 (충돌/경계 검사는 아톰에서 처리)
      updateIconPosition({ id: appId, newPosition: { x: snappedX, y: snappedY } });

      // 로컬 오프셋 0으로 리셋
      setPositionOffset({ x: 0, y: 0 });
    } else {
      // 드래그 중: 오프셋 업데이트
      setPositionOffset({
        x: (newLeft - currentLeft) / CELL_W, // 셀 단위의 상대적 오프셋
        y: (newTop - currentTop) / CELL_H,
      });
    }
  }, {
    // 드래그 시작 시 오프셋 초기화
    onDragStart: () => setPositionOffset({ x: 0, y: 0 })
  });

  // ⭐ 실제 렌더 위치: (그리드 위치 + 오프셋) * 셀 크기
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
        // 드래그가 끝났을 때만 스내핑 애니메이션 적용
        transition: positionOffset.x === 0 && positionOffset.y === 0 ? 'left 0.15s, top 0.15s' : 'none',
      }}
      onMouseEnter={() => setCursorImage(CURSOR_IMAGES.drag_move)}
      onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
      onDoubleClick={() => onDoubleClick?.()}
    >
      {children}
    </_.AppContainer>
  );
};