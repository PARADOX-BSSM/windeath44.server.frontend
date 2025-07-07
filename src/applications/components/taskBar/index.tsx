import React from "react";
import * as _ from './style';
import { useProcessManager } from "@/hooks/processManager";
import { useAtom } from "jotai";
import { focusAtom } from "@/atoms/windowManager";
import FileImg from '@/assets/search/folder.svg';


interface TaskBarProps {
    startOption: boolean;
    setStartOption: React.Dispatch<React.SetStateAction<boolean>>;
    backUpFocus: string;
    setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
}

const TaskBar = ({ startOption, setStartOption, backUpFocus, setBackUpFocus }: TaskBarProps) => {
    const [taskList, ,] = useProcessManager();
    const [focus, setFocus] = useAtom(focusAtom);
    

    return (
        <_.TTaskBar id='taskbarContainer'>
            <_.TaskList>
                {
                    taskList.map((task) => {
                        if (task.type === "Shell") {
                            return (
                                <li key={"Observer"}>
                                    <button style={startOption ? _.taskSelectButtonStyle : _.taskButtonStyle} //스타트 옵션은 프롭스로
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setStartOption((prev) => {
                                                if (prev) {
                                                    setFocus(backUpFocus);
                                                } else {
                                                    setBackUpFocus(focus);
                                                    setFocus("Observer");
                                                }
                                                return !prev;
                                            });
                                        }}>Start</button>
                                </li>
                            )
                        } else {
                            if (task.name === focus) {
                                return (
                                    <_.TaskItem style={_.taskSelectButtonStyle} key={task.name} onClick={() => {
                                            // setTabDownInterrupt(task.name);
                                        }}>
                                        <_.ImgContainer src={FileImg}/>
                                        <_.TaskName>{task.name}</_.TaskName>
                                    </_.TaskItem>
                                )
                            } else {
                                return (
                                    <_.TaskItem style={_.taskButtonStyle} key={task.name} onClick={(e) => {
                                            e.stopPropagation();
                                            setFocus(task.name);
                                            console.log(focus);
                                        }}>
                                        <_.ImgContainer src={FileImg}/>
                                        <_.TaskName>{task.name}</_.TaskName>
                                    </_.TaskItem>
                                )
                            }
                        }
                    })
                }
            </_.TaskList>
        </_.TTaskBar>
    );
}
export default TaskBar;