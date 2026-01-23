import { useProcessManager } from "@/hooks/processManager";
import { Fragment } from "react";

export const BackgroundRuntime = () => {
    const [,,,,backgroundTaskList] = useProcessManager();

    return <>
        {backgroundTaskList.map((task) => {
            const component = task.backgroundComponent;
            return <Fragment key={task.name + '_background'}>
                <div style={{ display: 'none'}}>{component}</div>
            </Fragment>
        })}
    </>;
}