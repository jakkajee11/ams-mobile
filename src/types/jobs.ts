export type JobModel = {
  id: string;
  jobNumber: string;
  jobStatusId: number;
  jobStatusName: string;
  jobProgressId: number;
  assigneeId?: string;
  assignerId?: string;
  dueDate: string;
  details?: string;
  comments?: string;
  soldToName: string;
  shipToName: string;
  assets: JobAssetModel[];
  createdAt: string;
  startedAt?: string;
  stoppedAt?: string;
  createdUserId?: string;
  modifiedUserId?: string;
};

export type JobAssetModel = {
  key: string;
  jobAssetStatusId: number;
  jobAssetStatusName: string;
  assetId: string;
  assetTypeId: string;
  assetTypeName: string;
  costCenterId: string;
  assetStatusId: string;
  assetStatusName: string;
  details: string;
  location: string;
  subLocation?: string;
  soldToName: string;
  shipToName: string;
  yearOfManufacture?: number;
  warrantyEndAt?: string;
  assetClassId?: string;
  serialNo: string;
  assetNo?: string;
  others?: string;
};

export type JobQuery = {
  status: number;
  page: number;
  size: number;
  startDate?: string;
  endDate?: string;
  //assigneeId: string;
};

export type JobCountQuery = {
  startDate?: string;
  endDate?: string;
};

export type UpdateJobAssetStatusModel = {
  jobId: string;
  assetId: string;
  status: number;
};

export type CreateShipJobModel = {
  shipToId: string;
};
