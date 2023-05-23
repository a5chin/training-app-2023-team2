import useAspidaSWR from '@aspida/swr';
import { axios } from '@/lib/axios';
import { aspidaClient } from '@/lib/aspida';
import { Post } from '@/features/posts';

type UsePostsResponse = {
  posts: Post[];
  isLoading: boolean;
  error: Error;
  mutate: () => void;
  postTweet: (content: string) => void;
  addFavorite: (postId: string) => void;
  deleteFavorite: (postId: string) => void;
};

export const usePosts = (): UsePostsResponse => {
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
    await mutate();
  };

  const addFavorite = async (postId: string) => {
    const favoriteClient = aspidaClient.posts._postId(postId).favorites;
    await favoriteClient.$post();
    await mutate();
  };

  const deleteFavorite = async (postId: string) => {
    const favoriteClient = aspidaClient.posts._postId(postId).favorites;
    await favoriteClient.$delete();
    await mutate();
  };

  return {
    posts:
      data && data.body && data.body.posts
        ? data.body.posts.map((post) => new Post(post))
        : [],
    isLoading,
    error,
    mutate,
    postTweet,
    addFavorite,
    deleteFavorite,
  };
};
