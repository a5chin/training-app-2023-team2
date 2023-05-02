import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ChakraProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ChakraProvider>
  );
}
