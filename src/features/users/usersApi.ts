import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
}

interface UsersResponse {
  users: User[];
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => 'users?select=id,firstName,lastName,age,email,username,bank',
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
