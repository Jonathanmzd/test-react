export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  bank?: any;
}

export interface UsersResponse {
  users: User[];
}