import { Route, Routes } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { UserDetail } from './UserDetail';
import { MyDetail } from './MyDetail';

export function UsersRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path=":id" element={<UserDetail />} />
      <Route
        path="me/profile"
        element={<MyDetail currentUser={currentUser} />}
      />
    </Routes>
  );
}
