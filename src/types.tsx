/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { JobAssetModel, JobModel } from './types/jobs';

export type AppStackParamList = {
  Auth: undefined;
  Root: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Root: undefined;
};

export type QRCodeScanResultModel = {
  data: string;
};

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  ScanQRCode: undefined;
  ScanQRCodeFound: QRCodeScanResultModel | undefined;
  ScanQRCodeNotFound: QRCodeScanResultModel | undefined;
  ReportAsset: any;
  Jobs: undefined;
  JobDetails: JobModel;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  MyJobs: undefined;
  ScanQRCode: undefined;
  Settings: undefined;
};

export type JobsParamsList = {
  Jobs: undefined;
  JobDetails: JobModel;
  JobAssetDetails: JobAssetModel;
};

export type AllParamList = AppStackParamList &
  AuthStackParamList &
  RootStackParamList & {};
