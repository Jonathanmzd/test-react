import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UsersResponse } from '../../types/user';
import type { ImageApi } from '../../types/image';
import type { Limit, ExtendedLimit } from '../../types/limit';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () =>
        'users?select=id,firstName,lastName,age,email,username,bank',
    }),
    getUser: builder.query<User, string>({
      query: (userId) =>
        `users/${userId}?select=id,firstName,lastName,age,email,username,bank`,
    }),
    getAvatar: builder.query<string, void>({
      query: () => import.meta.env.VITE_BASE_URL_PICSUM,
      transformResponse: (response: ImageApi[]) => {
        const randomItem = response[Math.floor(Math.random() * response.length)];
        return randomItem.download_url;
      },
    }),
    getLimits: builder.query<{ limits: ExtendedLimit[] }, void>({
      query: () => '/c/a022-21ef-4179-910f',
      transformResponse: (response: unknown): { limits: ExtendedLimit[] } => {
        const limitsArray: Limit[] = Array.isArray(response) ? response : [];
        return {
          limits: limitsArray.map((limit) => ({
            ...limit,
            // Format the currency date using our helper pipe
            formattedLimitValue: formatCurrency(limit.limitValue, 'en-US', 'USD'),
            // Format the created date using our helper pipe
            created: formatDate((limit as any).created || ''),
            status: typeof limit.status === 'boolean'
              ? (limit.status ? '🟢' : '🔴')
              : limit.status,
          })),
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetAvatarQuery,
  useGetLimitsQuery,
} = usersApi;
