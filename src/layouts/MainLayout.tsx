import { Container } from '@mui/material';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, paddingLeft: 0, paddingRight: 0, width: '100vw' }} maxWidth={false}>
        <Outlet />
      </Container>
    </>
  );
}
