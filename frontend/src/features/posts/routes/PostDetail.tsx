import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { usePostDetail } from '../api/getPostDetail';
import { Post } from '../components/Post';

export function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const { post } = usePostDetail(postId ?? '');

  return (
    <Flex direction="row" w="full">
      {/* Tweets */}
      <Flex flexGrow={2} direction="column" fontSize="md" bg="blue">
        {post && <Post key={post.id} post={post} />}
      </Flex>

      {/* Sub information */}
      <Flex flexGrow={1} direction="column" bg="green">
        <Box>Ranking</Box>
        <Box>Recommendation</Box>
      </Flex>
    </Flex>
  );
}
