import type deathType from './deathType';

export interface InputPortageType {
  name: string;
  deathReason: deathType;
  date: string;
  lifeCycle: number;
  anime: string;
  animeId: string;
  age: number;
  profileImage: string;
  phrase: string;
  causeOfDeathDetails: string;
}

export interface InputContentType {
  characterId: string;
  content: string;
}
