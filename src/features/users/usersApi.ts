import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UsersResponse } from '../../types/user';
import type { ImageApi } from '../../types/image';
import type { Limit, ExtendedLimit } from '../../types/limit';
import { formatDate } from '../../utils/formatDate';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    // Fetch users with pagination and total count
    getUsers: builder.query<UsersResponse, { limit: number; skip: number }>({
      query: ({ limit, skip }) =>
        `users?limit=${limit}&skip=${skip}&select=id,firstName,lastName,age,email,username,bank`,
      transformResponse: (response: UsersResponse) => {
        // Ensure the total count is included in the response
        return {
          ...response,
          total: response.total || 0, // Default to 0 if total is not provided
        };
      },
    }),

    // Fetch a single user by ID
    getUser: builder.query<User, string>({
      query: (userId) =>
        `users/${userId}?select=id,firstName,lastName,age,email,username,bank`,
    }),

    // Fetch a random avatar image
    getAvatar: builder.query<string, void>({
      query: () => import.meta.env.VITE_BASE_URL_PICSUM,
      transformResponse: (response: ImageApi[]) => {
        // Select a random image from the response
        const randomItem = response[Math.floor(Math.random() * response.length)];
        return randomItem.download_url;
      },
    }),

    // Fetch limits with additional transformations
    getLimits: builder.query<{ limits: ExtendedLimit[] }, void>({
      query: () => '/c/a022-21ef-4179-910f',
      transformResponse: (response: unknown): { limits: ExtendedLimit[] } => {
        // Transform the response to include formatted data
        const limitsArray: Limit[] = Array.isArray(response) ? response : [];
        return {
          limits: limitsArray.map((limit) => ({
            ...limit,
            created: formatDate((limit as any).created || ''), // Format the created date
            status:
              typeof limit.status === 'boolean'
                ? limit.status
                  ? 'true'
                  : 'false'
                : limit.status, // Convert boolean status to string
            id: (limit as any).id || '', // Ensure ID is included
            formattedLimitValue: (limit as any).limitValue || 0, // Default limit value to 0
          })),
        };
      },
    }),
  }),
});

// Export hooks for each query
export const {
  useGetUsersQuery, // Hook to fetch users
  useGetUserQuery, // Hook to fetch a single user
  useGetAvatarQuery, // Hook to fetch a random avatar
  useGetLimitsQuery, // Hook to fetch limits
} = usersApi;
