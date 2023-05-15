import { Box, Flex, Text, HStack } from '@chakra-ui/react';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { usePosts } from '../api/getPosts';
import { Post as PostType } from '../types';

type PostProps = {
  post: PostType;
};

function Post({ post }: PostProps) {
  const { title, body, user } = post;

  return (
    <Box borderColor="black" borderWidth="1px">
      <Flex direction="row" px="19px" py="5px">
        {/* <Flex direction="column">
          <Icon />
        </Flex> */}
        <Flex direction="column">
          <HStack>
            <Text>{title}</Text>
            <Text>written by {user.name}</Text>
          </HStack>
          <Text>{body}</Text>
          <HStack>
            <button type="button">
              <AiOutlineComment />
            </button>
            <button type="button">
              <AiOutlineHeart />
            </button>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}

export function Posts() {
  const { posts } = usePosts();

  // console.log(`posts in PostsPage: ${JSON.stringify(posts)}`);

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
