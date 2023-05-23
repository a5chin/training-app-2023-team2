import {
  Box,
  Button,
  Flex,
  FormControl,
  Textarea,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { usePosts } from '../hooks/usePosts';
import { Post } from '../components/Post';
import { IsPost } from '../types';
import { Entity_Post as PostType } from '@/aspida/@types';

type TweetFormInput = {
  content: string;
};

export function Posts() {
  const { posts, postTweet, addFavorite, deleteFavorite } = usePosts();
  const { register, getValues, handleSubmit, reset } =
    useForm<TweetFormInput>();
  const toast = useToast();

  const handleClickLike = useCallback(
    async (post: PostType) => {
      try {
        if (post.id) {
          if (post.is_my_favorite) {
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
      {/* Tweets */}
      <Flex flexGrow={2} direction="column" fontSize="md" bg="blue">
        <form
          onSubmit={handleSubmit(async () => {
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
          })}
        >
          <Box px="16px" pt="10px" borderColor="black" borderWidth="1px">
            <FormControl>
              <Textarea
                variant="unstyled"
                placeholder="今どうしてる？"
                size="sm"
                color="white"
                fontSize="25px"
                resize="none"
                {...register('content', { required: true })}
              />
            </FormControl>
            <HStack justify="end">
              <Button
                colorScheme="blue"
                size="sm"
                mt="12px"
                mb="5px"
                type="submit"
              >
                投稿する
              </Button>
            </HStack>
          </Box>
        </form>
        {posts &&
          posts?.map(
            (post) =>
              IsPost(post) && (
                <Post
                  key={post.id}
                  post={post}
                  handleClickLike={handleClickLike}
                />
              )
          )}
      </Flex>

      {/* Sub information */}
      <Flex flexGrow={1} direction="column" bg="green">
        <Box>Ranking</Box>
        <Box>Recommendation</Box>
      </Flex>
    </Flex>
  );
}
