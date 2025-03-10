import {Suspense, lazy} from 'react';
import {TaskType} from "@/modules/typeModule.tsx";

const Discover = ({addTask, Apps}) => {
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