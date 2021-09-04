export type UserModel = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
  roleName: string;
  active: boolean;
  lastAccessAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
};

export type CreateUserModel = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
  active: boolean;
};

export type ProfileModel = {
  id: string;
  userName: string;
  email: string;
  active: boolean;
  isAdmin: boolean;
};

export type UpdateUserPushTokenModel = {
  token: string;
};
