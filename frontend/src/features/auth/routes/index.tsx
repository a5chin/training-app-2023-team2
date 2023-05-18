import { Route, Routes } from 'react-router-dom';

import { Signin } from './Signin';
import { Signup } from './Signup';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
}