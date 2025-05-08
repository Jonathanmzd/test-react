import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper, Avatar } from '@mui/material';
import { useGetUserQuery, useGetAvatarQuery } from '../users/usersApi';

export default function UserDetailsPage() {
  const { id } = useParams();
  const { data: user, isLoading, isError, error } = useGetUserQuery(id as string);
  const { data: avatarUrl } = useGetAvatarQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !user) {
    console.error(error);
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6" align="center">
          Failed to load user details.
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={1}>
      <Paper elevation={5} sx={{ p: 4, maxWidth: '600px', width: '100%' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          {avatarUrl && (
            <Avatar
              src={avatarUrl}
              alt="User Avatar"
              sx={{ width: 120, height: 120, mb: 2 }}
            />
          )}
          <Typography variant="h5">
            {user.firstName} {user.lastName}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">
            <strong>ID:</strong> {user.id}
          </Typography>
          <Typography variant="body1">
            <strong>First Name:</strong> {user.firstName}
          </Typography>
          <Typography variant="body1">
            <strong>Last Name:</strong> {user.lastName}
          </Typography>
          <Typography variant="body1">
            <strong>Age:</strong> {user.age}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong> {user.username}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}