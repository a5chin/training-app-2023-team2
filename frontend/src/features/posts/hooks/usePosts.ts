import useAspidaSWR from '@aspida/swr';
import { axios } from '@/lib/axios';
import { aspidaClient } from '@/lib/aspida';

export const usePosts = () => {
  const { data, error, isLoading, mutate } = useAspidaSWR(
    aspidaClient.posts,
    'get'
  );

  const postTweet = async (content: string) => {
    const formData = new FormData();
    formData.append('content', content);

    await axios.post('/posts', formData, {
      withCredentials: true,
    });
    mutate();
  };

  return {
    posts: data?.body.posts,
    isLoading,
    isError: error,
    mutate,
    postTweet,
  };
};
