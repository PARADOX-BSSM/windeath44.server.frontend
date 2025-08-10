import { useEffect, useMemo, useRef, useState } from 'react';
import * as _ from '@/applications/applicationList/search/style.ts';
import Folder from '@/assets/search/folder.svg';
import Search_task from '@/applications/applicationList/search/search_task';
import Viewer from '@/applications/applicationList/search/viewer';
import { useGetIntegratedCharactersQuery } from '@/api/anime/getCharactersByIntegratedSearching';
import { useGetAnimesQuery } from '@/api/anime/getAnimes';
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { memorial } from '@/config';

const EMPTY_ARR: any[] = [];

const Search = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isColumn, setIsColumn] = useState(false);

  // 검색 상태
  const [fillDeath, setFillDeath] = useState('모두');
  const [ani, setAni] = useState('');     // 애니 이름(검색어)
  const [name, setName] = useState('');   // 캐릭터 이름(검색어)

  // 페이지네이션 (cursor 기반)
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);

  // ------ 파라미터 정규화 ------
  const deathParam = useMemo(
    () => (fillDeath === '모두' ? undefined : fillDeath),
    [fillDeath]
  );
  const nameParam = useMemo(
    () => (name.trim() ? name.trim() : undefined),
    [name]
  );
  const aniParam = useMemo(
    () => (ani.trim() ? ani.trim() : undefined),
    [ani]
  );

  // ------ 애니 이름 -> 애니 ID 조회 ------
  const {
    data: animesResp,
    isLoading: isAnimesLoading,
    isError: isAnimesError,
  } = useGetAnimesQuery({
    size: 10,
    animeName: aniParam, // 빈 문자열이면 undefined → 서버가 무시하도록 설계되어 있다면 OK
    // cursorId: undefined,
  });

  // 애니 ID들을 통합 검색용 파라미터로 변환 (문자열 배열)
  const animeIdParam = useMemo(() => {
    const values = animesResp?.data?.values ?? EMPTY_ARR;
    if (!values.length) return undefined;
    return values
      .map((v: any) => v?.animeId)
      .filter((id: any): id is number => typeof id === 'number')
      .map(String);
  }, [animesResp]);

  useEffect(() => {
    console.log('params ->', { nameParam, animeIdParam, deathParam });
  }, [nameParam, animeIdParam, deathParam]);

  // ------ 1) 통합 캐릭터 검색 ------
  const {
    data: integrated,
    isLoading,
    isError,
  } = useGetIntegratedCharactersQuery({
    name: nameParam,            // undefined면 전송 안 됨
    animeId: animeIdParam,      // ani 없거나 결과 없으면 undefined
    deathReason: deathParam,    // '모두'면 undefined
    size: 30,
    cursorId,
  });

  const characters = useMemo(
    () => (integrated?.values ?? integrated?.data?.values ?? EMPTY_ARR),
    [integrated]
  );

  const characterIds = useMemo<number[]>(
    () =>
      characters
        .map((c: any) => c?.characterId)
        .filter((id: any): id is number => typeof id === 'number'),
    [characters]
  );

  // ------ 2) 캐릭터 ID로 추모관 목록 조회 ------
  const {
    data: memorialsResp,
    isLoading: isMemorialLoading,
    isError: isMemorialError,
  } = useQuery({
    queryKey: ['memorials', 'recently-updated', 1, characterIds],
    enabled: characterIds.length > 0, // 캐릭터 없으면 호출 안 함
    queryFn: async () => {
      const resp = await api.post(
        `${memorial}/character-filtered`,
        { orderBy: 'recently-updated', page: 1, characters: characterIds },
        { withCredentials: true }
      );
      return resp.data as {
        message: string;
        data: { memorialId: number; characterId: number }[];
      };
    },
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });

  const memorials = memorialsResp?.data ?? EMPTY_ARR;

  // (옵션) 다음 페이지 커서 처리
  const onLoadMore = () => {
    // if (typeof integrated?.nextCursorId === 'number') setCursorId(integrated.nextCursorId);
  };

  // 레이아웃 관찰
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const next = entry.contentRect.height >= 412;
        setIsColumn((prev) => (prev === next ? prev : next));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isBusy = isLoading || isMemorialLoading || isAnimesLoading;
  const hasError = isError || isMemorialError || isAnimesError;

  return (
    <_.main>
      <_.main_serve>
        <_.search_task ref={wrapperRef} isColumn={isColumn}>
          <Search_task
            fillDeath={fillDeath}
            setFillDeath={setFillDeath}
            ani={ani}
            setAni={setAni}
            name={name}
            setName={setName}
          />

          {characters.length > 0 || isBusy ? (
            <Viewer characters={characters} memorials={memorials} />
          ) : hasError ? (
            <div>검색 중 오류가 발생했습니다.</div>
          ) : (
            <div>추모관 불러오는중...</div>
          )}
        </_.search_task>

        <_.object>
          <div>
            <img src={Folder} />
            <div>{characters.length}개체</div>
          </div>
        </_.object>
      </_.main_serve>
    </_.main>
  );
};

export default Search;
