import { useAtom, useAtomValue } from 'jotai';
import { virtualDesktopIndexAtom, virtualTaskListsAtom, virtualWindowPositionsAtom } from '@/atoms/processManager';
import { alerterAtom } from '@/atoms/alerter';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useEffect, useState } from 'react';


export const useVirtualDesktopManager = () => {
  const [isMaxError, setIsMaxError] = useState(false);
  const [isMinError, setIsMinError] = useState(false);
  const [desktopIndex, setDesktopIndex] = useAtom(virtualDesktopIndexAtom);
  const [virtualTaskLists, setVirtualTaskLists] = useAtom(virtualTaskListsAtom);
  const [virtualWindowPositions, setVirtualWindowPositions] = useAtom(virtualWindowPositionsAtom);
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);

  const virtualDesktopList = virtualTaskLists?.map((_, i) => i) || [0];
  const virtualCurrentDesktop = desktopIndex || 0;

  const switchVirtualDesktop = (id: number) => setDesktopIndex(id);

  useEffect(()=>{
    if(!isMaxError) return;
    setAlert?.(
      Seori,
      <>
        가상 데스크탑은 최대 5개까지 생성할 수 있습니다.
        <br />
        불필요한 데스크탑을 삭제한 후 다시 시도해주세요.
      </>,
      () => {
        taskTransform?.('경고', '');
      },
    );
    setIsMaxError(false);
  },[isMaxError, setAlert, taskTransform]);

  useEffect(()=>{
    if(!isMaxError) return;
    setAlert?.(
      Seori,
      <>
        가상 데스크탑은 최소 1개 이상 존재해야 합니다.
      </>,
      () => {
        taskTransform?.('경고', '');
      },
    );
    setIsMinError(false);
  },[isMinError, setAlert, taskTransform]);

  const addVirtualDesktop = () => {
    if( virtualTaskLists.length >= 5 ) {
      setIsMaxError(true);
      return;
    } // 최대 5개 데스크탑 제한
    setVirtualTaskLists([...virtualTaskLists, []]);
    setVirtualWindowPositions([...virtualWindowPositions, {}]);
  }

  const deleteVirtualDesktop = (index: number) => {
    if (virtualTaskLists.length <= 1) {
      setIsMinError(true);
      return;
    }

    setVirtualTaskLists(prev => prev.filter((_, i) => i !== index));
    setVirtualWindowPositions(prev => prev.filter((_, i) => i !== index));

    // 현재 인덱스 조정
    setDesktopIndex(prev => {
      if (index === prev) {
        // 삭제된 데스크탑이 현재 데스크탑이면
        return index > 0 ? index - 1 : 0;
      } else if (index < prev) {
        // 앞쪽 데스크탑이 삭제되면 인덱스 하나 감소
        return prev - 1;
      }
      return prev;
    });
  };

  return {
    virtualDesktopList,
    virtualCurrentDesktop,
    switchVirtualDesktop,
    addVirtualDesktop,
    deleteVirtualDesktop
  };
};

