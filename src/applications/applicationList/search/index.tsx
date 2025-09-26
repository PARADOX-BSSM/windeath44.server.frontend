import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

// debounce hook with immediate initial value
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // 첫 렌더링 시 즉시 값 설정 (초기 로딩)
    if (isFirstRender) {
      setDebouncedValue(value);
      setIsFirstRender(false);
      return;
    }

    // 이후부터는 debounce 적용
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, isFirstRender]);

  return debouncedValue;
};

const Search = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isColumn, setIsColumn] = useState(false);

  // 검색 상태
  const [fillDeath, setFillDeath] = useState<'모두' | string>('모두');
  const [ani, setAni] = useState(''); // 애니 이름(검색어)
  const [name, setName] = useState(''); // 캐릭터 이름(검색어)

  // debounced 검색어 (0.5초 지연)
  const debouncedAni = useDebounce(ani, 500);
  const debouncedName = useDebounce(name, 500);

  // 페이지네이션 (cursor 기반)
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);

  // ------ 파라미터 정규화 ------
  const deathParam = useMemo(() => (fillDeath === '모두' ? undefined : fillDeath), [fillDeath]);
  const nameParam = useMemo(() => (debouncedName.trim() ? debouncedName.trim() : undefined), [debouncedName]);
  const aniParam = useMemo(() => (debouncedAni.trim() ? debouncedAni.trim() : undefined), [debouncedAni]);

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
    if (!aniParam) return undefined; // 검색어가 없으면 undefined 반환
    const values = (animesResp?.data?.data as AnimeItem[] | undefined) ?? [];
    if (!values.length) return []; // 검색어가 있지만 결과 없으면 빈 배열 = 검색 결과 없음
    const ids = values.map((v) => v?.animeId).filter((id): id is number => typeof id === 'number');
    return ids.length ? ids.map(String) : []; // API가 array[string] 기대 시 문자열화
  }, [animesResp, aniParam]);

  // ------ 1) 통합 캐릭터 검색 (항상 실행: 비어 있으면 전체 결과) ------
  const { data: integrated, isLoading: isIntegratedLoading, isError: isIntegratedError } = useGetIntegratedCharactersQuery({
    name: nameParam, // 비어있으면 sanitize에서 제거 → 전체
    animeId: animeIdParam, // undefined면 제거 → 전체
    deathReason: deathParam, // undefined면 제거 → 전체
    size: 100,
    cursorId,
    memorialState: 'MEMORIALIZING',
  });

  const normalized = useMemo(() => {
    const p = integrated as any;

    // console.log('Normalizing integrated data:', p);

    let values = [];

    // 다양한 응답 구조 처리
    if (p?.data?.data && Array.isArray(p.data.data)) {
      values = p.data.data; // { data: { data: [...] } }
    } else if (p?.values && Array.isArray(p.values)) {
      values = p.values; // { values: [...] }
    } else if (p?.data?.values && Array.isArray(p.data.values)) {
      values = p.data.values; // { data: { values: [...] } }
    } else if (Array.isArray(p?.data)) {
      values = p.data; // { data: [...] }
    } else if (Array.isArray(p)) {
      values = p; // [...]
    }

    const next =
      (typeof p?.nextCursorId === 'number' && p.nextCursorId) ??
      (typeof p?.data?.nextCursorId === 'number' && p.data.nextCursorId) ??
      (typeof p?.data?.data?.nextCursorId === 'number' && p.data.data.nextCursorId) ??
      undefined;

    // console.log('Normalized values:', values, 'nextCursorId:', next);

    return { values, nextCursorId: next };
  }, [integrated]);

  const characters = normalized.values as Character[];

  const characterIds = useMemo<number[]>(
    () =>
      characters.map((c) => c?.characterId).filter((id): id is number => typeof id === 'number'),
    [characters],
  );

  // useEffect(() => {
  //   console.log(characters);
  // }, [characters]);

  // queryKey 안정화: 정렬된 복사본 사용
  const characterKey = useMemo(
    () => characterIds,
    [characterIds],
  );

  // ------ 2) 캐릭터 ID로 추모관 목록 조회 ------
  const {
    data: memorialsResp,
    isLoading: isMemorialLoading,
    isError: isMemorialError,
  } = useQuery({
    queryKey: ['memorials', 'recently-updated', 1, characterKey],
    enabled: characterKey.length > 0 && !isAnimesLoading && (!aniParam || animeIdParam !== undefined),
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

  // useEffect(() => {
  //   console.log('Search - Characters:', characters.length, 'Memorials:', memorials.length);
  //   console.log('Memorials data:', memorials);
  //   console.log('Loading states - Animes:', isAnimesLoading, 'Memorial:', isMemorialLoading, 'Integrated:', isIntegratedLoading);
  //   console.log('Error states - Animes:', isAnimesError, 'Memorial:', isMemorialError, 'Integrated:', isIntegratedError);
  //   console.log('Search params - name:', nameParam, 'animeId:', animeIdParam, 'death:', deathParam);
  //   console.log('CharacterIds:', characterIds, 'CharacterKey:', characterKey);
  //   console.log('Memorial query enabled:', characterKey.length > 0 && !isAnimesLoading && (!aniParam || animeIdParam !== undefined));
  //   console.log('Raw integrated data:', integrated);
  // }, [memorials, characters, isAnimesLoading, isMemorialLoading, isAnimesError, isMemorialError, isIntegratedLoading, isIntegratedError, nameParam, animeIdParam, deathParam, integrated, characterIds, characterKey, aniParam]);

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

          <Viewer
            characters={characters}
            memorials={memorials}
          />
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
