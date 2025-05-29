import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { useGetUserQuery } from '../users/usersApi';
import { formatCurrency } from '../../utils/formatCurrency';
import UserLimitsPage from './UserLimitsPage';

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isError, isLoading, error } = useGetUserQuery(id ?? '');

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6" align="center">
          {error instanceof Error ? error.message : 'Failed to load user details.'}
        </Typography>
      </Box>
    );
  }

  const bankCurrency = user.bank?.currency ?? 'USD';

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 33.333%' } }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              User Details
            </Typography>
            <Box>
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
              <Typography variant="body1" gutterBottom>
                <strong>Currency:</strong>{' '}
                {new Intl.DisplayNames(['en'], { type: 'currency' }).of(bankCurrency)}{' '}
                {formatCurrency(0, bankCurrency)} ({bankCurrency})
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 66.666%' } }}>
          <UserLimitsPage currency={bankCurrency} />
        </Box>
      </Box>
    </Box>
  );
}
