import { atom } from 'jotai';

// alarmManager atom: stack of messages
export const alarmManagerAtom = atom<string[]>([]);
