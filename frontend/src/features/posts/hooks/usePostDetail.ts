import useAspidaSWR from '@aspida/swr';
import { aspidaClient } from '@/lib/aspida';
import { Entity_Post as PostType } from '@/aspida/@types';

type UsePostDetailResponse = {
  post?: PostType;
  error: Error;
  isLoading: boolean;
  mutate: () => void;
  addFavorite: () => void;
  deleteFavorite: () => void;
};

export const usePostDetail = (postId: string): UsePostDetailResponse => {
  const { data, error, isLoading, mutate } = useAspidaSWR(
    aspidaClient.posts._postId(postId),
    'get'
  );

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
    post: data?.body,
    isLoading,
    error,
    mutate,
    addFavorite,
    deleteFavorite,
  };
};
