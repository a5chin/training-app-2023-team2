import { Flex, Text, FormControl, Input, Button } from '@chakra-ui/react';

// TODO: バリデーション
export function ReplayFormInDetail() {
  return (
    <FormControl
      py="12px"
      width="100%"
      borderTopWidth={1}
      borderColor="red.200"
      borderStyle="solid"
    >
      <Text fontSize="15px">返信先：</Text>
      <Input
        size="sm"
        type="text"
        placeholder="返信を投稿"
        bg="inherit"
        variant="ghost"
      />
      <Flex justify="right">
        <Button size="xl" colorScheme="teal" type="submit">
          返信
        </Button>
      </Flex>
    </FormControl>
  );
}
