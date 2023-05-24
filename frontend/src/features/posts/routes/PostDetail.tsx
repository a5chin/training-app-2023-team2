import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  HStack,
  useToast,
  useColorMode,
  Stack,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { usePostDetail } from '../hooks/usePostDetail';

import { CustomBackButton } from '../components/CustomBackButton';
import { CustomCommentButton } from '../components/CustomCommentButton';
import { CustomGoodButton } from '../components/CustomGoodButton';
import { Ranking } from '../components/Ranking';
import { Recommendation } from '../components/Recommendation';
import { Replies } from '@/features/posts/components/Replies';
import { UserIcon } from '@/components/Avatar/BoringAvatar';
import { ReplyModal } from '@/features/posts/components/ReplyModal';

export function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const { post, addFavorite, deleteFavorite, mutate } = usePostDetail(
    postId ?? ''
  );
  const toast = useToast();
  const { colorMode } = useColorMode();
  const disclosure = useDisclosure();

  const handleClickLike = useCallback(async () => {
    try {
      if (post) {
        if (post.isMyFavorite) {
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
        <Flex flexGrow={2} direction="column" fontSize="md">
          <Box py={2}>
            {post ? (
              <Box>
                <HStack px={3}>
                  <CustomBackButton
                    path="/posts"
                    aria-label="back-button"
                    _hover={{ bg: 'inherit' }}
                  />
                  <Text fontWeight="bold">投稿</Text>
                </HStack>
                <Flex direction="row" px={2} fontSize="sm">
                  <Stack direction="column" flex="auto" pt={3}>
                    {post.user && (
                      <HStack>
                        <UserIcon name={post.user.name} />
                        <Text fontWeight="semibold" fontSize="md">
                          {' '}
                          {post.user.name}
                        </Text>
                      </HStack>
                    )}
                    <Stack px={2}>
                      <Text fontSize="lg" overflowWrap="break-word">
                        {post.body}
                      </Text>
                      <Divider />
                      <Stack py={1} width="100%">
                        <Text fontSize="sm">
                          <Box as="b" px={1}>
                            {post.favoritesCount}
                          </Box>
                          件のいいね
                        </Text>
                      </Stack>
                      <Divider />
                      <HStack width="100%">
                        <HStack mt={0}>
                          <CustomCommentButton
                            baseColor={
                              colorMode === 'light' ? 'black' : 'white'
                            }
                            hoverColor="white"
                            aria-label="comment-button"
                            onClick={disclosure.onOpen}
                          />
                        </HStack>
                        <HStack>
                          <CustomGoodButton
                            baseColor={
                              colorMode === 'light' ? 'black' : 'white'
                            }
                            hoverColor="pink"
                            fillColor="pink"
                            isLiked={post.isMyFavorite}
                            aria-label="good-button"
                            onClick={handleClickLike}
                          />
                        </HStack>
                      </HStack>
                    </Stack>
                  </Stack>
                </Flex>
                <Replies post={post} />
                <ReplyModal disclosure={disclosure} post={post} />
              </Box>
            ) : (
              <Text>該当の投稿はありません</Text>
            )}
          </Box>
        </Flex>
        <Flex flexGrow={1} direction="column">
          <Ranking />
          <Recommendation />
        </Flex>
      </Flex>
    </div>
  );
}
