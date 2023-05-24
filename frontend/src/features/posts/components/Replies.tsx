import { Box, Divider, Stack, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Post } from '@/features/posts/components/Post';
import { useReplies } from '@/features/posts/hooks/useReplies';
import { ReplayFormInDetail } from '@/features/posts/components/ReplayFormInDetail';
import { Post as PostType } from '@/features/posts/types';
import { useAuth } from '@/lib/auth';

export function Replies({ post }: { post: PostType }) {
  const {
    replies,
    createReply,
    deleteReply,
    addFavorite,
    deleteFavorite,
    mutate,
  } = useReplies(post.id);
  const toast = useToast();
  const { currentUser } = useAuth();

  const handleClickLike = useCallback(
    async (selectedPost: PostType) => {
      try {
        if (selectedPost.isMyFavorite) {
          await deleteFavorite(selectedPost.id);
        } else {
          await addFavorite(selectedPost.id);
        }
        await mutate();
      } catch (e: any) {
        toast({
          title: 'Error',
          description: e.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [addFavorite, deleteFavorite, mutate, toast]
  );

  const handleReply = useCallback(
    async (content: string) => {
      try {
        await createReply(content);
      } catch (e: any) {
        toast({
          title: 'Error',
          description: e.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [createReply, toast]
  );

  const handleDeleteReply = useCallback(
    async (selectedPost: PostType) => {
      try {
        if (selectedPost) {
          await deleteReply(selectedPost.id);
        }
        await mutate();
      } catch (e: any) {
        toast({
          title: 'Error',
          description: e.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [deleteReply, mutate, toast]
  );

  return (
    <Stack>
      {currentUser && (
        <ReplayFormInDetail handleReply={handleReply} post={post} />
      )}
      <Box>
        {replies &&
          replies.map((reply) => (
            <Post
              post={reply}
              handleClickLike={handleClickLike}
              handleDeleteTweet={handleDeleteReply}
              key={reply.id}
            />
          ))}
        <Divider />
      </Box>
    </Stack>
  );
}
