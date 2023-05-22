import { IconButton } from '@chakra-ui/react';
import { AiOutlineComment } from 'react-icons/ai';
import { useState } from 'react';

export type CommentButtonColorProps = {
  baseColor: string;
  hoverColor: string;
};

export function CustomCommentButton({
  baseColor,
  hoverColor,
}: CommentButtonColorProps) {
  const [color, setColor] = useState<string>(baseColor);

  return (
    <IconButton
      bg="inherit"
      size="sm"
      aria-label="comment-button"
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
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
}
