import * as _ from '@/applications/applicationList/search/viewer/style.ts';
import MemorialWithIcon from '@/applications/components/memorialWithIcon';
import myComputer from '@/assets/appIcons/my_computer.svg';
import { taskTransformerAtom, taskSearchAtom } from '@/atoms/taskTransformer';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
// import { useEffect } from 'react';
import { memorialIdAtom, memorialViewerListAtom } from '@/atoms/memorialManager.ts';
import MemorialObject from '@/applications/components/memorialObject';
import Loading from '@/applications/components/loading';
import { virtualTaskListsAtom, virtualDesktopIndexAtom } from '@/atoms/processManager';
import { focusAtom } from '@/atoms/windowManager';

interface ViewerProps {
  isMemorialLoading?: boolean;
  characters: any[];
  memorials: any[];
  stack?: any[];
  push?: any;
  pop?: any;
  top?: any;
}

const Viewer = ({
  isMemorialLoading,
  characters,
  memorials,
  stack,
  push,
  pop,
  top,
}: ViewerProps) => {
  const taskTransform = useAtomValue(taskTransformerAtom);
  const taskSearch = useAtomValue(taskSearchAtom);
  const virtualTaskLists = useAtomValue(virtualTaskListsAtom);
  const desktopIndex = useAtomValue(virtualDesktopIndexAtom);
  const currentDesktopTasks = virtualTaskLists[desktopIndex] || [];
  const memorialViewerList = useAtomValue(memorialViewerListAtom);
  const [memorialId, setMemorialId] = useAtom(memorialIdAtom);
  const setFocus = useSetAtom(focusAtom);

  // useEffect(() => {
  //   console.log(characters);
  // }, []);

  return (
    <_.view>
      <_.viewer>
        <_.Shadow>
          <_.inputs>
            <_.List>
              {isMemorialLoading ? (
                <Loading
                  text="추모관 목록을 불러오는 중..."
                  imageSize="100px"
                />
              ) : (
                characters?.map((character: any) => {
                  const relatedMemorials =
                    memorials?.filter(
                      (memorial) => memorial.characterId === character.characterId,
                    ) ?? [];

                  // console.log('Character:', character.name, 'Related memorials:', relatedMemorials);

                  if (relatedMemorials.length > 0) {
                    return (
                      <MemorialObject
                        key={character.characterId}
                        icon={character.imageUrl || ''}
                        name={character.name}
                        animeId={character.animeId}
                        onDoubleClick={() => {
                          const characterId = character.characterId;
                          let targetMemorialId = relatedMemorials[0].memorialId;

                          // if (relatedMemorials.length > 0) {
                          //   targetMemorialId = relatedMemorials[0].memorialId;
                          //   setMemorialId(targetMemorialId);
                          // }

                          const existingViewer = memorialViewerList.find(
                            (v) => v.characterId === character.characterId,
                          );

                          if (existingViewer) {
                            // 이미 열려있는 뷰어가 있으면 포커스 이동
                            setFocus(existingViewer.instanceId);
                            return;
                          }

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
                  } else {
                    return null;
                  }
                })
              )}
            </_.List>
          </_.inputs>
        </_.Shadow>
      </_.viewer>
    </_.view>
  );
};
export default Viewer;
