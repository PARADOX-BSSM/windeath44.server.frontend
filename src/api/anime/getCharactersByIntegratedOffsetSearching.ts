import { useQuery } from '@tanstack/react-query';
import { anime } from '@/config';
import qs from 'qs';
import axios from 'axios';

export interface FetchIntegratedCharactersOffsetParams {
  name?: string;
  animeId?: (string | number)[];
  deathReason?: string;
  page?: number;
  size?: number;
  memorialState?: string;
}

const sanitize = (p: FetchIntegratedCharactersOffsetParams) => {
  const out: Record<string, any> = {};
  if (p.name && p.name.trim() !== '') out.name = p.name.trim();
  if (p.deathReason && p.deathReason.trim() !== '') out.deathReason = p.deathReason.trim();
  if (p.memorialState && p.memorialState.trim() !== '') out.memorialState = p.memorialState.trim();
  if (Array.isArray(p.animeId)) {
    const arr = p.animeId
      .map(String)
      .map((s) => s.trim())
      .filter(Boolean);
    if (arr.length) out.animeId = arr;
  }
  if (typeof p.page === 'number') out.page = p.page;
  if (typeof p.size === 'number') out.size = p.size;
  return out;
};

export const fetchIntegratedCharactersOffset = async (
  params: FetchIntegratedCharactersOffsetParams,
) => {
  const clean = sanitize(params);
  console.log(`${anime}`);
  const res = await axios.get(`${anime}/characters/search/integrated/offset`, {
    params: clean,
    paramsSerializer: (pp) => qs.stringify(pp, { arrayFormat: 'repeat', skipNulls: true }),
  });
  return res.data; // { values, nextCursorId } 가정
};

export const useGetIntegratedCharactersOffsetQuery = (
  params: FetchIntegratedCharactersOffsetParams,
) => {
  const clean = sanitize(params);
  return useQuery({
    queryKey: ['integratedCharactersOffset', JSON.stringify(clean)],
    queryFn: () => fetchIntegratedCharactersOffset(clean),
    enabled: true, // ✅ 항상 실행 (비어 있으면 전체 결과)
    staleTime: 0,
    gcTime: 5 * 60_000,
    // keepPreviousData: true, // 페이징 중 깜빡임 줄이고 싶으면
  });
};
