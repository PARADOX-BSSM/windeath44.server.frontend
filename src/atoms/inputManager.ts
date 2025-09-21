import { InputContentType, InputPortageType } from '@/modules/inputPortageInterface';
import { atom } from 'jotai';

export const inputPortage = atom<InputPortageType>({
  name: '',
  deathReason: '자연사(自然死)' as deathType,
  date: '',
  lifeCycle: 0,
  anime: '',
  animeId: 0,
  age: 0,
  profileImage: '',
  phrase: '',
});

export const inputContent = atom<InputContentType>({ characterId: '', content: '' });
