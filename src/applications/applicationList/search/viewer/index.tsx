import * as _ from '@/applications/applicationList/search/viewer/style.ts';
import MemorialWithIcon from '@/applications/components/memorialWithIcon';
import myComputer from '@/assets/appIcons/my_computer.svg';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useAtom, useAtomValue } from 'jotai';
// import { useEffect } from 'react';
import { memorialIdAtom } from '@/atoms/memorialManager.ts';

interface ViewerProps {
  characters: any[];
  memorials: any[];
  stack?: any[];
  push?: any;
  pop?: any;
  top?: any;
}

const Viewer = ({ characters, memorials, stack, push, pop, top }: ViewerProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [memorialId, setMemorialId] = useAtom(memorialIdAtom);

  // useEffect(() => {
  //   console.log(characters);
  // }, []);

  return (
    <_.view>
      <_.viewer>
        <_.Shadow>
          <_.inputs>
            {characters?.map((character: any) => {
              const relatedMemorials =
                memorials?.filter((memorial) => memorial.characterId === character.characterId) ??
                [];

              // console.log('Character:', character.name, 'Related memorials:', relatedMemorials);

              return (
                <MemorialWithIcon
                  key={character.characterId}
                  icon={myComputer}
                  name={character.name}
                  onDoubleClick={() => {
                    const characterId = character.characterId;
                    let targetMemorialId = relatedMemorials[0].memorialId;

                    // if (relatedMemorials.length > 0) {
                    //   targetMemorialId = relatedMemorials[0].memorialId;
                    //   setMemorialId(targetMemorialId);
                    // }

                    taskTransform?.('', '추모관 뷰어', {
                      memorialId: targetMemorialId,
                      characterId: characterId,
                      stack: stack,
                      push: push,
                      pop: pop,
                      top: top,
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
