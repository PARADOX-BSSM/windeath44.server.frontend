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

// Virtual Desktop Switcher
const VirtualDesktopSwitcher = () => {
  const {
    virtualDesktopList,
    virtualCurrentDesktop,
    switchVirtualDesktop,
    addVirtualDesktop,
  } = useVirtualDesktopManager(); // 훅 이름 수정

  return (
    <div className="flex gap-2 p-2 bg-gray-800 text-white">
      {virtualDesktopList.map((id) => (
        <button
          key={id}
          className={`px-3 py-1 rounded ${
            id === virtualCurrentDesktop ? 'bg-blue-600' : 'bg-gray-600'
          }`}
          onClick={() => switchVirtualDesktop(id)}
        >
          Desktop {id}
        </button>
      ))}
      <button onClick={addVirtualDesktop}>＋</button>
    </div>
  );
};

const TaskBar = ({ backUpFocus, setBackUpFocus }: TaskBarProps) => {
  const [taskList] = useProcessManager();
  const [focus, setFocus] = useAtom(focusAtom);
  const [startOption, setStartOption] = useAtom(startOptionAtom);

  return (
    <_.TTaskBar id="taskbarContainer">
      <_.TaskList>
        <VirtualDesktopSwitcher />
        {taskList.map((task) => {
          if (task.type === 'Shell') {
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
          } else {
            const isFocused = (task.instanceId || task.name) === focus;
            return (
              <_.TaskItem
                style={isFocused ? _.taskSelectButtonStyle : _.taskButtonStyle}
                key={task.instanceId || task.name}
                onClick={(e) => {
                  if(isFocused){
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
