interface Anime {
  animeId: number;
  name: string;
  genres: string[];
  imageUrl: string;
}

interface FindAnimesResponse {
  message: string;
  data: {
    values: Anime[];
    hasNext: boolean;
  };
}

export const dummyFindAnimesResponse: FindAnimesResponse = {
  message: 'find animes',
  data: {
    values: [
      {
        animeId: 232,
        name: '최애의 아이',
        genres: ['아이돌', '드라마', '음악'],
        imageUrl:
          'https://cdn.mapianist.com/preview-v2/b75599e6-4590-4299-b327-71d2762c0ced-1684746304.jpg',
      },
      {
        animeId: 233,
        name: '진격의 거인',
        genres: ['액션', '판타지', '드라마'],
        imageUrl: 'https://example.com/image_attack_on_titan.jpg',
      },
      {
        animeId: 234,
        name: '나루토',
        genres: ['액션', '어드벤처', '판타지'],
        imageUrl: 'https://example.com/image_demon_slayer.jpg',
      },
      {
        animeId: 235,
        name: '죠죠의 기묘한 모험',
        genres: ['액션', '어드벤처', '판타지'],
        imageUrl: 'https://example.com/image_demon_slayer.jpg',
      },
      {
        animeId: 236,
        name: 'Re: 제로부터 시작하는 이세계 생활',
        genres: ['액션', '어드벤처', '판타지'],
        imageUrl: 'https://example.com/image_demon_slayer.jpg',
      },
    ],
    hasNext: true,
  },
};
