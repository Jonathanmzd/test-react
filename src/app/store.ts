import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from '../features/paginacion/paginationSlice';
import { usersApi } from '../features/users/usersApi';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
