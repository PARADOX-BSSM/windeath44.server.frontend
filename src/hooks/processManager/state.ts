import {atom, RecoilState} from 'recoil'
import {TaskType} from '@/modules/typeModule.tsx'

const taskManager:RecoilState<TaskType[]> = atom({
  key: 'taskManager',
  default: [] as any
})
// This atom will be used to manage the state of the task manager
// It will hold an array of TaskType objects, which represent the tasks in the task manager                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
export {taskManager}