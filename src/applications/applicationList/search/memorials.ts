interface Memorial {
  memorialId: number;
  characterId: number;
}

interface FindMemorialsResponse {
  message: string;
  data: Memorial[];
}

export const dummyFindMemorialsResponse: FindMemorialsResponse = {
  message:
    'Memorials Successfully Found Order By : recently-updated, Page : 1, With Filter : [1, 2, 3]',
  data: [
    {
      memorialId: 1,
      characterId: 2,
    },
    {
      memorialId: 2,
      characterId: 3,
    },
    {
      memorialId: 3,
      characterId: 5,
    },
  ],
};
