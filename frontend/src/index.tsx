import ReactDOM from 'react-dom/client';
import { ColorModeScript } from '@chakra-ui/react';
import App from './App';
import { themeConfig } from './config/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
    <App />
  </>
);
