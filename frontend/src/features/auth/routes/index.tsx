import { Route, Routes } from 'react-router-dom';

import { Signin } from './Signin';
import { Signup } from './Signup';
import { Signout } from './Signout';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signout" element={<Signout />} />
    </Routes>
  );
}
