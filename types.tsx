/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { JobAssetModel, JobModel } from './types/jobs';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  ScanQRCode: undefined;
  ScanQRCodeFound: undefined;
  ScanQRCodeNotFound: undefined;
  Jobs: undefined;
  JobDetails: JobModel;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  MyJobs: undefined;
  ScanQRCode: undefined;
  Settings: undefined;
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type JobsParamsList = {
  Jobs: undefined;
  JobDetails: JobModel;
  JobAssetDetails: JobAssetModel;
};
