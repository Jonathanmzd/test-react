import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box
} from '@mui/material';
import { useGetUsersQuery } from '../users/usersApi';

export default function UsersListPage() {
  const { data, isLoading, isError, error } = useGetUsersQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6" align="center">
          Failed to load users.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '20%' }}>First Name</TableCell>
            <TableCell sx={{ width: '20%' }}>Last Name</TableCell>
            <TableCell sx={{ width: '15%' }}>Age</TableCell>
            <TableCell sx={{ width: '25%' }}>Email</TableCell>
            <TableCell sx={{ width: '20%' }}>Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.users.map((user) => (
            <TableRow
              key={user.id}
              hover
              onClick={() => navigate(`/users/${user.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
