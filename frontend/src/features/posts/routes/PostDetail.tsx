import { useParams } from 'react-router-dom';
import { Box, Flex, Text, HStack, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { usePostDetail } from '../hooks/usePostDetail';

import { CustomBackButton } from '../components/CustomBackButton';
import { CustomCommentButton } from '../components/CustomCommentButton';
import { CustomGoodButton } from '../components/CustomGoodButton';
import { ReplayFormInDetail } from '../components/ReplayFormInDetail';

export function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const { post, addFavorite, deleteFavorite, mutate } = usePostDetail(
    postId ?? ''
  );
  const toast = useToast();

  const handleClickLike = useCallback(async () => {
    try {
      if (post) {
        if (post.is_my_favorite) {
          await deleteFavorite();
        } else {
          await addFavorite();
        }
      }
      await mutate();
    } catch (e: any) {
      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [addFavorite, deleteFavorite, mutate, post, toast]);

  return (
    <div>
      <Flex direction="row" w="full">
        <Flex flexGrow={2} direction="column" fontSize="md" bg="blue">
          <Box borderColor="black" borderWidth="1px" py={2}>
            {post ? (
              <div>
                <HStack>
                  <CustomBackButton path="/posts" />
                  <Text fontWeight="bold">投稿</Text>
                </HStack>
                <Flex direction="row" px="19px">
                  <Flex direction="column" flex="auto">
                    <HStack>
                      <Text> {post.user?.name}</Text>
                    </HStack>
                    <Text>{post.body}</Text>
                    <Box
                      width="100%"
                      borderTopWidth={1}
                      borderColor="red.200"
                      borderStyle="solid"
                    >
                      <Text fontSize="15pt">件のいいね</Text>
                    </Box>
                    <HStack
                      width="100%"
                      borderTopWidth={1}
                      borderColor="red.200"
                      borderStyle="solid"
                    >
                      <HStack>
                        <CustomCommentButton
                          baseColor="black"
                          hoverColor="red"
                          aria-label="comment-button"
                        />
                        <Text>N</Text>
                      </HStack>
                      <HStack>
                        <CustomGoodButton
                          baseColor="black"
                          hoverColor="pink"
                          fillColor="pink"
                          isLiked={post.is_my_favorite}
                          aria-label="good-button"
                          onClick={handleClickLike}
                        />
                        <Text>{post.favorites_count}</Text>
                      </HStack>
                    </HStack>
                    <ReplayFormInDetail />
                  </Flex>
                </Flex>
              </div>
            ) : (
              <Text>該当の投稿はありません</Text>
            )}
          </Box>
        </Flex>
        <Flex flexGrow={1} direction="column" bg="green">
          <Box>Ranking</Box>
          <Box>Recommendation</Box>
        </Flex>
      </Flex>
    </div>
  );
}
