import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { Posts as PostsType } from '../types';

function Post() {
  return (
    <Flex direction="row">
      <Flex direction="column">
        <Icon />
      </Flex>
      <Flex direction="row">
        <Text>This is a first tweet.</Text>
        <Flex direction="column">
          <Box>Comment</Box>
          <Box>Like</Box>
          <Box>Share</Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export function Posts() {
  // const { posts, isLoading, isError } = usePosts();
  const posts: PostsType = [
    {
      id: 1,
      title: 'Post1',
      body: 'This is post 1.',
      user: {
        id: 1,
        name: 'user1',
      },
    },
    {
      id: 2,
      title: 'Post2',
      body: 'This is post 2.',
      user: {
        id: 2,
        name: 'user2',
      },
    },
  ];

  const postElements = posts.map((post) => <Post key={post.id} />);

  return (
    <Flex direction="row" w="full">
      {/* Tweets */}
      <Flex direction="column" fontSize="md" bg="blue">
        {postElements}
      </Flex>

      {/* Sub information */}
      <Flex direction="column" bg="green">
        <Box>Ranking</Box>
        <Box>Recommendation</Box>
      </Flex>
    </Flex>
  );
}
