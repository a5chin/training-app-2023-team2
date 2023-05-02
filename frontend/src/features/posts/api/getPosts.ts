import useSWR, { Fetcher } from 'swr';
import { axios } from '@/lib/axios';
import { Posts } from '../types';

type PostsResponseType = {
  posts: Posts;
};

const fetcher: Fetcher<PostsResponseType> = () =>
  axios.get('/posts').then((res) => res.data);

export const usePosts = () => {
  // TODO: ページング対応
  const { data, error, isLoading } = useSWR('/posts', fetcher);

  return {
    posts: data?.posts,
    isLoading,
    isError: error,
  };
};
