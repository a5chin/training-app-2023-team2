import { Route, Routes } from 'react-router-dom';
import { UserDetail } from './UserDetail';
import { MyDetail } from './MyDetail';

export function UsersRoutes() {
  return (
    <Routes>
      <Route path=":id" element={<UserDetail />} />
      <Route path="me/profile" element={<MyDetail />} />
    </Routes>
  );
}
