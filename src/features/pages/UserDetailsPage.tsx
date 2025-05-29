import { useParams } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  CircularProgress,
  Avatar,
  Divider
} from '@mui/material';
import { useGetUserQuery } from '../users/usersApi';
import { formatCurrency } from '../../utils/formatCurrency';
import UserLimitsPage from './UserLimitsPage';
import { useState, useEffect } from 'react';

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isError, isLoading, error } = useGetUserQuery(id ?? '');
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    // Fetch random avatar from picsum
    fetch('https://picsum.photos/v2/list?page=2&limit=10')
      .then(res => res.json())
      .then(images => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setAvatarUrl(randomImage.download_url);
      })
      .catch(() => {
        // Fallback to a default avatar if fetch fails
        setAvatarUrl('https://via.placeholder.com/150');
      });
  }, []);

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
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        User Management
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3 
      }}>
        <Box sx={{ 
          flex: { xs: '1 1 100%', md: '0 0 33.333%' },
          maxWidth: { xs: '100%', md: '33.333%' }
        }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar 
                src={avatarUrl}
                sx={{ width: 80, height: 80, mr: 2 }}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <Box>
                <Typography variant="h5" gutterBottom>
                  User Details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {user.id}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
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
                <strong>Username:</strong> {user.username}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Currency:</strong>{' '}
                {new Intl.DisplayNames(['en'], { type: 'currency' }).of(bankCurrency)}{' '}
                {formatCurrency(0, bankCurrency)} ({bankCurrency})
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ 
          flex: { xs: '1 1 100%', md: '0 0 66.666%' },
          maxWidth: { xs: '100%', md: '66.666%' }
        }}>
          <UserLimitsPage currency={bankCurrency} />
        </Box>
      </Box>
    </Box>
  );
}
