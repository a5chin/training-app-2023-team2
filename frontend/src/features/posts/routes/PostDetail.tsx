import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  HStack,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { usePostDetail } from '../hooks/usePostDetail';

import { CustomInfoButton } from '../components/CustomInfoButton';
import { CustomBackButton } from '../components/CustomBackButton';
import { CustomCommentButton } from '../components/CustomCommentButton';
import { CustomGoodButton } from '../components/CustomGoodButton';
import { ReplayFormInDetail } from '../components/ReplayFormInDetail';
import { Ranking } from '../components/Ranking';
import { Recommendation } from '../components/Recommendation';

export function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const { post, deleteTweet, addFavorite, deleteFavorite, mutate } =
    usePostDetail(postId ?? '');
  const toast = useToast();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const handleDeleteTweet = async () => {
    try {
      if (postId) {
        await deleteTweet(postId);
      } else {
        throw Error('postId is not found');
      }
      navigate('/posts');
    } catch (e: any) {
      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
          <Box borderBottomColor="gray.400" borderBottomWidth="1px" py={2}>
            {post ? (
              <div>
                <HStack>
                  <CustomBackButton path="/posts" />
                  <Text fontWeight="bold">投稿</Text>
                </HStack>

                <Flex direction="row" px="19px">
                  <Flex direction="column" flex="auto">
                    <HStack justifyContent="space-between">
                      <Text> {post.user?.name}</Text>
                      <CustomInfoButton
                        baseColor="white"
                        hoverColor="pink"
                        aria-label="info-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTweet();
                        }}
                      />
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
                          baseColor={colorMode === 'light' ? 'black' : 'white'}
                          hoverColor="red"
                          aria-label="comment-button"
                        />
                        <Text>N</Text>
                      </HStack>
                      <HStack>
                        <CustomGoodButton
                          baseColor={colorMode === 'light' ? 'black' : 'white'}
                          hoverColor="pink"
                          fillColor="pink"
                          isLiked={post.isMyFavorite}
                          aria-label="good-button"
                          onClick={handleClickLike}
                        />
                        <Text>{post.favoritesCount}</Text>
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
        <Flex flexGrow={1} direction="column">
          <Ranking />
          <Recommendation />
        </Flex>
      </Flex>
    </div>
  );
}
