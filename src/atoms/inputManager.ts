import { atom } from 'jotai';

export const inputPortage = atom({
  name: '',
  deathReason: '',
  date: '',
  lifeCycle: '',
  anime: '',
  age: '',
  profileImage: '',
});

export const inputContent = atom({ characterId: '', content: '' });
