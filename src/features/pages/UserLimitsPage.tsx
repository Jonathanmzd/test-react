import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useGetLimitsQuery } from '../users/usersApi';
import AddLimitSection from './AddLimitSection';

export default function UserLimitsPage() {
  const { data, isLoading, isError, error } = useGetLimitsQuery();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    console.error(error);
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6" align="center">
          Failed to load user limits.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">User Limits</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          New Limit
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {/* <DialogTitle>Add New Limit</DialogTitle> */}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
        <DialogContent>
          <AddLimitSection />
        </DialogContent>
      </Dialog>
      <TableContainer elevation={8} component={Paper} sx={{ width: '100%', mt: 2 }}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Limit Period</TableCell>
              <TableCell>Limit Type</TableCell>
              <TableCell>Limit Value</TableCell>
              <TableCell>Limit Value Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.limits.map((limit, index) => (
              <TableRow key={index}>
                <TableCell>{limit.limitPeriod}</TableCell>
                <TableCell>{limit.limitType}</TableCell>
                <TableCell>{limit.formattedLimitValue}</TableCell>
                <TableCell>{limit.limitValueType}</TableCell>
                <TableCell>{limit.status === 'true' ? '🟢' : '🔴'}</TableCell>
                <TableCell>{limit.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}