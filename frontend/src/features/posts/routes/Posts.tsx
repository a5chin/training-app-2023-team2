import {
  Button,
  Flex,
  FormControl,
  Textarea,
  HStack,
  useToast,
  useBoolean,
  Stack,
  Heading,
  useColorMode,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { Post } from '../components/Post';
import { Post as PostType } from '@/features/posts/types';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { useAuth } from '@/lib/auth';

type TweetFormInput = {
  content: string;
};

export function Posts() {
  const { posts, postTweet, deleteTweet, addFavorite, deleteFavorite } =
    usePosts();
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<TweetFormInput>();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [loading, { on: onLoading, off: offLoading }] = useBoolean(false);
  const { currentUser } = useAuth();

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
      onLoading();
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
      offLoading();
    },
    [addFavorite, deleteFavorite, offLoading, onLoading, toast]
  );

  const handlePost = useCallback(async () => {
    try {
      await postTweet(getValues().content);
      reset();
    } catch (e: any) {
      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [getValues, postTweet, reset, toast]);

  return (
    <Flex direction="row" w="full">
      {/* Tweets */}
      <Flex
        flexGrow={2}
        direction="column"
        fontSize="md"
        minH="100vh"
        borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
        borderStartWidth="1px"
        borderEndWidth="1px"
      >
        {currentUser ? (
          <form onSubmit={handleSubmit(handlePost)}>
            <HStack alignItems="start" px="16px" pt="10px" py={4}>
              <Stack>
                <Link to="/users/me/profile">
                  {currentUser && <UserIcon name={currentUser.name} />}
                </Link>
              </Stack>
              <Stack flex="auto">
                <FormControl>
                  <Textarea
                    variant="unstyled"
                    placeholder="今どうしてる？"
                    size="sm"
                    fontSize="lg"
                    resize="none"
                    {...register('content', { required: true })}
                  />
                </FormControl>
                <HStack justify="end">
                  <Button
                    size="md"
                    colorScheme="twitter"
                    type="submit"
                    rounded={50}
                    px={6}
                    isLoading={loading}
                    isDisabled={!isDirty || !isValid}
                  >
                    投稿する
                  </Button>
                </HStack>
              </Stack>
            </HStack>
          </form>
        ) : (
          <Stack p={4}>
            <Heading size="md">話題を検索</Heading>
          </Stack>
        )}
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
      </Flex>
    </Flex>
  );
}
