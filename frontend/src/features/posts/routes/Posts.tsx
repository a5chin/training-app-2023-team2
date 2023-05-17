import { Box, Flex } from '@chakra-ui/react';
import { usePosts } from '../api/getPosts';
import { Post } from '../components/Post';

export function Posts() {
  const { posts } = usePosts();

  return (
    <Flex direction="row" w="full">
      {/* Tweets */}
      <Flex flexGrow={2} direction="column" fontSize="md" bg="blue">
        {posts && posts?.map((post) => <Post key={post.id} post={post} />)}
      </Flex>

      {/* Sub information */}
      <Flex flexGrow={1} direction="column" bg="green">
        <Box>Ranking</Box>
        <Box>Recommendation</Box>
      </Flex>
    </Flex>
  );
}
