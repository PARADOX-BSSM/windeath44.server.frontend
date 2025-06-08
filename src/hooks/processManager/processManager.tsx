import { TaskType } from '../../modules/typeModule.tsx'
import { useAtom } from 'jotai'
import { taskManagerAtom } from '../../atoms/processManager.ts'

const useProcessManager: () => [TaskType[], (component: TaskType) => void, (component: TaskType) => void] = () => {
  const [taskList, setTaskList] = useAtom(taskManagerAtom)
  const addTask = (component: TaskType) => {
    setTaskList(Task => (!Task.some(item => item.name === component.name)) ? [...Task, component] : [...Task])
  }
  const removeTask = (component: TaskType) => {
    setTaskList(Task => Task.filter(item => item.name !== component.name))
  }
  return [taskList, addTask, removeTask]
}

export { useProcessManager }