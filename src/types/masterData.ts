export type CostCenterModel = {
  id: string;
  name: string;
  createdUserId: string;
  createdUserName: string;
  createdAt: string;
  modifiedUserId?: string;
  modifiedAt?: string;
};

export type AssetTypeModel = {
  id: string;
  name: string;
  agingDays?: number;
  ownerRoleId?: string;
  ownerRoleName?: string;
  createdUserId: string;
  createdUserName: string;
  createdAt: string;
  modifiedUserId?: string;
  modifiedAt?: string;
};

export type AssetTypeDetailModel = {
  id: string;
  name: string;
  createdUserId: string;
  createdUserName: string;
  createdAt: string;
  modifiedUserId?: string;
  modifiedAt?: string;
};

export type AssetClassModel = {
  id: string;
  code: string;
  createdUserId: string;
  createdUserName: string;
  createdAt: string;
  modifiedUserId?: string;
  modifiedAt?: string;
};

export type AssetStatusModel = {
  id: string;
  name: string;
  createdUserId: string;
  createdUserName: string;
  createdAt: string;
  modifiedUserId?: string;
  modifiedAt?: string;
};

export type ShipAddressModel = {
  id: string;
  name: string;
  createdUserId: string;
  createdUserName: string;
  createdAt: string;
  modifiedUserId?: string;
  modifiedAt?: string;
};
