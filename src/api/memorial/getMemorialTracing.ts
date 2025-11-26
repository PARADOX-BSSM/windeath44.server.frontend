import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../axiosInstance';
import { memorial } from '@/config';
import React from 'react';

export interface MemorialTracingData {
  memorialId: number;
  viewedAt: number;
}

interface MemorialTracingResponse {
  message: string;
  data: {
    hasNext: boolean;
    data: MemorialTracingData[];
  };
}

interface TracingParams {
  size?: number;
  cursor?: number;
}

const getMemorialTracing = async ({
  size = 6,
  cursor,
}: TracingParams): Promise<MemorialTracingResponse> => {
  const response = await api.get(`${memorial}/tracing`, {
    params: {
      size,
      ...(cursor != null && { cursor }),
    },
  });
  return response.data;
};

export const useGetMemorialTracingQuery = (size: number = 6) => {
  return useQuery({
    queryKey: ['memorialTracing', size],
    queryFn: () => getMemorialTracing({ size }),
  });
};

export const useGetMemorialTracing = (
  setMemorialTracing: React.Dispatch<React.SetStateAction<MemorialTracingData[]>>,
  setHasNext: React.Dispatch<React.SetStateAction<boolean>>,
  isLoadMore: boolean = false,
) => {
  return useMutation<MemorialTracingResponse, Error, TracingParams>({
    mutationFn: getMemorialTracing,
    onSuccess: (data: MemorialTracingResponse) => {
      if (isLoadMore) {
        // 더보기: 기존 데이터에 추가
        setMemorialTracing((prev) => [...prev, ...data.data.data]);
      } else {
        // 초기 로드: 데이터 교체
        setMemorialTracing(data.data.data);
      }
      setHasNext(data.data.hasNext);
    },
    onError: (err: unknown) => {
      console.error('추모관 방문 기록 조회 실패', err);
    },
  });
};
