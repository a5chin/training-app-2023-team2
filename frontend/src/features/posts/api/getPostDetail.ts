import useAspidaSWR from '@aspida/swr';
import { aspidaClient } from '@/lib/aspida';

export const usePostDetail = (postId: string) => {
  const { data, error, isLoading, mutate } = useAspidaSWR(
    aspidaClient.posts._postId(postId),
    'get'
  );

  return {
    post: data?.body,
    isLoading,
    isError: error,
    mutate,
  };
};
