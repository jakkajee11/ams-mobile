export type AssetModel = {
  key?: string
  id: string
  assetId: string
  assetTypeId: string
  costCenterId: string
  assetStatusId: string
  details: string
  locationId: string
  subLocation?: string
  yearOfManufacture?: number
  warrantyEndAt?: string
  assetClassId?: string
  serialNo: string
  assetNo?: string
  others?: string
  attachments?: Attachment[]
  createdUserId: string
  modifiedUserId?: string
  ownerRoleId?: string
}

export type Attachment = {
  blob: string
  id: string
  name: string
  schemaName: string
  type: number
}

export type AssetDetailModel = AssetModel & {
  assetTypeName: string
  assetTypeDetailName: string
  costCenterName: string
  assetStatusName: string
  assetClassName: string
  soldToName: string
  shipToName: string
  locationName: string
  createdUserName: string
  modifiedUserName: string
  ownerRoleName: string
  comments: string
  agingEnabled?: boolean
}

export type ReportAssetModel = {
  assetId: string
  serialNo: string
  location: string
  //subLocation?: string;
  details?: string
  comments?: string
  attachments?: string[]
}

export type UpdateAssetStatusAndLocationModel = {
  id: string
  assetStatusId: string
  locationId: string
}
