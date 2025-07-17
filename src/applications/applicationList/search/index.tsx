import { useEffect, useRef, useState } from 'react';
import * as _ from '@/applications/applicationList/search/style.ts';
import Folder from '@/assets/search/folder.svg';
import Search_task from '@/applications/applicationList/search/search_task';
import Viewer from '@/applications/applicationList/search/viewer';
import { useGetCharactersQuery } from '@/api/anime/getCharacters';
import { useGetCharactersByAnimeQuery } from '@/api/anime/getCharactersByAnimeId';
import { useGetAnimesQuery } from '@/api/anime/getAnimes';
import { useGetCharactersByDeathReasonQuery } from '@/api/anime/getCharactersByDeathReason';
import { useGetMemorialsCharacterFilteredQuery } from '@/api/memorial/getMemorialsCharacterFiltered';
import { useGetMemorialsQuery } from '@/api/memorial/getMemorials';

const Search = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isColumn, setIsColumn] = useState(false);

  const [fillDeath, setFillDeath] = useState('모두');
  const [ani, setAni] = useState('');
  const [animeIds, setAnimeIds] = useState<number[]>([23176]);
  const [name, setName] = useState('');
  const [finalCharactersIds, setFinalCharactersIds] = useState<any[]>([2]);
  const [finalCharacters, setFinalCharacters] = useState<any[]>([]);
  const [finalMemorials, setFinalMemorials] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const {
    data: getMemorialsResponse,
    isLoading: isMemorialLoading,
    isError: isMemorialError,
  } = useGetMemorialsQuery({
    orderBy: 'recently-updated',
    page: page,
  });

  useEffect(() => {
    if (getMemorialsResponse) {
      setFinalMemorials(getMemorialsResponse?.data ?? []);
      console.log(getMemorialsResponse?.data);
    }
  }, [getMemorialsResponse]);

  const {
    data: getCharactersResponse,
    isLoading: isLoading,
    isError: isError,
  } = useGetCharactersQuery({}); // 모든 캐릭터

  useEffect(() => {
    if (getCharactersResponse) {
      setFinalCharacters(getCharactersResponse?.data?.values ?? []);
      console.log(getCharactersResponse?.data?.values);
    }
  }, [getCharactersResponse]);

  useEffect(() => {
    if (!getCharactersResponse?.data?.values) return;

    const filtered = getCharactersResponse.data.values.filter(
      (character: { name: string; deathReason: string }) => {
        const nameMatched = name ? character.name.includes(name) : true;
        const deathReasonMatched =
          fillDeath === '모두' ? true : character.deathReason === fillDeath;
        return nameMatched && deathReasonMatched;
      },
    );

    setFinalCharacters(filtered);
  }, [name, fillDeath, getCharactersResponse]);

  // const {
  //   data: getAnimesResponse,
  //   isLoading: isLoadingByAnimes,
  //   isError: isErrorByAnimes,
  // } = useGetAnimesQuery({ size: 10, animeName: ani }); // 이름으로 애니메이션 검색

  // useEffect(() => {
  //   console.log(getAnimesResponse);
  // }, [getAnimesResponse]);

  // const {
  //   data: getAllAnimesResponse,
  //   isLoading: isLoadingByAllAnimes,
  //   isError: isErrorByAllAnimes,
  // } = useGetAnimesQuery({ size: 10 }); // 모든 애니메이션

  // useEffect(() => {
  //   console.log(getAllAnimesResponse);
  // }, [getAllAnimesResponse]);

  // const {
  //   data: getCharactersByAnimeIdResponse,
  //   isLoading: isLoadingByAnimeId,
  //   isError: isErrorByAnimeId,
  // } = useGetCharactersByAnimeQuery({
  //   animeId: animeIds,
  // }); // 애니메이션 ID로 캐릭터 찾기

  // useEffect(() => {
  //   console.log(getCharactersByAnimeIdResponse);
  // }, [getCharactersByAnimeIdResponse]);

  // const {
  //   data: getCharactersByDeathReasonResponse,
  //   isLoading: isLoadingByDeathReason,
  //   isError: isErrorByDeathReason,
  // } = useGetCharactersByDeathReasonQuery({
  //   deathReason: realDeath,
  //   size: 10,
  // });

  // useEffect(() => {
  //   console.log(getCharactersByDeathReasonResponse);
  // }, [getCharactersByDeathReasonResponse]);

  // const {
  //   data: getMemorialsCharacterFilteredResponse,
  //   isLoading: isLoadingCharacterFiltered,
  //   isError: isErrorCharacterFiltered,
  // } = useGetMemorialsCharacterFilteredQuery({
  //   orderBy: 'recently-updated',
  //   page: 1,
  //   characters: finalCharactersIds,
  // });

  // useEffect(() => {
  //   console.log(getMemorialsCharacterFilteredResponse);
  // }, [getMemorialsCharacterFilteredResponse]);

  const [characters, setCharacters] = useState<any[]>([]);

  const [searchedCharacters, setSearchedCharacters] = useState<any[]>([]);
  const [deathReasonCharacters, setDeathReasonCharacters] = useState<any[]>([]);

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

  // useEffect(() => {
  //   if (!getCharactersResponse?.data || !getAllAnimesResponse?.data?.values) return;

  //   setFinalCharacters(getCharactersResponse.data);

  //   const animeIds = getAllAnimesResponse.data.values.map(
  //     (anime: { animeId: number }) => anime.animeId,
  //   );
  //   setAnimeIds(animeIds);
  // }, [getCharactersResponse, getAllAnimesResponse]);

  // // 캐릭터 이름
  // useEffect(() => {
  //   if (!getCharactersResponse?.data) return;

  //   const filtered = getCharactersResponse.data.filter((character: { name: string }) =>
  //     character.name.includes(name),
  //   );

  //   setCharacters(filtered);
  // }, [name, getCharactersResponse]);

  // 애니메이션 이름
  // useEffect(() => {
  //   // 이름으로 애니메이션 찾기
  //   const searchAnimeByName = (keyword: string) => {
  //     if (keyword) {
  //       return getAnimesResponse?.data?.values;
  //     } else {
  //       return getAllAnimesResponse?.data?.values;
  //     }
  //   };

  // const result = searchAnimeByName(ani);

  // const getAnimeIds = (animes: typeof result): number[] => {
  //   return animes?.map((anime: { animeId: number }) => anime.animeId);
  // };
  // const animeIds = getAnimeIds(result);
  // setAnimeIds(animeIds);

  // // 애니메이션 ID로 캐릭터 찾기
  // const searchCharacterByAnimeIds = (ids: number[]) => {
  //   if (ids?.[0]) {
  //     return getCharactersByAnimeIdResponse?.data;
  //   } else {
  //     return getCharactersResponse?.data;
  //   }
  // };

  //   const characters = searchCharacterByAnimeIds(animeIds);
  //   setSearchedCharacters(characters);
  // }, [
  //   ani,
  //   getAnimesResponse,
  //   getAllAnimesResponse,
  //   getCharactersByAnimeIdResponse,
  //   getCharactersResponse,
  // ]);

  // // 사인
  // useEffect(() => {
  //   const searchCharacterByDeathReason = (reason: string) => {
  //     if (reason === '모두') {
  //       return getCharactersResponse?.data;
  //     } else {
  //       setRealDeath(reason);
  //       return getCharactersByDeathReasonResponse?.data;
  //     }
  //   };

  //   const result = searchCharacterByDeathReason(fillDeath);
  //   setDeathReasonCharacters(result);
  // }, [fillDeath]);

  // useEffect(() => {
  //   if (!getCharactersResponse?.data) return;

  //   const animeIds = getAnimesResponse?.data?.values
  //     ?.filter((anime: { name: string | string[] }) => (ani ? anime.name.includes(ani) : true))
  //     ?.map((anime: { animeId: any }) => anime.animeId);

  //   const final = getCharactersResponse?.data?.filter(
  //     (character: { name: string | string[]; animeId: any; deathReason: string }) => {
  //       const isNameMatched = name ? character.name.includes(name) : true;
  //       const isAnimeMatched = ani ? animeIds?.includes(character.animeId) : true;
  //       const isDeathReasonMatched =
  //         fillDeath === '모두' ? true : character.deathReason === fillDeath;

  //       return isNameMatched && isAnimeMatched && isDeathReasonMatched;
  //     },
  //   );

  //   setFinalCharacters(final || []);

  //   const getCharacterIds = (characters: typeof final): number[] => {
  //     return characters?.map((character: { characterId: number }) => character.characterId) ?? [];
  //   };
  //   const ids = getCharacterIds(final);
  //   setFinalCharactersIds(ids);
  // }, [name, ani, fillDeath, getCharactersResponse, getAnimesResponse]);

  // useEffect(() => {
  //   console.log(finalCharacters);
  // }, [finalCharacters]);

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
          {finalCharacters.length > 0 && finalMemorials.length > 0 ? (
            <Viewer
              characters={finalCharacters}
              memorials={finalMemorials}
              // memorials={getMemorialsCharacterFilteredResponse?.data}
            />
          ) : (
            <div>Loading Viewer...</div>
          )}
        </_.search_task>
        <_.object>
          <div>
            <img src={Folder} />
            <div>{finalCharacters?.length ? finalCharacters?.length : 0}개체</div>
          </div>
        </_.object>
      </_.main_serve>
    </_.main>
  );
};

export default Search;
