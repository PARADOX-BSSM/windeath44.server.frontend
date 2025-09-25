import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { anime } from '@/config';
import qs from 'qs';

export interface FetchIntegratedCharactersParams {
  name?: string;
  animeId?: (string | number)[];
  deathReason?: string;
  cursorId?: number;
  size?: number;
  memorialState?: string;
}

const sanitize = (p: FetchIntegratedCharactersParams) => {
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
  if (typeof p.cursorId === 'number') out.cursorId = p.cursorId;
  if (typeof p.size === 'number') out.size = p.size;
  return out;
};

export const fetchIntegratedCharacters = async (params: FetchIntegratedCharactersParams) => {
  const clean = sanitize(params);
  const res = await api.get(`${anime}/characters/search/integrated`, {
    params: clean,
    paramsSerializer: (pp) => qs.stringify(pp, { arrayFormat: 'repeat', skipNulls: true }),
  });
  return res.data; // { values, nextCursorId } 가정
};

export const useGetIntegratedCharactersQuery = (params: FetchIntegratedCharactersParams) => {
  const clean = sanitize(params);
  return useQuery({
    queryKey: ['integratedCharacters', clean],
    queryFn: () => fetchIntegratedCharacters(clean),
    enabled: true, // ✅ 항상 실행 (비어 있으면 전체 결과)
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    // keepPreviousData: true, // 페이징 중 깜빡임 줄이고 싶으면
  });
};
