import { User } from './users';
import { ErrorInfo } from './error';

// --- Login ---

export type LoginRequestData = {
  userName: string;
  password: string;
};

export type LoginRequest = {
  data: LoginRequestData;
};

export type LoginResponseData = {
  accessToken: string | null;
  expiresIn: string | null;
  refreshToken: string | null;
  user: User | null;
};

export type LoginResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
  data: LoginResponseData | null;
};

// --- Refresh token ---

export type RefreshTokenRequestData = {
  refreshToken: string;
};

export type RefreshTokenRequest = {
  data: RefreshTokenRequestData;
};

export type RefreshTokenResponseData = {
  accessToken: string | null;
  expiresIn: string | null;
  refreshToken: string | null;
  user: User | null;
};

export type RefreshTokenResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
  data: LoginResponseData | null;
};
