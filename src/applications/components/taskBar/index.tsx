import React from 'react';
import * as _ from './style';
import { useProcessManager } from '@/hooks/processManager';
import { useAtom } from 'jotai';
import { focusAtom, startOptionAtom } from '@/atoms/windowManager';
import FileImg from '@/assets/search/folder.svg';
import StartImg from '@/assets/Start.svg';
import { CURSOR_IMAGES, setCursorImage } from '@/lib/setCursorImg';
import { useVirtualDesktopManager } from '@/hooks/virtualDesktopManager';


interface TaskBarProps {
  backUpFocus: string;
  setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
}

const TaskBar = ({ backUpFocus, setBackUpFocus }: TaskBarProps) => {
  const [taskList] = useProcessManager();
  const [focus, setFocus] = useAtom(focusAtom);
  const [startOption, setStartOption] = useAtom(startOptionAtom);

  const {
    virtualDesktopList,
    virtualCurrentDesktop,
    switchVirtualDesktop,
    addVirtualDesktop,
  } = useVirtualDesktopManager();

  return (
    <_.TTaskBar id="taskbarContainer">
      <_.TaskList>
        {taskList.map((task) => {
          if (task.name === 'Discover') {
            return (
              <_.Observer
                key={task.name || 'observer'}
                selected={startOption}
                onClick={(e) => {
                  e.stopPropagation();
                  setStartOption((prev) => {
                    if (prev) {
                      setFocus(backUpFocus);
                    } else {
                      setBackUpFocus(focus);
                      setFocus('Observer');
                    }
                    return !prev;
                  });
                }}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                <_.StartImg
                  src={StartImg}
                  draggable="false"
                />
              </_.Observer>
            );
          } else if (task.name === 'Extender') {
            return (
              <>
                {virtualDesktopList.map((id) => (
                  <_.VirtualDesktopItem
                    key={id}
                    style={virtualCurrentDesktop === id ? _.taskSelectButtonStyle : _.taskButtonStyle}
                    onClick={() => switchVirtualDesktop(id)}
                    onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                    onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                  >
                    <_.TaskName>{id+1}</_.TaskName>
                  </_.VirtualDesktopItem>
                ))}
                <_.VirtualDesktopItem 
                  onClick={addVirtualDesktop} 
                  style={_.taskButtonStyle}
                  onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                  onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                >＋</_.VirtualDesktopItem>  
              </>
            )
          } else {
            const isFocused = (task.instanceId || task.name) === focus;
            return (
              <_.TaskItem
                style={isFocused ? _.taskSelectButtonStyle : _.taskButtonStyle}
                key={task.instanceId || task.name}
                onClick={(e) => {
                  if(!isFocused){
                    e.stopPropagation();
                    setFocus(task.instanceId || task.name);
                  }
                }}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                <_.ImgContainer
                  src={task.appSetup?.Image}
                  draggable="false"
                />
                <_.TaskName>{task.name}</_.TaskName>
              </_.TaskItem>
            );
          }
        })}
      </_.TaskList>
    </_.TTaskBar>
  );
};

export default TaskBar;
