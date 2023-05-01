import { useEffect, useState } from 'react';

import { Box } from '@chakra-ui/react';
import { getHello } from '../api/getHello';
import { Hello } from '../types';

export function HelloWorld() {
  const [hello, setHello] = useState<Hello>();
  useEffect(() => {
    const getHelloText = async () => {
      const h = await getHello();
      setHello(h);
    };
    getHelloText();
  }, []);

  return (
    <Box bg="blue">
      <p>TEXT: {hello && hello?.message}</p>
      <p>LANG: {hello && hello?.lang}</p>
    </Box>
  );
}
