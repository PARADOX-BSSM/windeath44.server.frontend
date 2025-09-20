import React from 'react';
import * as _ from './style';
import { useProcessManager } from '@/hooks/processManager';
import { useAtom } from 'jotai';
import { focusAtom, startOptionAtom } from '@/atoms/windowManager';
import FileImg from '@/assets/search/folder.svg';
import StartImg from '@/assets/Start.svg';
import { CURSOR_IMAGES, setCursorImage } from '@/lib/setCursorImg';

interface TaskBarProps {
  backUpFocus: string;
  setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
}

const TaskBar = ({ backUpFocus, setBackUpFocus }: TaskBarProps) => {
  const [taskList, ,] = useProcessManager();
  const [focus, setFocus] = useAtom(focusAtom);
  const [startOption, setStartOption] = useAtom(startOptionAtom);

  return (
    <_.TTaskBar id="taskbarContainer">
      <_.TaskList>
        {taskList.map((task) => {
          if (task.type === 'Shell') {
            return (
              <_.Observer
                key={`shell-${task.name}`}
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
                    console.log(startOption);
                    return !prev;
                  });
                }}
                onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
              >
                <_.StartImg src={StartImg}></_.StartImg>
              </_.Observer>
            );
          } else {
            if (task.name === focus) {
              return (
                <_.TaskItem
                  style={_.taskSelectButtonStyle}
                  key={task.name}
                  onClick={() => {
                    // setTabDownInterrupt(task.name);
                  }}
                  onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                  onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                >
                  <_.ImgContainer src={FileImg} />
                  <_.TaskName>{task.name}</_.TaskName>
                </_.TaskItem>
              );
            } else {
              return (
                <_.TaskItem
                  style={_.taskButtonStyle}
                  key={task.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocus(task.name);
                    console.log(focus);
                  }}
                  onMouseEnter={() => setCursorImage(CURSOR_IMAGES.hand)}
                  onMouseLeave={() => setCursorImage(CURSOR_IMAGES.default)}
                >
                  <_.ImgContainer src={FileImg} />
                  <_.TaskName>{task.name}</_.TaskName>
                </_.TaskItem>
              );
            }
          }
        })}
      </_.TaskList>
    </_.TTaskBar>
  );
};
export default TaskBar;
