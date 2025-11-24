import { atom } from 'jotai';

export interface FeedMetadata {
  animeId: number;
  causeOfDeathDetails: string;
  characterAge: number;
  characterId: number;
  characterName: string;
  content: string;
  deathReason: string;
  memorialId: number;
  saying: string;
  writerId: string;
}

export interface FeedItem {
  id: string;
  score: number;
  metadata: FeedMetadata;
}

export interface FeedsResponse {
  message: string;
  data: FeedItem[];
}

export const feedsAtom = atom<FeedItem[]>([]);
