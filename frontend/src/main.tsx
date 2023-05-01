import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './main.scss';
import App from './app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);