import { atom } from 'jotai'
import { TaskType } from '@/modules/typeModule.tsx'

export const taskManagerAtom = atom<TaskType[]>([])