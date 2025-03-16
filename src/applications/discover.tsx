import {TaskType} from "@/modules/typeModule.tsx";
import {useProcessManager} from "@/manager/processManager.tsx";
import {Apps} from '@/manager/importManager.tsx'

const Discover = () => {
  const [, addTask, ] = useProcessManager();
  return(
    <>
      {Apps.map((Application:TaskType) => {
        return (
          <div key={Application.name} className="app-button">
            <button onDoubleClick={() => {
              addTask(Application);
            }}>
            </button>
            <span className="app-title">{Application.name}</span>
          </div>
        )
      })}
    </>
  )
}
export default Discover;