import useAspidaSWR from '@aspida/swr';
import { aspidaClient } from '@/lib/aspida';
import { Post } from '@/features/posts';

type UsePostDetailResponse = {
  post?: Post;
  error: Error;
  isLoading: boolean;
  mutate: () => void;
  deleteTweet: () => void;
  addFavorite: () => void;
  deleteFavorite: () => void;
};

export const usePostDetail = (postId: string): UsePostDetailResponse => {
  const { data, error, isLoading, mutate } = useAspidaSWR(
    aspidaClient.posts._postId(postId),
    'get'
  );

  const deleteTweet = async () => {
    await aspidaClient.posts._postId(postId).$delete();
  };

  const addFavorite = async () => {
    const favoriteClient = aspidaClient.posts._postId(postId).favorites;
    await favoriteClient.$post();
    await mutate();
  };

  const deleteFavorite = async () => {
    const favoriteClient = aspidaClient.posts._postId(postId).favorites;
    await favoriteClient.$delete();
    await mutate();
  };

  return {
    post: data && data.body ? new Post(data?.body) : undefined,
    isLoading,
    error,
    mutate,
    deleteTweet,
    addFavorite,
    deleteFavorite,
  };
};
