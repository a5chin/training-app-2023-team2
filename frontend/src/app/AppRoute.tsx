import { Routes, Route } from 'react-router-dom';

import { HelloWorld } from '../features/helloworld';

export function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<HelloWorld />} />
    </Routes>
  );
}
