import {atom, RecoilState} from 'recoil'
import {TaskType} from '@/modules/typeModule.tsx'

export const taskManager:RecoilState<TaskType[]> = atom({
  key: 'taskManager',
  default: [] as any
})