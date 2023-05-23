import { Box, Flex, Text, HStack, useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CustomCommentButton } from './CustomCommentButton';
import { CustomGoodButton } from './CustomGoodButton';
import { Post as PostType } from '@/features/posts';

type PostProps = {
  post: PostType;
  handleClickLike: (post: PostType) => void;
};

export function Post({ post, handleClickLike }: PostProps) {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  return (
    <Box
      borderColor="gray.400"
      borderBottomWidth="1px"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      <Flex direction="row" px="19px">
        {/* <Flex direction="column">
            <Icon />
          </Flex> */}
        <Flex direction="column">
          <HStack>
            <Text>{post.user?.name}</Text>
          </HStack>
          <Text>{post.body}</Text>
          <HStack>
            <HStack>
              <CustomCommentButton
                baseColor={colorMode === 'light' ? 'black' : 'white'}
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
                baseColor={colorMode === 'light' ? 'black' : 'white'}
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
