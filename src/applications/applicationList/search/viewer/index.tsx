import * as _ from '@/applications/applicationList/search/viewer/style.ts';
import MemorialWithIcon from '@/applications/components/memorialWithIcon';
import myComputer from '@/assets/appIcons/my_computer.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { stackProps } from '@/modules/typeModule.tsx';

interface ViewerProps {
  characters: any[];
  memorials: any[];
  stackProps: stackProps;
}

const Viewer = ({ characters, memorials, stackProps }: ViewerProps) => {
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
                      stackProps: stackProps,
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
