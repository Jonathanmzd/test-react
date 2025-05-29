import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  CircularProgress,
  Alert
} from '@mui/material';
import type { SelectChangeEvent as MuiSelectChangeEvent } from '@mui/material/Select';
import { formatCurrency } from '../../utils/formatCurrency';
import type { 
  Limit, 
  UserLimitsPageProps, 
  LimitPeriod, 
  LimitType,
  LimitValueType 
} from '../../types/limit';
import { useGetLimitsQuery, useAddLimitMutation } from '../users/usersApi';

const EMPTY_PERIOD = '' as const;
const EMPTY_TYPE = '' as const;

type NewLimitForm = {
  limitPeriod: LimitPeriod | typeof EMPTY_PERIOD;
  limitType: LimitType | typeof EMPTY_TYPE;
  limitValue: string;
  limitValueType: LimitValueType;
  status: boolean;
};

const initialFormState: NewLimitForm = {
  limitPeriod: EMPTY_PERIOD,
  limitType: EMPTY_TYPE,
  limitValue: '',
  limitValueType: 'amount',
  status: true
};

export default function UserLimitsPage({ currency }: UserLimitsPageProps) {
  const [isAddingLimit, setIsAddingLimit] = useState(false);
  const [newLimit, setNewLimit] = useState<NewLimitForm>(initialFormState);

  const { data, isLoading, error } = useGetLimitsQuery();
  const [addLimit] = useAddLimitMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newLimit.limitPeriod === EMPTY_PERIOD || newLimit.limitType === EMPTY_TYPE) {
      return;
    }

    const limit: Limit = {
      id: crypto.randomUUID(),
      limitPeriod: newLimit.limitPeriod,
      limitType: newLimit.limitType,
      limitValue: Number(newLimit.limitValue),
      limitValueType: newLimit.limitValueType,
      status: newLimit.status,
      created: new Date().toISOString()
    };
    
    try {
      await addLimit(limit).unwrap();
      setIsAddingLimit(false);
      setNewLimit(initialFormState);
    } catch (error) {
      console.error('Failed to add limit:', error);
    }
  };

  const handlePeriodChange = (e: MuiSelectChangeEvent) => {
    const value = e.target.value as LimitPeriod | typeof EMPTY_PERIOD;
    setNewLimit({ ...newLimit, limitPeriod: value });
  };

  const handleTypeChange = (e: MuiSelectChangeEvent) => {
    const value = e.target.value as LimitType | typeof EMPTY_TYPE;
    setNewLimit({ ...newLimit, limitType: value });
  };

  const handleValueTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLimit({ ...newLimit, limitValueType: e.target.value as LimitValueType });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">Failed to load limits</Alert>
      </Box>
    );
  }

  const limits = data?.limits ?? [];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">User Limits</Typography>
        <Button 
          variant="contained" 
          onClick={() => setIsAddingLimit(true)}
          disabled={isAddingLimit}
        >
          NEW LIMIT
        </Button>
      </Box>

      {isAddingLimit && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Add New Limit</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>Limit Period</InputLabel>
              <Select
                value={newLimit.limitPeriod}
                label="Limit Period"
                onChange={handlePeriodChange}
              >
                <MenuItem value={EMPTY_PERIOD}>Select a period</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Limit Type</InputLabel>
              <Select
                value={newLimit.limitType}
                label="Limit Type"
                onChange={handleTypeChange}
              >
                <MenuItem value={EMPTY_TYPE}>Select a type</MenuItem>
                <MenuItem value="bet">Bet</MenuItem>
                <MenuItem value="deposit">Deposit</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              required
              label="Limit Value"
              type="number"
              inputProps={{ min: 0, step: "0.01" }}
              value={newLimit.limitValue}
              onChange={(e) => setNewLimit({ ...newLimit, limitValue: e.target.value })}
            />

            <FormControl component="fieldset" required>
              <Typography variant="subtitle2" gutterBottom>Limit Value Type</Typography>
              <RadioGroup
                row
                value={newLimit.limitValueType}
                onChange={handleValueTypeChange}
              >
                <FormControlLabel value="percent" control={<Radio />} label="Percent" />
                <FormControlLabel value="amount" control={<Radio />} label="Amount" />
              </RadioGroup>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={newLimit.status}
                  onChange={(e) => setNewLimit({ ...newLimit, status: e.target.checked })}
                />
              }
              label="Status"
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button 
                variant="outlined" 
                onClick={() => setIsAddingLimit(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                type="submit"
              >
                Save
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      <TableContainer component={Paper}>
        <Table>
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
            {limits.map((limit: Limit) => (
              <TableRow key={limit.id}>
                <TableCell>{limit.limitPeriod}</TableCell>
                <TableCell>{limit.limitType}</TableCell>
                <TableCell>
                  {limit.limitValueType === 'percent' 
                    ? `${limit.limitValue}%`
                    : formatCurrency(limit.limitValue, currency)
                  }
                </TableCell>
                <TableCell>{limit.limitValueType}</TableCell>
                <TableCell>
                  <Switch checked={limit.status} disabled />
                </TableCell>
                <TableCell>
                  {new Date(limit.created).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            {limits.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No limits found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
