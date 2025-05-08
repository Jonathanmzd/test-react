import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import UsersListPage from '../features/pages/UsersListPage';
import UserDetailsPage from '../features/pages/UserDetailsPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<UsersListPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
