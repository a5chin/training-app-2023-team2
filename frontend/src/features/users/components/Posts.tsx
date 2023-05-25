import { Divider, Flex, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Post as PostType } from '@/features/posts';
import { usePosts } from '@/features/posts/hooks/usePosts';
import { Post } from '@/features/posts/components/Post';

export function Posts({ userId }: { userId?: string | undefined }) {
  const { posts, deleteTweet, addFavorite, deleteFavorite } = usePosts(userId);
  const toast = useToast();

  const handleDeleteTweet = async (post: PostType) => {
    try {
      await deleteTweet(post.id);
    } catch (e: any) {
      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClickLike = useCallback(
    async (post: PostType) => {
      try {
        if (post.id) {
          if (post.isMyFavorite) {
            await deleteFavorite(post.id);
          } else {
            await addFavorite(post.id);
          }
        }
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
    [addFavorite, deleteFavorite, toast]
  );

  return (
    <Flex direction="row" w="full">
      <Flex flexGrow={2} direction="column" fontSize="md" minH="100vh">
        {posts &&
          posts?.map(
            (post) =>
              post && (
                <Post
                  key={post.id}
                  post={post}
                  handleDeleteTweet={handleDeleteTweet}
                  handleClickLike={handleClickLike}
                />
              )
          )}
        <Divider />
      </Flex>
    </Flex>
  );
}
