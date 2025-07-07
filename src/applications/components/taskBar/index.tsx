import React from "react";
import * as _ from './style';
import { useProcessManager } from "@/hooks/processManager";
import { useAtom } from "jotai";
import { focusAtom } from "@/atoms/windowManager";


interface TaskBarProps {
    startOption: boolean;
    setStartOption: React.Dispatch<React.SetStateAction<boolean>>;
    backUpFocus: string;
    setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
}

const TaskBar = ({ startOption, setStartOption, backUpFocus, setBackUpFocus }: TaskBarProps) => {
    const [taskList, ,] = useProcessManager();
    const taskStyle = { margin: "0.25rem" };
    const [focus, setFocus] = useAtom(focusAtom);
    const taskButtonStyle = {
        height: "100%",
        backgroundColor: "lightgreen"
    };
    const taskSelectButtonStyle = {
        height: "100%",
        backgroundColor: "seagreen"
    }

    return (
        <_.TTaskBar id='taskbarContainer'>
            <_.TaskList>
                {
                    taskList.map((task) => {
                        if (task.type === "Shell") {
                            return (
                                <li style={taskStyle} key={"Observer"}>
                                    <button style={startOption ? taskSelectButtonStyle : taskButtonStyle} //스타트 옵션은 프롭스로
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
                                    <li style={taskStyle} key={task.name}>
                                        <button style={taskSelectButtonStyle} onClick={() => {
                                            // setTabDownInterrupt(task.name);
                                        }}>{task.name}</button>
                                    </li>
                                )
                            } else {
                                return (
                                    <li style={taskStyle} key={task.name}>
                                        <button style={taskButtonStyle} onClick={(e) => {
                                            e.stopPropagation();
                                            setFocus(task.name);
                                            console.log(focus);
                                        }}>{task.name}</button>
                                    </li>
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