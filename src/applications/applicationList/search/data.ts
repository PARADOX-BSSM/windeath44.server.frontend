type CharacterState = 'MEMORIALIZING' | 'NOT_MEMORIALIZING';

interface Character {
  characterId: number;
  animeId: number;
  name: string;
  lifeTime: number;
  deathReason: string;
  imageUrl: string;
  deathOfDay: string;
  bowCount: number;
  age: number;
  saying: string;
  state: CharacterState;
}

interface FindCharacterResponse {
  message: string;
  data: Character[];
}

export const dummyFindCharacterResponse: FindCharacterResponse = {
  message: 'find character',
  data: [
    {
      characterId: 1,
      animeId: 233,
      name: '에렌 예거',
      lifeTime: 3,
      deathReason: '자살(自殺)',
      imageUrl: 'image_url_eren',
      deathOfDay: '2024-05-29',
      bowCount: 10,
      age: 19,
      saying: '자유를 위해 싸운다',
      state: 'MEMORIALIZING',
    },
    {
      characterId: 2,
      animeId: 232,
      name: '호시노 아이',
      lifeTime: 1,
      deathReason: '타살(他殺)',
      imageUrl: 'image_url_ai',
      deathOfDay: '2024-05-29',
      bowCount: 3,
      age: 14,
      saying: '돈이 좋아',
      state: 'NOT_MEMORIALIZING',
    },
    {
      characterId: 3,
      animeId: 235,
      name: '쿠죠 죠타로',
      lifeTime: 2,
      deathReason: '타살(他殺)',
      imageUrl: 'image_url_jotaro',
      deathOfDay: '2024-05-29',
      bowCount: 5,
      age: 28,
      saying: '오라오라오라!',
      state: 'MEMORIALIZING',
    },
    {
      characterId: 4,
      animeId: 234,
      name: '카카시 하타케',
      lifeTime: 3,
      deathReason: '불명사(不明死)',
      imageUrl: 'image_url_kakashi',
      deathOfDay: '2024-05-29',
      bowCount: 8,
      age: 30,
      saying: '그 누구도 나보다 빨리 죽진 못해.',
      state: 'NOT_MEMORIALIZING',
    },
    {
      characterId: 5,
      animeId: 236,
      name: '렘',
      lifeTime: 1,
      deathReason: '돌연사(突然死)',
      imageUrl: 'image_url_rem',
      deathOfDay: '2024-05-29',
      bowCount: 12,
      age: 17,
      saying: '스바루 군이 전부야',
      state: 'MEMORIALIZING',
    },
  ],
};
