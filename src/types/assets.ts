export type AssetModel = {
  id: string;
  assetId: string;
  assetStatusName: string;
  createdAt: string;
};

export type ReportAssetModel = {
  assetId: string;
  location: string;
  subLocation?: string;
  details?: string;
  attachments?: string[];
};
