import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
} from '@mui/material';
import { useGetUserQuery, useGetAvatarQuery } from '../users/usersApi';
import UserLimitsPage from './UserLimitsPage';
import { formatCurrencySymbol } from '../../utils/formatCurrencySymbol';

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

  // Extract bank data and the currency from bank information.
  const bankData = user.bank;
  const bankCurrency = bankData?.currency || 'USD';

  return (
    <Box display="flex" flexDirection="row" p={1} gap={2}>
      {/* Details Section */}
      <Box flex={3}>
        <Paper elevation={5} sx={{ p: 4, height: '100%' }}>
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
            {bankData && (
              <Typography variant="body1">
                <strong>Currency:</strong>{' '}
                {new Intl.DisplayNames(['en'], { type: 'currency' }).of(bankCurrency)}{' '}
                {formatCurrencySymbol(bankCurrency)} ({bankCurrency})
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Limits Table Section */}
      <Box flex={7}>
        <UserLimitsPage currency={bankCurrency} />
      </Box>
    </Box>
  );
}