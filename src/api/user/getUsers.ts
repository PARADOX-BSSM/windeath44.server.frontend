import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { user } from '@/config';

interface UserResponse {
  userId: string;
  name: string;
  realinToken: number;
  profile: string;
  role: string;
}

interface GetUsersResponse {
  message: string;
  data: UserResponse[];
}

// 여러 사용자 정보를 가져오는 함수
const fetchUsers = async (userIds?: string[]): Promise<GetUsersResponse> => {
  if (!userIds || userIds.length === 0) {
    const response = await api.get(`${user}`);
    return response.data;
  }

  // URLSearchParams를 사용해 userIds를 여러 번 추가 (userIds=값1&userIds=값2 형태)
  const params = new URLSearchParams();
  userIds.forEach((userId) => {
    params.append('userIds', userId);
  });

  const response = await api.get(`${user}?${params.toString()}`);
  return response.data;
};

// 여러 사용자 정보를 조회하는 hook
export const useGetUsersQuery = (userIds?: string[]) => {
  return useQuery({
    queryKey: ['users', userIds],
    queryFn: () => fetchUsers(userIds),
    enabled: !!userIds && userIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};
