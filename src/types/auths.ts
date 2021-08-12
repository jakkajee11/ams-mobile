export type LoginModel = {
  clientId: string;
  userName: string;
  password: string;
};

export type LogoutModel = {
  clientId: string;
  token: string;
};

export type RefreshTokenModel = {
  clientId: string;
  refreshToken: string;
};

export type ForgotPasswordModel = {
  userName: string;
};

export type UserTokenModel = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};
