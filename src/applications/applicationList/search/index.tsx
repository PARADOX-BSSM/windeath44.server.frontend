import { useEffect, useRef, useState } from 'react';
import * as _ from '@/applications/applicationList/search/style.ts';
import Folder from '@/assets/search/folder.svg';
import Search_task from '@/applications/applicationList/search/search_task';
import Viewer from '@/applications/applicationList/search/viewer';
import { useGetCharactersQuery } from '@/api/anime/getCharacters';
import { useGetCharactersByAnimeQuery } from '@/api/anime/getCharactersByAnimeId';
import { useGetAnimesQuery } from '@/api/anime/getAnimes';
import { useGetCharactersByDeathReasonQuery } from '@/api/anime/getCharactersByDeathReason';

const Search = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isColumn, setIsColumn] = useState(false);

  const [fillDeath, setFillDeath] = useState('불명사(不明死)');
  const [ani, setAni] = useState('');
  const [animeIds, setAnimeIds] = useState<number[]>([1]);
  const [name, setName] = useState('');

  const {
    data: getCharactersResponse,
    isLoading: isLoading,
    isError: isError,
  } = useGetCharactersQuery({}); // 모든 캐릭터

  const {
    data: getAnimesResponse,
    isLoading: isLoadingByAnimes,
    isError: isErrorByAnimes,
  } = useGetAnimesQuery({ size: 10, animeName: ani }); // 이름으로 애니메이션 검색

  const {
    data: getAllAnimesResponse,
    isLoading: isLoadingByAllAnimes,
    isError: isErrorByAllAnimes,
  } = useGetAnimesQuery({ size: 10 }); // 모든 애니메이션

  const {
    data: getCharactersByAnimeIdResponse,
    isLoading: isLoadingByAnimeId,
    isError: isErrorByAnimeId,
  } = useGetCharactersByAnimeQuery({
    animeId: animeIds,
  }); // 애니메이션 ID로 캐릭터 찾기

  const {
    data: getCharactersByDeathReasonResponse,
    isLoading: isLoadingByDeathReason,
    isError: isErrorByDeathReason,
  } = useGetCharactersByDeathReasonQuery({
    deathReason: fillDeath,
    size: 10,
  });

  const [characters, setCharacters] = useState<any[]>([]);

  const [searchedCharacters, setSearchedCharacters] = useState<any[]>([]);
  const [deathReasonCharacters, setDeathReasonCharacters] = useState<any[]>([]);

  const [finalCharacters, setFinalCharacters] = useState<any[]>([]);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.contentRect.height;
        // console.log("측정된 높이:", height);
        setIsColumn(height >= 412);
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (getCharactersResponse?.data) {
      setFinalCharacters(getCharactersResponse?.data);
    }

    const result = getAllAnimesResponse.data.values;

    const getAnimeIds = (animes: typeof result): number[] => {
      return animes.map((anime: { animeId: number }) => anime.animeId);
    };
    const animeIds = getAnimeIds(result);
    setAnimeIds(animeIds);
  }, []);

  // 캐릭터 이름
  useEffect(() => {
    const searchCharacterByName = (keyword: string) => {
      if (!keyword) return getCharactersResponse.data;

      return getCharactersResponse.data.filter((character: { name: string | string[] }) =>
        character.name.includes(keyword),
      );
    };

    const result = searchCharacterByName(name);
    setCharacters(result);
  }, [getCharactersResponse]);

  // 애니메이션 이름
  useEffect(() => {
    // 이름으로 애니메이션 찾기
    const searchAnimeByName = (keyword: string) => {
      if (keyword) {
        return getAnimesResponse.data.values;
      } else {
        return getAllAnimesResponse.data.values;
      }
    };

    const result = searchAnimeByName(ani);

    const getAnimeIds = (animes: typeof result): number[] => {
      return animes.map((anime: { animeId: number }) => anime.animeId);
    };
    const animeIds = getAnimeIds(result);
    setAnimeIds(animeIds);

    // 애니메이션 ID로 캐릭터 찾기
    const searchCharacterByAnimeIds = (ids: number[]) => {
      if (ids[0]) {
        return getCharactersByAnimeIdResponse.data;
      } else {
        return getCharactersResponse.data;
      }
    };

    const characters = searchCharacterByAnimeIds(animeIds);
    setSearchedCharacters(characters);
  }, [getAnimesResponse]);

  // 사인
  useEffect(() => {
    const searchCharacterByDeathReason = (reason: string) => {
      if (reason === '모두') {
        return getCharactersResponse.data;
      } else {
        return getCharactersByDeathReasonResponse.data;
      }
    };

    const result = searchCharacterByDeathReason(fillDeath);
    setDeathReasonCharacters(result);
  }, [fillDeath]);

  useEffect(() => {
    const animeIds = getAnimesResponse.data.values
      .filter((anime: { name: string | string[] }) => (ani ? anime.name.includes(ani) : true))
      .map((anime: { animeId: any }) => anime.animeId);

    const final = getCharactersResponse.data.filter(
      (character: { name: string | string[]; animeId: any; deathReason: string }) => {
        const isNameMatched = name ? character.name.includes(name) : true;
        const isAnimeMatched = ani ? animeIds.includes(character.animeId) : true;
        const isDeathReasonMatched =
          fillDeath === '모두' ? true : character.deathReason === fillDeath;

        return isNameMatched && isAnimeMatched && isDeathReasonMatched;
      },
    );

    setFinalCharacters(final);
  }, [name, ani, fillDeath]);

  return (
    <_.main>
      <_.main_serve>
        <_.search_task
          ref={wrapperRef}
          isColumn={isColumn}
        >
          <Search_task
            fillDeath={fillDeath}
            setFillDeath={setFillDeath}
            ani={ani}
            setAni={setAni}
            name={name}
            setName={setName}
          />
          <Viewer characters={finalCharacters} />
        </_.search_task>
        <_.object>
          <div>
            <img src={Folder} />
            <div>0개체</div>
          </div>
        </_.object>
      </_.main_serve>
    </_.main>
  );
};

export default Search;
