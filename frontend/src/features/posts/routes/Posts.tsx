import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { usePosts } from '../api/getPosts';
import { Post as PostType } from '../types';

type PostProps = {
  post: PostType;
};

function Post({ post }: PostProps) {
  const { title, body, user } = post;

  return (
    <Flex direction="row">
      <Flex direction="column">
        <Icon />
      </Flex>
      <Flex direction="row">
        <Text>{title}</Text>
        <Text>{body}</Text>
        <Text>written by {user.name}</Text>
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
  const { posts } = usePosts();

  console.log(`posts in PostsPage: ${JSON.stringify(posts)}`);

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
