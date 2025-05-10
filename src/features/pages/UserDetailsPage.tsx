import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Divider,
} from '@mui/material';
import { useGetUserQuery, useGetAvatarQuery } from '../users/usersApi';
import UserLimitsPage from './UserLimitsPage';
import { formatCurrencySymbol } from '../../utils/formatCurrencySymbol';

export default function UserDetailsPage() {
  const { id } = useParams();
  const { data: user, isLoading, isError } = useGetUserQuery(id as string);
  const { data: avatarUrl } = useGetAvatarQuery();

  if (isLoading || isError || !user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6" align="center">
          Failed to load user details.
        </Typography>
      </Box>
    );
  }

  const bankData = user.bank;
  const bankCurrency = bankData?.currency || 'USD';

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {/* User Details Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={5} sx={{ p: 3 }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              {avatarUrl && (
                <Avatar
                  src={avatarUrl}
                  alt="User Avatar"
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
              )}
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user.username}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <Typography variant="body1" gutterBottom>
                <strong>ID:</strong> {user.id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>First Name:</strong> {user.firstName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Last Name:</strong> {user.lastName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Age:</strong> {user.age}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user.email}
              </Typography>
              {bankData && (
                <Typography variant="body1" gutterBottom>
                  <strong>Currency:</strong>{' '}
                  {new Intl.DisplayNames(['en'], { type: 'currency' }).of(bankCurrency)}{' '}
                  {formatCurrencySymbol(bankCurrency)} ({bankCurrency})
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* User Limits Section */}
        <Grid item xs={12} md={8}>
          <UserLimitsPage currency={bankCurrency} />
        </Grid>
      </Grid>
    </Box>
  );
}
