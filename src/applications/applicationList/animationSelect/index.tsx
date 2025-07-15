import * as _ from './style';
import { useAtom, useAtomValue } from 'jotai';
import { taskSearchAtom } from '@/atoms/taskTransformer';
import { useRef, useState } from 'react';
import Inputs from '@/applications/components/inputs';
import { inputPortage } from '@/atoms/inputManager';
import { useProcessManager } from '@/hooks/processManager';
import { CURSOR_IMAGES, setCursorImage } from '@/lib/setCursorImg';
import { useInfiniteAnime } from '@/api/anime/getAnime';

const AnimationSelect = () => {
  const taskSearch = useAtomValue(taskSearchAtom);
  const [name, setName] = useState('');
  const [, setInputValue] = useAtom(inputPortage);
  const [, , removeTask] = useProcessManager();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteAnime(
    10,
    name,
  );

  const boardRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: React.WheelEvent) => {

    if (e.deltaY <= 0) return;

    const el = boardRef.current;
    if (!el || !hasNextPage || isFetchingNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = el;

    if (scrollTop + clientHeight >= scrollHeight - 30) {
      fetchNextPage();
    }
  };

  return (
    <_.Container>
      <Inputs
        width="100%"
        fontSize="1rem"
        label="애니메이션 이름"
        value={name}
        type="text"
        setValue={setName}
      />
      <_.Board
        ref={boardRef}
        onWheel={handleWheel}
      >
        <_.Rows>
          {data?.pages.map((page) =>
            page.data.values.map((animation: any) => (
              <_.Item
                key={animation.animeId}
                onClick={() => {
                  setInputValue((prev) => ({
                    ...prev,
                    anime: animation.name,
                    animeId: animation.animeId,
                  }));
                  const task = taskSearch?.('애니메이션 선택');
                  if (task) removeTask(task);
                }}
              >
                <_.Image
                  src={animation.imageUrl}
                  onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                  onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                />
                <_.Name>{animation.name}</_.Name>
              </_.Item>
            )),
          )}
        </_.Rows>
      </_.Board>
    </_.Container>
  );
};

export default AnimationSelect;
