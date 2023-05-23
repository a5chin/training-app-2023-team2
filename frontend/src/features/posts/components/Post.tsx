import { Box, Flex, Text, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CustomCommentButton } from './CustomCommentButton';
import { CustomGoodButton } from './CustomGoodButton';
import { CustomInfoButton } from './CustomInfoButton';
import { Post as PostType } from '@/features/posts';

type PostProps = {
  post: PostType;
  handleClickLike: (post: PostType) => void;
};

export function Post({ post, handleClickLike }: PostProps) {
  const navigate = useNavigate();

  return (
    <Box
      borderColor="black"
      borderWidth="1px"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      <Flex direction="row" pl="19px">
        {/* <Flex direction="column">
            <Icon />
          </Flex> */}
        <Flex direction="column" w="100%">
          <HStack justifyContent="space-between">
            <Text>{post.user?.name}</Text>
            <CustomInfoButton baseColor="white" hoverColor="pink" />
          </HStack>
          <Text>{post.body}</Text>
          <HStack>
            <HStack>
              <CustomCommentButton
                baseColor="black"
                hoverColor="red"
                aria-label="comment-button"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
              <Text>N</Text>
            </HStack>
            <HStack>
              <CustomGoodButton
                baseColor="black"
                hoverColor="pink"
                fillColor="pink"
                aria-label="comment-button"
                disabled={!post.isMyFavorite}
                isLiked={post.isMyFavorite}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickLike(post);
                }}
              />
              <Text>{post.favoritesCount}</Text>
            </HStack>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
