import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    limit: 30, // Default page size
    skip: 0,   // Default starting point
    total: 0,  // Total number of records
  },
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setSkip(state, action: PayloadAction<number>) {
      state.skip = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload; // Update total records
    },
  },
});

export const { setLimit, setSkip, setTotal } = paginationSlice.actions;
export default paginationSlice.reducer;