import { ErrorInfo } from './error';

// --- Common ---

export type User = {
  id: string;
  login: string | null;
  role: string | null;
  mail: string | null;
};

export type UserWithNewPassword = {
  id: string;
  login: string | null;
  newPassword: string | null;
  role: string | null;
  mail: string | null;
};

// --- Fetch user ---

export type FetchUserRequest = null;
export type DeleteUserRequest = null;


export type FetchUserResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
  data: UserWithNewPassword | null;
};
// --- Fetch delete user ---

export type FetchDeleteUserResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
};

// --- Fetch all users ---

export type FetchAllUsersRequest = null;

export type FetchAllUsersResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
  data: UserWithNewPassword[] | null;
};

export type UserUpdateRequest = {
  data: UserWithNewPassword;
};