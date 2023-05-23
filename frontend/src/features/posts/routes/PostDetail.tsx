import { useParams } from 'react-router-dom';
import { Box, Flex, Text, HStack, useColorMode } from '@chakra-ui/react';
import { usePostDetail } from '../api/getPostDetail';

import { CustomBackButton } from '../components/CustomBackButton';
import { CustomCommentButton } from '../components/CustomCommentButton';
import { CustomGoodButton } from '../components/CustomGoodButton';
import { ReplayFormInDetail } from '../components/ReplayFormInDetail';
import { Ranking } from '../components/Ranking';
import { Recommendation } from '../components/Recommendation';

export function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const { post } = usePostDetail(postId ?? '');
  const { colorMode } = useColorMode();

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
                      <CustomCommentButton
                        baseColor={colorMode === 'light' ? 'black' : 'white'}
                        hoverColor="red"
                      />
                      <CustomGoodButton
                        baseColor={colorMode === 'light' ? 'black' : 'white'}
                        hoverColor="pink"
                        fillColor="pink"
                      />
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
