import useAspidaSWR from '@aspida/swr';
import { aspidaClient } from '@/lib/aspida';

export const usePosts = () => {
  console.log(aspidaClient.posts);
  // TODO: ページング対応
  const { data, error, isLoading, mutate } = useAspidaSWR(
    aspidaClient.posts,
    'get'
  );

  return {
    posts: data?.body.posts,
    isLoading,
    isError: error,
    mutate,
  };
};
