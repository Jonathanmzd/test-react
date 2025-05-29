export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  bank?: {
    currency: string;
    [key: string]: unknown;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}