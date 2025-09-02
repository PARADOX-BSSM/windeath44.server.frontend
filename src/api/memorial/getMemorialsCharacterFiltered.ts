// api/memorial/useGetMemorialsCharacterFilteredQuery.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { memorial } from '@/config';

// 명세에 맞춘 orderBy 타입
export type OrderBy =
  | 'recently-updated'
  | 'lately-updated'
  | 'ascending-bow-count'
  | 'descending-bow-count';

export interface FetchMemorialsParams {
  orderBy: OrderBy; // required
  page: number; // required
  characters: number[]; // required (빈 배열이면 서버가 빈 결과 반환할 가능성 ↑)
}

export interface MemorialItem {
  memorialId: number;
  characterId: number;
}

interface MemorialsResponse {
  message: string;
  data: MemorialItem[];
}

export const fetchMemorials = async ({ orderBy, page, characters }: FetchMemorialsParams) => {
  // 런타임 가드(디버깅 편의)
  if (!orderBy) throw new Error('orderBy is required');
  if (typeof page !== 'number') throw new Error('page must be a number');
  if (!Array.isArray(characters)) throw new Error('characters must be an array');

  // 캐릭터 ID 정리: 숫자만, 중복 제거, 정렬(캐시 키 안정화에도 사용)
  const uniqSorted = Array.from(new Set(characters.filter((n) => Number.isInteger(n)))).sort(
    (a, b) => a - b,
  );

  const response = await api.post<MemorialsResponse>(`${memorial}/character-filtered`, {
    orderBy,
    page,
    characters: uniqSorted,
  });
  return response.data; // { message, data }
};

export const useGetMemorialsCharacterFilteredQuery = ({
  orderBy,
  page,
  characters,
}: FetchMemorialsParams) => {
  const uniqSorted = Array.from(new Set(characters.filter((n) => Number.isInteger(n)))).sort(
    (a, b) => a - b,
  );

  return useQuery({
    queryKey: ['memorials', orderBy, page, uniqSorted], // 배열은 정렬된 복사본으로
    queryFn: () => fetchMemorials({ orderBy, page, characters: uniqSorted }),
    enabled: uniqSorted.length > 0, // 빈 배열이면 호출 스킵(원하면 true로)                           // 페이지 전환 깜빡임 최소화
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    // 사용처 단순화 원하면 아래 활성화:
    // select: (resp) => resp.data,
  });
};
