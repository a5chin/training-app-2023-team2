import {
  AiOutlineEllipsis,
  AiOutlineDelete,
  AiOutlineAreaChart,
} from 'react-icons/ai';
import {
  Text,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  List,
  ListItem,
  ListIcon,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

export type CommentButtonColorProps = {
  baseColor: string;
  hoverColor: string;
};

export function CustomInfoButton({
  baseColor,
  hoverColor,
}: CommentButtonColorProps) {
  const [color, setColor] = useState<string>(baseColor);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Popover size="xs">
        <PopoverTrigger>
          <IconButton
            bg="inherit"
            size="md"
            aria-label="comment-button"
            icon={
              <div>
                <AiOutlineEllipsis
                  onMouseOver={() => setColor(hoverColor)}
                  onMouseOut={() => setColor(baseColor)}
                  style={{ color }}
                />
              </div>
            }
            _focus={{ bg: 'inherit' }}
            _hover={{ bg: 'inherit' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          width="305px"
          bg="black"
          color="white"
          fontSize="15px"
          fontWeight="700"
          boxShadow="md"
        >
          <PopoverBody width="305px">
            <List
              spacing={3}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ListItem
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
              >
                <ListIcon as={AiOutlineDelete} />
                削除
              </ListItem>
              <ListItem color="white">
                <ListIcon as={AiOutlineAreaChart} />
                アナリティクス
              </ListItem>
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="black"
          color="white"
          width="320px"
          boxShadow="md"
        >
          <ModalHeader fontSize="23px" pb="0px">
            投稿を削除しますか？
          </ModalHeader>

          <ModalBody>
            <Text fontSize="15px">
              この操作は取り消せません。タイムラインから投稿が削除されます。
            </Text>
            <VStack mt="24px" mb="12px">
              <Button
                size="sm"
                width="100%"
                bg="red"
                color="white"
                rounded="xl"
                fontSize="15px"
                fontWeight="700"
              >
                削除
              </Button>
              <Button
                size="sm"
                width="100%"
                bg="black"
                color="white"
                border="1px"
                borderColor="white"
                rounded="xl"
                fontSize="15px"
                fontWeight="700"
                onClick={() => onClose()}
              >
                キャンセル
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
