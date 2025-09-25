import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../axiosInstance';
import { memorial } from '@/config';

interface RejectMemorialPullRequestRequest {
  memorialPullRequestId: number;
}

interface RejectMemorialPullRequestResponse {
  message: string;
  data: null;
}

const rejectMemorialPullRequest = async (
  memorialPullRequestId: number,
): Promise<RejectMemorialPullRequestResponse> => {
  const response = await axiosInstance.patch(`${memorial}/reject`, {
    memorialPullRequestId,
  });
  return response.data;
};

export const useRejectMemorialPullRequestMutation = () => {
  return useMutation({
    mutationFn: rejectMemorialPullRequest,
    onSuccess: (data) => {
      console.log('Memorial Pull Request rejected successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to reject Memorial Pull Request:', error);
    },
  });
};
