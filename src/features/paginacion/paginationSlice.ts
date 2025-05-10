import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Slice for managing pagination state
const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    limit: 30, // Default page size
    skip: 0,   // Default starting point for pagination
    total: 0,  // Total number of records
  },
  reducers: {
    // Action to update the page size (limit)
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    // Action to update the starting point (skip)
    setSkip(state, action: PayloadAction<number>) {
      state.skip = action.payload;
    },
    // Action to update the total number of records
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
  },
});

// Export actions for use in components
export const { setLimit, setSkip, setTotal } = paginationSlice.actions;

// Export the reducer to be included in the store
export default paginationSlice.reducer;