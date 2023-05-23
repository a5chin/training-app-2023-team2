import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { AiOutlineComment } from 'react-icons/ai';
import { useState } from 'react';

export type CommentButtonColorProps = {
  baseColor: string;
  hoverColor: string;
};

export function CustomCommentButton({
  baseColor,
  hoverColor,
  ...attributes
}: CommentButtonColorProps & IconButtonProps) {
  const [color, setColor] = useState<string>(baseColor);

  return (
    <IconButton
      bg="inherit"
      size="sm"
      icon={
        <div>
          <AiOutlineComment
            onMouseOver={() => setColor(hoverColor)}
            onMouseOut={() => setColor(baseColor)}
            style={{ color }}
          />
        </div>
      }
      _focus={{ bg: 'inherit' }}
      _hover={{ bg: 'inherit' }}
      {...attributes}
    />
  );
}
