import { atom } from 'jotai';

export interface Alarm {
    id: string;
    appName: string;
    message: string;
    createdAt: number;
}

// alarmManager atom: stack of messages with app info
export const alarmManagerAtom = atom<Alarm[]>([]);
