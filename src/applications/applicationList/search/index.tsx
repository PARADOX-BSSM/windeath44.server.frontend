import { memo, useEffect, useMemo, useRef, useState } from 'react';
import * as _ from '@/applications/applicationList/search/style.ts';
import Folder from '@/assets/search/folder.svg';
import Search_task from '@/applications/applicationList/search/search_task';
import Viewer from '@/applications/applicationList/search/viewer';
import { useGetIntegratedCharactersQuery } from '@/api/anime/getCharactersByIntegratedSearching';
import { fetchAnimesPage } from '@/api/anime/getAnimes';
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { memorial } from '@/config';

type Character = { characterId: number; [k: string]: any };
type AnimeItem = { animeId: number; [k: string]: any };

const EMPTY_ARR = Object.freeze([]) as readonly any[];

const Search = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isColumn, setIsColumn] = useState(false);

  // 검색 상태
  const [fillDeath, setFillDeath] = useState<'모두' | string>('모두');
  const [ani, setAni] = useState(''); // 애니 이름(검색어)
  const [name, setName] = useState(''); // 캐릭터 이름(검색어)

  // 페이지네이션 (cursor 기반)
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);

  // ------ 파라미터 정규화 ------
  const deathParam = useMemo(() => (fillDeath === '모두' ? undefined : fillDeath), [fillDeath]);
  const nameParam = useMemo(() => (name.trim() ? name.trim() : undefined), [name]);
  const aniParam = useMemo(() => (ani.trim() ? ani.trim() : undefined), [ani]);

  // 새 검색 조건이 생기면 커서 리셋
  useEffect(() => {
    setCursorId(undefined);
  }, [nameParam, deathParam, aniParam]);

  // ------ 애니 이름 -> 애니 ID 조회 (검색어 있을 때만) ------
  const [animesResp, setAnimesResp] = useState<any>(null);
  const [isAnimesLoading, setIsAnimesLoading] = useState(false);
  const [isAnimesError, setIsAnimesError] = useState(false);

  useEffect(() => {
    let aborted = false;
    const run = async () => {
      if (!aniParam) {
        setAnimesResp(null);
        return;
      }
      setIsAnimesLoading(true);
      setIsAnimesError(false);
      try {
        const resp = await fetchAnimesPage({ size: 50, animeName: aniParam });
        if (!aborted) setAnimesResp(resp);
      } catch (e) {
        if (!aborted) setIsAnimesError(true);
      } finally {
        if (!aborted) setIsAnimesLoading(false);
      }
    };
    run();
    return () => {
      aborted = true;
    };
  }, [aniParam]);

  // 서버 스키마가 { data: { values: AnimeItem[] } } 라고 가정
  const animeIdParam = useMemo<string[] | undefined>(() => {
    const values = (animesResp?.data?.data as AnimeItem[] | undefined) ?? [];
    if (!values.length) return undefined; // 검색어 비었거나 결과 없으면 필터 미적용 = 전체
    const ids = values.map((v) => v?.animeId).filter((id): id is number => typeof id === 'number');
    return ids.length ? ids.map(String) : undefined; // API가 array[string] 기대 시 문자열화
  }, [animesResp]);

  // ------ 1) 통합 캐릭터 검색 (항상 실행: 비어 있으면 전체 결과) ------
  const {
    data: integrated,
    isLoading,
    isError,
  } = useGetIntegratedCharactersQuery({
    name: nameParam, // 비어있으면 sanitize에서 제거 → 전체
    animeId: animeIdParam, // undefined면 제거 → 전체
    deathReason: deathParam, // undefined면 제거 → 전체
    size: 100,
    cursorId,
  });

  // ✅ 교체된 정규화 블록
  const normalized = useMemo(() => {
    const p = integrated as any;

    let values =
      p?.values ?? p?.data?.values ?? (Array.isArray(p?.data) ? p.data : undefined) ?? [];

    if (!Array.isArray(values) && values?.values && Array.isArray(values.values)) {
      values = values.values;
    }

    const next =
      (typeof p?.nextCursorId === 'number' && p.nextCursorId) ??
      (typeof p?.data?.nextCursorId === 'number' && p.data.nextCursorId) ??
      undefined;

    return { values, nextCursorId: next };
  }, [integrated]);

  const characters = normalized.values as Character[];

  const characterIds = useMemo<number[]>(
    () =>
      characters.map((c) => c?.characterId).filter((id): id is number => typeof id === 'number'),
    [characters],
  );

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  // queryKey 안정화: 정렬된 복사본 사용
  const characterKey = useMemo(
    () => (characterIds.length ? [...characterIds].sort((a, b) => a - b) : []),
    [characterIds],
  );

  // ------ 2) 캐릭터 ID로 추모관 목록 조회 ------
  const {
    data: memorialsResp,
    isLoading: isMemorialLoading,
    isError: isMemorialError,
  } = useQuery({
    queryKey: ['memorials', 'recently-updated', 1, characterKey],
    enabled: characterKey.length > 0,
    queryFn: async () => {
      const resp = await api.post(
        `${memorial}/character-filtered`,
        { orderBy: 'recently-updated', page: 1, characters: characterKey },
        { withCredentials: true },
      );
      return resp.data as {
        message: string;
        data: { memorialId: number; characterId: number }[];
      };
    },
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });

  const memorials = memorialsResp?.data ?? [];

  useEffect(() => {
    console.log(memorials);
  }, [memorials]);

  const onLoadMore = () => {
    if (typeof normalized.nextCursorId === 'number') setCursorId(normalized.nextCursorId);
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

          {isBusy ? (
            <div>불러오는 중...</div>
          ) : hasError ? (
            <div>검색 중 오류가 발생했습니다.</div>
          ) : characters.length > 0 ? (
            <Viewer
              characters={characters}
              memorials={memorials}
            />
          ) : (
            <div>결과가 없습니다.</div>
          )}
        </_.search_task>

        <_.object>
          <div>
            <img
              src={Folder}
              alt="folder"
            />
            <div>{characters.length}개체</div>
          </div>
        </_.object>
      </_.main_serve>
    </_.main>
  );
};

export default Search;
