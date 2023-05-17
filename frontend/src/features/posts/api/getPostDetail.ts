import useSWR from 'swr';
import { axios } from '@/lib/axios';
import { Post } from '../types';

type PostDetailFetcher = (key: string, postId: string) => Promise<Post>;

const fetcher: PostDetailFetcher = (_: string, postId: string) =>
  axios.get(`/posts/${postId}`).then((res) => res.data);

export const usePostDetail = (postId: string) => {
  const { data, error, isLoading } = useSWR(
    [`/posts/${postId}`, postId],
    fetcher
  );

  return {
    post: data,
    isLoading,
    isError: error,
  };
};
