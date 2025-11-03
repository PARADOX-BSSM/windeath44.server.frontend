import { useAtom } from 'jotai';
import { virtualDesktopIndexAtom, virtualTaskListsAtom, virtualWindowPositionsAtom } from '@/atoms/processManager';


export const useVirtualDesktopManager = () => {
  const [desktopIndex, setDesktopIndex] = useAtom(virtualDesktopIndexAtom);
  const [virtualTaskLists, setVirtualTaskLists] = useAtom(virtualTaskListsAtom);
  const [virtualWindowPositions, setVirtualWindowPositions] = useAtom(virtualWindowPositionsAtom);

  const virtualDesktopList = virtualTaskLists?.map((_, i) => i) || [0];
  const virtualCurrentDesktop = desktopIndex || 0;

  const switchVirtualDesktop = (id: number) => setDesktopIndex(id);

  const addVirtualDesktop = () => {
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

