import React, { useEffect } from "react";
import * as _ from './style';
import {useProcessManager} from "@/hooks/processManager/processManager";
import { useRecoilState } from 'recoil';
import { focusState, backUpFocusState } from '@/recoil/focusState';
import { startOptionState } from "@/recoil/startOptionState";


interface TaskBarProps {
    setTabDownInterrupt : React.Dispatch<React.SetStateAction<string>>;
}

const TaskBar = ({setTabDownInterrupt }:TaskBarProps) => {
    const [focus, setFocus] = useRecoilState(focusState);
    const [startOption, setStartOption] = useRecoilState(startOptionState)
    const [backUpFocus, setBackUpFocus] = useRecoilState(backUpFocusState);
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

    useEffect(() => {
        console.log(focus, "💡 최신 focus 값");
      }, [focus]);

      useEffect(() => {
        if (!startOption) {
            setFocus(backUpFocus);
        } else {
            setBackUpFocus(focus);
            setFocus("Observer");
        }
      }, [startOption]);

    return (
        <_.TTaskBar id='taskbarContainer'>
            <_.TaskList>
                {
                    taskList.map((task) => {
                        if (task.type === "Shell") {
                            return (
                                <li style={taskStyle} key={"Observer"}>
                                    <button style={startOption ? taskSelectButtonStyle : taskButtonStyle} //스타트 옵션은 프롭스로
                                            onClick={() => {
                                                console.log(startOption);
                                                setStartOption(!startOption);
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
                                console.log(task.name, 1234);
                                return (
                                    <li style={taskStyle} key={task.name}>
                                        <button style={taskButtonStyle} onClick={() => {
                                            console.log("현재 focus:", focus, "변경할 task.name:", task.name);
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