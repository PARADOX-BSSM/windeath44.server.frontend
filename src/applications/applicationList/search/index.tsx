import { useEffect, useRef, useState } from 'react';
import * as _ from '@/applications/applicationList/search/style.ts';
import Folder from '@/assets/search/folder.svg';
import Search_task from '@/applications/applicationList/search/search_task';
import Viewer from '@/applications/applicationList/search/viewer';
import { useGetCharactersQuery } from '@/api/anime/getCharacters';
import { useGetCharactersByAnimeQuery } from '@/api/anime/getCharactersByAnimeId';
import { dummyFindCharacterResponse } from './data';
import { dummyFindMemorialsResponse } from './memorials';
import { dummyFindAnimesResponse } from './animes';

const Search = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isColumn, setIsColumn] = useState(false);

  const [fillDeath, setFillDeath] = useState('모두');
  const [ani, setAni] = useState('');
  const [name, setName] = useState('');

  // const { data, isLoading, isError } = useGetCharactersQuery({});
  // const { dataByAnimeId, isLoadingByAnimeId, isErrorByAnimeId } = useGetCharactersByAnimeQuery({
  //   animeId,
  // });

  const [memorials, setMemorials] = useState<any[]>([]);
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
    if (dummyFindCharacterResponse?.data) {
      setFinalCharacters(dummyFindCharacterResponse?.data);
    }
    if (dummyFindMemorialsResponse?.data) {
      setMemorials(dummyFindMemorialsResponse?.data);
    }
  }, []);

  // 캐릭터 이름
  useEffect(() => {
    const searchCharacterByName = (keyword: string) => {
      if (!keyword) return dummyFindCharacterResponse.data;

      return dummyFindCharacterResponse.data.filter((character) =>
        character.name.includes(keyword),
      );
    };

    const result = searchCharacterByName(name);
    setCharacters(result);
  }, [name]);

  // 애니메이션 이름
  useEffect(() => {
    const searchAnimeByName = (keyword: string) => {
      if (keyword) {
        return dummyFindAnimesResponse.data.values.filter((anime) => anime.name.includes(keyword));
      } else {
        return dummyFindAnimesResponse.data.values;
      }
    };

    const result = searchAnimeByName(ani);

    const getAnimeIds = (animes: typeof result): number[] => {
      return animes.map((anime) => anime.animeId);
    };

    const animeIds = getAnimeIds(result);

    const searchCharacterByAnimeIds = (ids: number[]) => {
      if (ids[0]) {
        return dummyFindCharacterResponse.data.filter((character) =>
          ids.includes(character.animeId),
        );
      } else {
        return dummyFindCharacterResponse.data;
      }
    };

    const characters = searchCharacterByAnimeIds(animeIds);
    setSearchedCharacters(characters);
  }, [ani]);

  // 사인
  useEffect(() => {
    const searchCharacterByDeathReason = (reason: string) => {
      if (reason === '모두') {
        return dummyFindCharacterResponse.data;
      } else {
        return dummyFindCharacterResponse.data.filter(
          (character) => character.deathReason === reason,
        );
      }
    };

    const result = searchCharacterByDeathReason(fillDeath);
    setDeathReasonCharacters(result);
  }, [fillDeath]);

  useEffect(() => {
    const animeIds = dummyFindAnimesResponse.data.values
      .filter((anime) => (ani ? anime.name.includes(ani) : true))
      .map((anime) => anime.animeId);

    const final = dummyFindCharacterResponse.data.filter((character) => {
      const isNameMatched = name ? character.name.includes(name) : true;
      const isAnimeMatched = ani ? animeIds.includes(character.animeId) : true;
      const isDeathReasonMatched =
        fillDeath === '모두' ? true : character.deathReason === fillDeath;

      return isNameMatched && isAnimeMatched && isDeathReasonMatched;
    });

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
