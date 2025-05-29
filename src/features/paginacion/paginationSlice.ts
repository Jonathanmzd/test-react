import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  limit: number;
  skip: number;
  total: number;
}

const initialState: PaginationState = {
  limit: 30,
  skip: 0,
  total: 0,
};

/**
 * Redux slice for managing pagination state across the application.
 * Handles page size (limit), current page offset (skip), and total record count.
 */
const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      if (action.payload > 0) {
        state.limit = action.payload;
      }
    },
    setSkip: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0) {
        state.skip = action.payload;
      }
    },
    setTotal: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0) {
        state.total = action.payload;
      }
    },
  },
});

// Export actions for use in components
export const { setLimit, setSkip, setTotal } = paginationSlice.actions;

// Export the reducer to be included in the store
export default paginationSlice.reducer;