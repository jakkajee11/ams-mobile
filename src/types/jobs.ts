import { AssetModel } from './assets';

export type JobModel = {
  id: string;
  jobNumber: string;
  jobStatusId: number;
  assigneeId?: string;
  assignerId?: string;
  dueDate: string;
  details?: string;
  comments?: string;
  location?: string;
  subLocation?: string;
  assets: JobAssetModel[];
  createdAt: string;
  createdUserId?: string;
  modifiedUserId?: string;
};

export type JobAssetModel = {
  key: string;
  id: string;
  // jobAssetStatusId: number;
  jobAssetStatusName: string;
  assetId: string;
  // assetTypeId: string;
  // costCenterId: string;
  // assetStatusId: string;
  // details: string;
  // location: string;
  // subLocation?: string;
  // yearOfManufacture?: number;
  // warrantyEndAt?: string;
  // assetClassId?: string;
  // serialNo?: boolean;
  // assetNo?: string;
  // others?: string;
};
