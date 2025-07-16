import * as _ from '@/applications/applicationList/search/viewer/style.ts';
import MemorialWithIcon from '@/applications/components/memorialWithIcon';
import myComputer from '@/assets/appIcons/my_computer.svg';
import { characterIdAtom, memorialIdAtom } from '@/atoms/memorialManager';
import { taskTransformerAtom } from '@/atoms/taskTransformer';
import { useAtom, useAtomValue } from 'jotai';

interface ViewerProps {
  characters: any[];
  memorials: any[];
}

const Viewer = ({ characters, memorials }: ViewerProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const [, setMemorialId] = useAtom(memorialIdAtom);
  const [, setCharacterId] = useAtom(characterIdAtom);

  return (
    <_.view>
      <_.viewer>
        <_.Shadow>
          <_.inputs>
            {characters.map((character: any) => {
              const relatedMemorials = memorials.filter(
                (memorial) => memorial.characterId === character.characterId,
              );

              return (
                <MemorialWithIcon
                  key={character.characterId}
                  icon={myComputer}
                  name={character.name}
                  onDoubleClick={() => {
                    taskTransform?.('', 'memorial');
                    if (relatedMemorials.length > 0) {
                      setMemorialId(relatedMemorials[0].memorialId);
                    }
                    setCharacterId(character.characterId);
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
