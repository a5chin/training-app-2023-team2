import { IconButton } from '@chakra-ui/react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';

export type CommentGoodColorProps = {
  baseColor: string;
  hoverColor: string;
  fillColor: string;
};

export function CustomGoodButton({
  baseColor,
  hoverColor,
  fillColor,
}: CommentGoodColorProps) {
  const [color, setColor] = useState<string>(baseColor);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <IconButton
      bg="inherit"
      size="sm"
      aria-label="good-button"
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
      onClick={() => {
        setIsLiked(!isLiked);
        setColor(hoverColor);
      }}
    />
  );
}
