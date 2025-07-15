import { atom } from 'jotai';

export const inputPortage = atom({
  name: '',
  deathReason: '',
  date: '',
  lifeCycle: '',
  anime: '',
  animeId: '',
  age: '',
  profileImage: '',
  phrase: '',
});

export const inputContent = atom({ characterId: '', content: '' });
