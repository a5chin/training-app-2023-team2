import useAspidaSWR from '@aspida/swr';
import { aspidaClient } from '@/lib/aspida';

export const usePosts = () => {
  console.log(aspidaClient.posts);
  // TODO: ページング対応
  const { data, error } = useAspidaSWR(aspidaClient.posts, 'get');

  return {
    posts: data?.body.posts,
    isError: error,
  };
};
