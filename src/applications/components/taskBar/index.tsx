import React from "react";
import * as _ from './style';
import {useProcessManager} from "@/hooks/processManager/processManager";


interface TaskBarProps {
    startOption: boolean;
    setStartOption: React.Dispatch<React.SetStateAction<boolean>>;
    focus : string;
    setFocus: React.Dispatch<React.SetStateAction<string>>;
    backUpFocus: string;
    setBackUpFocus: React.Dispatch<React.SetStateAction<string>>;
    setTabDownInterrupt : React.Dispatch<React.SetStateAction<string>>;
}

const TaskBar = ({startOption, setStartOption, focus, setFocus, backUpFocus, setBackUpFocus, setTabDownInterrupt }:TaskBarProps) => {
    const [taskList,,] = useProcessManager();
    const taskStyle = { margin: "0.25rem" };
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
                        console.log(focus);
                        if (task.type === "Shell") {
                            return (
                                <li style={taskStyle} key={"Observer"}>
                                    <button style={startOption ? taskSelectButtonStyle : taskButtonStyle} //스타트 옵션은 프롭스로
                                            onClick={() => {
                                                setStartOption(!startOption);
                                                if (startOption) {
                                                    setFocus(backUpFocus);
                                                } else {
                                                    setBackUpFocus(focus);
                                                    setFocus("Observer");
                                                }
                                            }
                                            }>Start</button>
                                </li>
                            )
                        } else {
                            if (task.name === focus) {
                                return (
                                    <li style={taskStyle} key={task.name}>
                                        <button style={taskSelectButtonStyle} onClick={() => {
                                            setTabDownInterrupt(task.name);
                                        }}>{task.name}</button>
                                    </li>
                                )
                            } else {
                                return (
                                    <li style={taskStyle} key={task.name}>
                                        <button style={taskButtonStyle} onClick={() => {
                                            setFocus(task.name);
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