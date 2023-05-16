import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Signup } from './Signup';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
}
