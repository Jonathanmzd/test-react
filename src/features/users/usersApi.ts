import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UsersResponse } from '../../types/user';
import type { Limit } from '../../types/limit';

interface LimitsResponse {
  limits: Limit[];
}

// Create a mutable state for mock data
const mockLimitsState = {
  data: [
    {
      id: '1',
      limitPeriod: 'daily',
      limitType: 'bet',
      limitValue: 1000,
      limitValueType: 'amount',
      status: true,
      created: new Date('2024-02-14T03:26:00').toISOString()
    },
    {
      id: '2',
      limitPeriod: 'weekly',
      limitType: 'bet',
      limitValue: 5000,
      limitValueType: 'amount',
      status: true,
      created: new Date('2024-03-14T03:26:00').toISOString()
    },
    {
      id: '3',
      limitPeriod: 'monthly',
      limitType: 'deposit',
      limitValue: 15000,
      limitValueType: 'amount',
      status: false,
      created: new Date('2024-03-16T03:26:00').toISOString()
    }
  ]
};

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Limit'],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => 'users?select=id,firstName,lastName,age,email,username,bank'
    }),
    getUser: builder.query<User, string>({
      query: (id) => `users/${id}?select=id,firstName,lastName,age,email,username,bank`
    }),
    getLimits: builder.query<LimitsResponse, void>({
      queryFn: () => {
        // Return mock data from state
        return { data: { limits: [...mockLimitsState.data] } };
      },
      providesTags: [{ type: 'Limit', id: 'LIST' }]
    }),
    addLimit: builder.mutation<Limit, Limit>({
      queryFn: async (newLimit) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Add the new limit to mock data state
        mockLimitsState.data = [...mockLimitsState.data, newLimit];
        
        return { data: newLimit };
      },
      invalidatesTags: [{ type: 'Limit', id: 'LIST' }]
    })
  })
});

export const { 
  useGetUsersQuery, 
  useGetUserQuery, 
  useGetLimitsQuery,
  useAddLimitMutation
} = usersApi;
