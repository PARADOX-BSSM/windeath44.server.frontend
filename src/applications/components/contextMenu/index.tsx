import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { useNativeContextMenuAtom } from '@/atoms/cursorState';
import * as _ from './style';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  isInputElement: boolean;
  isAppButton?: boolean;
  targetElement: HTMLElement | null;
}

const ContextMenu = ({
  x,
  y,
  onClose,
  isInputElement,
  isAppButton,
  targetElement,
}: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const setUseNativeContextMenu = useSetAtom(useNativeContextMenuAtom);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBack = () => {
    window.history.back();
    onClose();
  };

  const handleForward = () => {
    window.history.forward();
    onClose();
  };

  const handleRefresh = () => {
    window.location.reload();
    onClose();
  };

  const handleNativeMenu = () => {
    setUseNativeContextMenu(true);
    onClose();
  };

  const handleCopy = async () => {
    try {
      const element = targetElement as HTMLInputElement | HTMLTextAreaElement;
      if (element && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')) {
        const selectedText = element.value.substring(
          element.selectionStart || 0,
          element.selectionEnd || 0,
        );
        if (selectedText) {
          await navigator.clipboard.writeText(selectedText);
          console.log('복사됨:', selectedText);
        } else {
          // 선택된 텍스트가 없으면 전체 복사
          await navigator.clipboard.writeText(element.value);
          console.log('전체 복사됨:', element.value);
        }
      }
    } catch (err) {
      console.error('복사 실패:', err);
    }
    onClose();
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const element = targetElement as HTMLInputElement | HTMLTextAreaElement;
      if (element && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')) {
        // 포커스 복원
        element.focus();

        const start = element.selectionStart || 0;
        const end = element.selectionEnd || 0;
        const currentValue = element.value;

        // 선택된 부분을 클립보드 내용으로 대체
        const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
        element.value = newValue;

        // 커서 위치 업데이트
        const newCursorPos = start + text.length;
        element.setSelectionRange(newCursorPos, newCursorPos);

        // input 이벤트 발생시켜서 React state 동기화
        const event = new Event('input', { bubbles: true });
        element.dispatchEvent(event);

        console.log('붙여넣기됨:', text);
      }
    } catch (err) {
      console.error('붙여넣기 실패:', err);
    }
    onClose();
  };

  return (
    <_.MenuContainer
      ref={menuRef}
      x={x}
      y={y}
    >
      {/* {isAppButton && (
        <>
          <_.MenuItem
            onClick={() => {
              (targetElement as HTMLElement)?.click();
              onClose();
            }}
          >
            열기
          </_.MenuItem>

          <_.MenuSeparator />
        </>
      )} */}
      <_.MenuItem onClick={handleBack}>뒤로</_.MenuItem>
      <_.MenuItem onClick={handleForward}>앞으로</_.MenuItem>
      <_.MenuItem onClick={handleRefresh}>새로고침</_.MenuItem>

      <_.MenuSeparator />

      <_.MenuItem onClick={handleNativeMenu}>네이티브 우클릭 UI</_.MenuItem>

      {isInputElement && (
        <>
          <_.MenuSeparator />
          <_.MenuItem onClick={handleCopy}>복사</_.MenuItem>
          <_.MenuItem onClick={handlePaste}>붙여넣기</_.MenuItem>
        </>
      )}
    </_.MenuContainer>
  );
};

export default ContextMenu;
