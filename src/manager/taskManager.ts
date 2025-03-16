import {atom, RecoilState} from 'recoil'
import {TaskType} from '@/modules/typeModule.tsx'

const taskManager:RecoilState<TaskType[]> = atom({
  key: 'taskManager',
  default: [] as any
})

export {taskManager}