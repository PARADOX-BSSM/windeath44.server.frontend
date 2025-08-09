// src/api/anime/getCharactersIntegrated.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { anime } from '@/config';
import qs from 'qs';

export interface FetchIntegratedCharactersParams {
  name?: string;
  animeId?: (string | number)[]; // array[string] 스펙
  deathReason?: string;
  cursorId?: number;             // 페이지네이션
  size?: number;                 // 페이지네이션
}

const sanitize = (p: FetchIntegratedCharactersParams) => {
  const out: Record<string, any> = {};
  if (p.name && p.name.trim() !== '') out.name = p.name.trim();
  if (p.deathReason && p.deathReason.trim() !== '') out.deathReason = p.deathReason.trim();
  if (Array.isArray(p.animeId)) {
    const arr = p.animeId.map(String).map(s => s.trim()).filter(Boolean);
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
    withCredentials: true,
    paramsSerializer: (pp) =>
      qs.stringify(pp, { arrayFormat: 'repeat', skipNulls: true }),
  });
  return res.data; // 응답 스키마 확정되면 타입 지정
};

export const useGetIntegratedCharactersQuery = (params: FetchIntegratedCharactersParams) => {
  const clean = sanitize(params);
  return useQuery({
    queryKey: ['integratedCharacters', clean],
    queryFn: () => fetchIntegratedCharacters(clean),
    enabled:
      Object.prototype.hasOwnProperty.call(clean, 'name') ||
      Object.prototype.hasOwnProperty.call(clean, 'deathReason') ||
      Object.prototype.hasOwnProperty.call(clean, 'animeId') ||
      Object.prototype.hasOwnProperty.call(clean, 'cursorId') ||
      Object.prototype.hasOwnProperty.call(clean, 'size'),
    // 페이지 전환시 깜빡임 방지 원하면 아래 옵션 켜기
    // keepPreviousData: true,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
};
