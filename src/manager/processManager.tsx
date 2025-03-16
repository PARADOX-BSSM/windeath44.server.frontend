import {TaskType} from '../modules/typeModule.tsx'
import {useRecoilState} from "recoil";
import {taskManager} from "@/manager/taskManager.ts";

//프로세스 관리 훅
//기본 제공 기능
//- 프로세스 추가
//- 프로세스 삭제
const useProcessManager: () => [TaskType[], (component: TaskType) => void, (component: TaskType) => void] = () => {
  const [taskList, setTaskList] = useRecoilState<TaskType[]>(taskManager);
  const addTask = (component:TaskType) => {
    setTaskList(Task => (!Task.includes(component))?
      [...Task, component]:[...Task])
  };
  const removeTask = (component:TaskType) => {
    setTaskList(Task => (Task.some(item => item.name === component.name)) ?
      Task.filter(item => item.name !== component.name) : [...Task])
  };
  return [taskList, addTask, removeTask];
}

export {useProcessManager};