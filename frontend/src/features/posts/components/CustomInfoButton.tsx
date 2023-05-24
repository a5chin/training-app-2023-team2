import {
  AiOutlineEllipsis,
  AiOutlineDelete,
  AiOutlineAreaChart,
} from 'react-icons/ai';
import {
  Text,
  Button,
  IconButton,
  IconButtonProps,
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

export type CustomInfoButtonProps = {
  baseColor: string;
  hoverColor: string;
  canDelete: boolean;
};

export function CustomInfoButton({
  baseColor,
  hoverColor,
  canDelete,
  ...atribute
}: CustomInfoButtonProps & IconButtonProps) {
  const [color, setColor] = useState<string>(baseColor);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Popover size="xs">
        <PopoverTrigger>
          <IconButton
            bg="inherit"
            size="md"
            {...atribute}
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
              {canDelete && (
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
              )}
              <ListItem>
                <ListIcon as={AiOutlineAreaChart} />
                アナリティクス
              </ListItem>
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="320px" boxShadow="md">
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
                onClick={atribute.onClick}
              >
                削除
              </Button>
              <Button
                size="sm"
                width="100%"
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
