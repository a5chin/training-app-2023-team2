import useAspidaSWR from '@aspida/swr';
import { aspidaClient } from '@/lib/aspida';
import { Post } from '@/features/posts';

type UseRepliesResponse = {
  replies: Post[];
  createReply: (content: string) => void;
  deleteReply: (id: string) => void;
  addFavorite: (id: string) => void;
  deleteFavorite: (id: string) => void;
  mutate: () => void;
};

export const useReplies = (postId: string): UseRepliesResponse => {
  const { data, mutate } = useAspidaSWR(
    aspidaClient.posts._postId(postId).replies
  );

  const createReply = async (content: string) => {
    const replyClient = aspidaClient.posts._postId(postId).replies;
    const formData = new FormData();
    const blob: Blob[] = [];
    formData.append('content', content);
    await replyClient.$post({
      body: {
        file: new File(blob, ''),
        content,
      },
    });
    await mutate();
  };

  const deleteReply = async (id: string) => {
    await aspidaClient.posts._postId(id).$delete();
  };

  const addFavorite = async (id: string) => {
    const favoriteClient = aspidaClient.posts._postId(id).favorites;
    await favoriteClient.$post();
    await mutate();
  };

  const deleteFavorite = async (id: string) => {
    const favoriteClient = aspidaClient.posts._postId(id).favorites;
    await favoriteClient.$delete();
    await mutate();
  };

  return {
    replies: data && data.posts ? data.posts.map((post) => new Post(post)) : [],
    createReply,
    deleteReply,
    addFavorite,
    deleteFavorite,
    mutate,
  };
};
