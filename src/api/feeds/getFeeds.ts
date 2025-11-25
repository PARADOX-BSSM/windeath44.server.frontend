import { useMutation } from '@tanstack/react-query';
import { feeds } from '@/config';
import api from '@/api/axiosInstance';
import { FeedsResponse } from '@/atoms/feeds';

interface GetFeedsParams {
  days?: number;
  size?: number;
}

const fetchFeeds = async (params?: GetFeedsParams): Promise<FeedsResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.days) {
    queryParams.append('days', params.days.toString());
  }
  if (params?.size) {
    queryParams.append('size', params.size.toString());
  }

  const queryString = queryParams.toString();
  const url = queryString ? `${feeds}?${queryString}` : feeds;

  return (await api.get(url)).data;
};

export const useGetFeedsMutation = () => {
  return useMutation({
    mutationFn: (params?: GetFeedsParams) => fetchFeeds(params),
  });
};
