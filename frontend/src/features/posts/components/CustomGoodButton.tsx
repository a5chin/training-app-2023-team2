import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';

export type CommentGoodColorProps = {
  baseColor: string;
  hoverColor: string;
  fillColor: string;
  isLiked?: boolean;
};

export function CustomGoodButton({
  baseColor,
  hoverColor,
  fillColor,
  isLiked = false,
  ...attributes
}: CommentGoodColorProps & IconButtonProps) {
  const [color, setColor] = useState<string>(baseColor);

  return (
    <IconButton
      bg="inherit"
      size="sm"
      icon={
        <div>
          {isLiked ? (
            <AiFillHeart style={{ color: fillColor }} />
          ) : (
            <AiOutlineHeart
              onMouseOver={() => setColor(hoverColor)}
              onMouseOut={() => setColor(baseColor)}
              style={{ color }}
            />
          )}
        </div>
      }
      _focus={{ bg: 'inherit' }}
      _hover={{ bg: 'inherit' }}
      {...attributes}
    />
  );
}
