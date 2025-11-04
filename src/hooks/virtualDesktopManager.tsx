import { useAtom, useAtomValue } from 'jotai';
import { virtualDesktopIndexAtom, virtualTaskListsAtom, virtualWindowPositionsAtom } from '@/atoms/processManager';
import { alerterAtom } from '@/atoms/alerter';
import Seori from '@/assets/sulkkagi/black_stone.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useEffect, useState } from 'react';


export const useVirtualDesktopManager = () => {
  const [isError, setIsError] = useState(false);
  const [desktopIndex, setDesktopIndex] = useAtom(virtualDesktopIndexAtom);
  const [virtualTaskLists, setVirtualTaskLists] = useAtom(virtualTaskListsAtom);
  const [virtualWindowPositions, setVirtualWindowPositions] = useAtom(virtualWindowPositionsAtom);
  const setAlert = useAtomValue(alerterAtom);
  const taskTransform = useAtomValue(taskTransformerAtom);

  const virtualDesktopList = virtualTaskLists?.map((_, i) => i) || [0];
  const virtualCurrentDesktop = desktopIndex || 0;

  const switchVirtualDesktop = (id: number) => setDesktopIndex(id);

  useEffect(()=>{
    if(!isError) return;
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
    setIsError(false);
  },[isError, setAlert, taskTransform]);

  const addVirtualDesktop = () => {
    if( virtualTaskLists.length >= 5 ) {
      setIsError(true);
      return;
    } // 최대 5개 데스크탑 제한
    setVirtualTaskLists([...virtualTaskLists, []]);
    setVirtualWindowPositions([...virtualWindowPositions, {}]);
  }

  return {
    virtualDesktopList,
    virtualCurrentDesktop,
    switchVirtualDesktop,
    addVirtualDesktop,
  };
};

