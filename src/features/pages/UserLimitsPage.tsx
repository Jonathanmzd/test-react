import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useGetLimitsQuery } from '../users/usersApi';

export default function UserLimitsPage() {
  const { data, isLoading, isError, error } = useGetLimitsQuery();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    console.error(error);
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error" variant="h6" align="center">
          Failed to load user limits.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <TableContainer component={Paper}>
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
                <TableCell>{limit.status}</TableCell>
                <TableCell>{limit.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}