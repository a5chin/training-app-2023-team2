import useSWR, { Fetcher } from 'swr';
import { axios } from '@/lib/axios';
import { Posts } from '../types';

const fetcher: Fetcher<Posts> = () =>
  axios.get('/posts').then((res) => res.data);

export const usePosts = () => {
  // TODO: ページング対応
  const { data, error, isLoading } = useSWR('/posts', fetcher);

  return {
    posts: data,
    isLoading,
    isError: error,
  };
};
