import { useProcessManager } from "@/hooks/processManager";
import { Fragment, useEffect } from "react";

export const BackgroundRuntime = () => {
    const [,,,,backgroundTaskList] = useProcessManager();
    useEffect(() => {
        console.log('Background Runtime Mounted', backgroundTaskList);
    }, [backgroundTaskList]);
    return <>
        {backgroundTaskList.map((task) => {
            const component = task.backgroundComponent;
            return <Fragment key={task.name + '_background'}><div style={{ display: 'none' }}>{component}</div></Fragment>
        })}
    </>;
}