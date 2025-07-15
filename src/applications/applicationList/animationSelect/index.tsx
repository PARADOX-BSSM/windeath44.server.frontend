// src/applications/applicationList/animationSelect/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as _ from './style';
import Inputs from '@/applications/components/inputs';
import { useAtomValue, useAtom } from 'jotai';
import { taskSearchAtom } from '@/atoms/taskTransformer';
import { inputPortage } from '@/atoms/inputManager';
import { useProcessManager } from '@/hooks/processManager';
import { CURSOR_IMAGES, setCursorImage } from '@/lib/setCursorImg';
import { useInfiniteAnime } from '@/api/anime/getAnime';

interface Anime {
  animeId: number;
  name: string;
  genres: string[];
  imageUrl: string;
}

const AnimationSelect: React.FC = () => {
  const taskSearch = useAtomValue(taskSearchAtom);
  const [, setInputValue] = useAtom(inputPortage);
  const [, , removeTask] = useProcessManager();

  const [name, setName] = useState<string>('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteAnime(
    10,
    name,
  );

  const boardRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY <= 0) return;
    const el = boardRef.current;
    if (!el || !hasNextPage || isFetchingNextPage) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      fetchNextPage();
    }
  };

  const filtered: Anime[] = data
    ? data.pages
        .flatMap((page) => page.data.values)
        .filter((anim) => anim.name.toLowerCase().includes(name.trim().toLowerCase()))
    : [];

  const uniqueAnimations: Anime[] = Array.from(
    new Map(filtered.map((anim) => [anim.animeId, anim])).values(),
  );

  useEffect(() => {
    if (name.trim() !== '') {
      refetch();
    }
  }, [name, refetch]);

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
          {uniqueAnimations.map((animation) => (
            <_.Item
              key={animation.animeId}
              onClick={() => {
                setInputValue((prev) => ({
                  ...prev,
                  anime: animation.name,
                  animeId: animation.animeId.toString(),
                }));
                const task = taskSearch?.('애니메이션 선택');
                if (task) removeTask(task);
              }}
            >
              <_.Image
                key={animation.animeId}
                src={animation.imageUrl}
                alt={animation.name}
                loading="lazy"
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              />
              <_.Name>{animation.name}</_.Name>
            </_.Item>
          ))}
        </_.Rows>
      </_.Board>
    </_.Container>
  );
};

export default AnimationSelect;
