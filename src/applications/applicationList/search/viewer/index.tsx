import * as _ from '@/applications/applicationList/search/viewer/style.ts';
import MemorialWithIcon from '@/applications/components/memorialWithIcon';
import myComputer from '@/assets/appIcons/my_computer.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';

interface ViewerProps {
  characters: any[];
  memorials: any[];
}

const Viewer = ({ characters, memorials }: ViewerProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);

  useEffect(() => {
    console.log(characters);
  }, []);

  return (
    <_.view>
      <_.viewer>
        <_.Shadow>
          <_.inputs>
            {characters?.map((character: any) => {
              const relatedMemorials =
                memorials?.filter((memorial) => memorial.characterId === character.characterId) ??
                [];

              // console.log(memorials, character);

              return (
                <MemorialWithIcon
                  key={character.characterId}
                  icon={myComputer}
                  name={character.name}
                  onDoubleClick={() => {
                    let memorialId = 5;
                    if (relatedMemorials.length > 0) {
                      memorialId = relatedMemorials[0].memorialId;
                    }
                    const characterId = character.characterId;
                    taskTransform?.('', 'memorial', {
                      memorialId: memorialId,
                      characterId: characterId,
                    });
                  }}
                />
              );
            })}
          </_.inputs>
        </_.Shadow>
      </_.viewer>
    </_.view>
  );
};
export default Viewer;
