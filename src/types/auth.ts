import { HttpResponse } from './common';
import { IUser } from './user';

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  fullName: string
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUser
};

export type ResetPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type ForgotPasswordRequest = {
  password: string;
  token: string;
};

export type ChangePasswordRequest = {
  password: string;
  is_default: number;
  user_id: string | number
};

export type VerifyUsernameRequest = {
  username: string;
};

export type ResetPasswordResponse = Promise<HttpResponse<string>>;
