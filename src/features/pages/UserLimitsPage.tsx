import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useGetLimitsQuery } from '../users/usersApi';
import AddLimitSection from './AddLimitSection';
import { formatCurrency } from '../../utils/formatCurrency';
import type { UserLimitsPageProps } from '../../types/limit';

export default function UserLimitsPage({ currency = 'USD' }: UserLimitsPageProps) {
  const { data, isLoading, isError } = useGetLimitsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredLimits = useMemo(() => {
    if (!data) return [];
    const term = searchTerm.toLowerCase();
    return data.limits.filter((limit) =>
      limit.limitPeriod.toLowerCase().includes(term) ||
      limit.limitType.toLowerCase().includes(term) ||
      limit.limitValueType.toLowerCase().includes(term) ||
      limit.created.toLowerCase().includes(term) ||
      limit.status.toLowerCase().includes(term) ||
      String(limit.limitValue).toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  return (
    <>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">User Limits</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          New Limit
        </Button>
      </Box>

      {/* Search Field */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search Limits"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Modal with Form */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
        <DialogContent>
          <AddLimitSection />
        </DialogContent>
      </Dialog>

      {/* Content */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : isError || !data ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <Typography color="error" variant="h6" align="center">
            Failed to load user limits.
          </Typography>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          elevation={8}
          sx={{
            width: '100%',
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <Table stickyHeader sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'background.paper' }}>Limit Period</TableCell>
                <TableCell sx={{ backgroundColor: 'background.paper' }}>Limit Type</TableCell>
                <TableCell sx={{ backgroundColor: 'background.paper' }}>Limit Value</TableCell>
                <TableCell sx={{ backgroundColor: 'background.paper' }}>Limit Value Type</TableCell>
                <TableCell sx={{ backgroundColor: 'background.paper' }}>Status</TableCell>
                <TableCell sx={{ backgroundColor: 'background.paper' }}>Created Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLimits.length > 0 ? (
                filteredLimits.map((limit, index) => (
                  <TableRow key={index}>
                    <TableCell>{limit.limitPeriod}</TableCell>
                    <TableCell>{limit.limitType}</TableCell>
                    <TableCell>
                      {limit.limitValueType === 'amount'
                        ? formatCurrency(
                            typeof limit.limitValue === 'number' ? limit.limitValue : 0,
                            currency
                          )
                        : new Intl.NumberFormat('en-US', {
                            style: 'percent',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(
                            typeof limit.limitValue === 'number' ? limit.limitValue / 100 : 0
                          )}
                    </TableCell>
                    <TableCell>{limit.limitValueType}</TableCell>
                    <TableCell>{limit.status === 'true' ? '🟢' : '🔴'}</TableCell>
                    <TableCell>{limit.created}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No limits found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}