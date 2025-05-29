import { createApi, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { User, UsersResponse } from '../../types/user';
import type { ImageApi } from '../../types/image';
import type { Limit, ExtendedLimit } from '../../types/limit';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';

interface ErrorResponse {
  message: string;
  status: number | string;
}

interface RawLimit extends Partial<Limit> {
  id?: string | number;
}

const transformErrorResponse = (error: FetchBaseQueryError): ErrorResponse => ({
  status: typeof error.status === 'number' ? error.status : 500,
  message: 'error' in error ? error.error : 'An unknown error occurred',
});

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User', 'Limit'],
  endpoints: (builder) => ({
    // Fetch users with pagination and total count
    getUsers: builder.query<UsersResponse, { limit: number; skip: number }>({
      query: ({ limit, skip }) => ({
        url: 'users',
        params: {
          limit,
          skip,
          select: 'id,firstName,lastName,age,email,username,bank',
        },
      }),
      transformResponse: (response: UsersResponse) => ({
        ...response,
        total: response.total || 0,
      }),
      transformErrorResponse,
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // Fetch a single user by ID
    getUser: builder.query<User, string>({
      query: (userId) => ({
        url: `users/${userId}`,
        params: {
          select: 'id,firstName,lastName,age,email,username,bank',
        },
      }),
      transformErrorResponse,
      providesTags: (result) =>
        result ? [{ type: 'User', id: result.id }] : [],
    }),

    // Fetch a random avatar image
    getAvatar: builder.query<string, void>({
      query: () => import.meta.env.VITE_BASE_URL_PICSUM,
      transformResponse: (response: ImageApi[]) => {
        const randomItem = response[Math.floor(Math.random() * response.length)];
        return randomItem.download_url;
      },
      transformErrorResponse,
      // Cache avatar for 1 hour
      keepUnusedDataFor: 3600,
    }),

    // Fetch limits with additional transformations
    getLimits: builder.query<{ limits: ExtendedLimit[] }, void>({
      query: () => ({
        url: '/c/a022-21ef-4179-910f',
        method: 'GET',
      }),
      transformResponse: (response: unknown): { limits: ExtendedLimit[] } => {
        const limitsArray = Array.isArray(response) ? response : [];
        return {
          limits: limitsArray.map((limit: RawLimit) => ({
            limitPeriod: limit.limitPeriod || '',
            limitType: limit.limitType || '',
            limitValue: limit.limitValue || 0,
            limitValueType: limit.limitValueType || '',
            created: formatDate(limit.created || new Date()),
            status: typeof limit.status === 'boolean'
              ? limit.status ? 'true' : 'false'
              : String(limit.status || false),
            id: String(limit.id || ''),
            formattedLimitValue: formatCurrency(limit.limitValue || 0),
          })),
        };
      },
      transformErrorResponse,
      providesTags: [{ type: 'Limit', id: 'LIST' }],
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
