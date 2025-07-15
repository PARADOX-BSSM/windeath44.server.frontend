import { atom } from 'jotai';

export const inputPortage = atom({
  name: '',
  deathReason: '자연사(自然死)' as deathType,
  date: '',
  lifeCycle: '',
  anime: '',
  animeId: '',
  age: 0,
  profileImage: '',
  phrase: '',
});

export const inputContent = atom({ characterId: '', content: '' });
