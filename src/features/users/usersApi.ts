import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UsersResponse } from '../../types/user';
import type { ImageApi } from '../../types/image';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => 'users?select=id,firstName,lastName,age,email,username,bank',
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
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useGetAvatarQuery } = usersApi;
