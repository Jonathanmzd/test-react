import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { useAddLimitForm } from '../../hooks/useAddLimitForm';

const AddLimitSection: React.FC = () => {
  const {
    limitPeriod,
    setLimitPeriod,
    limitType,
    setLimitType,
    limitValue,
    setLimitValue,
    limitValueType,
    setLimitValueType,
    status,
    setStatus,
    errors,
    handleSubmit,
  } = useAddLimitForm();

  return (
    <Paper sx={{ p: 2, boxShadow: 'none' }}>
      <Typography variant="h6" gutterBottom>
        Add New Limit
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel id="limitPeriod-label">Limit Period</InputLabel>
          <Select
            labelId="limitPeriod-label"
            value={limitPeriod}
            label="Limit Period"
            onChange={(e) => setLimitPeriod(e.target.value)}
            error={!!errors.limitPeriod}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
          {errors.limitPeriod && (
            <Typography color="error" variant="caption">
              {errors.limitPeriod}
            </Typography>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel id="limitType-label">Limit Type</InputLabel>
          <Select
            labelId="limitType-label"
            value={limitType}
            label="Limit Type"
            onChange={(e) => setLimitType(e.target.value)}
            error={!!errors.limitType}
          >
            <MenuItem value="bet">Bet</MenuItem>
            <MenuItem value="deposit">Deposit</MenuItem>
          </Select>
          {errors.limitType && (
            <Typography color="error" variant="caption">
              {errors.limitType}
            </Typography>
          )}
        </FormControl>
        <TextField
          fullWidth
          sx={{ my: 1 }}
          label="Limit Value"
          type="number"
          value={limitValue}
          onChange={(e) => setLimitValue(Number(e.target.value))}
          error={!!errors.limitValue}
          helperText={errors.limitValue}
        />
        <FormControl component="fieldset" sx={{ my: 1 }}>
          <RadioGroup
            row
            value={limitValueType}
            onChange={(e) => setLimitValueType(e.target.value)}
          >
            <FormControlLabel value="percent" control={<Radio />} label="Percent" />
            <FormControlLabel value="amount" control={<Radio />} label="Amount" />
          </RadioGroup>
          {errors.limitValueType && (
            <Typography color="error" variant="caption">
              {errors.limitValueType}
            </Typography>
          )}
        </FormControl>
        <Box sx={{ my: 1 }}>
          <FormControlLabel
            control={<Switch checked={status} onChange={(e) => setStatus(e.target.checked)} />}
            label="Status (Active)"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddLimitSection;