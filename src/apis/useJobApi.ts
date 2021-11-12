import { JOB_STATUS } from '~constants/Status';
import useApi from '~hooks/useApi';
import {
  CreateShipJobModel,
  JobCountQuery,
  JobQuery,
  UpdateJobAssetStatusModel,
} from '~types/jobs';
import buildQueryString from '~utils/buildQueryString';

const endpoint = 'v1/jobs';
export default function useJobApi() {
  const { get, post, put } = useApi();

  const getJobs = async (query: JobQuery) => {
    return await post(`${endpoint}/search`, query);
  };

  const getPendingJobs = async (query: JobQuery) => {
    return await getJobs({ ...query, status: JOB_STATUS.Pending });
  };

  const getWorkingJobs = async (query: JobQuery) => {
    return await getJobs({ ...query, status: JOB_STATUS.InProgress });
  };

  const getFinishedJobs = async (query: JobQuery) => {
    return await getJobs({ ...query, status: JOB_STATUS.Finished });
  };

  const getCompletedJobs = async (query: JobQuery) => {
    return await getJobs({ ...query, status: JOB_STATUS.Completed });
  };

  const getJobsCount = async (query: JobCountQuery) => {
    return await get(`${endpoint}/jobcount${buildQueryString(query)}`);
  };

  const getJob = async (id: string) => {
    const url = `${endpoint}/${id}`;
    return await get(url);
  };

  const updateJobStatus = async (id: string, status: number) => {
    const url = `${endpoint}/${id}/status`;
    return await put(url, { status });
  };

  const updateJobProgress = async (id: string, progress: number) => {
    const url = `${endpoint}/${id}/progress`;
    return await put(url, progress);
  };

  const updateJobAssetStatus = async ({
    jobId,
    assetId,
    status,
  }: UpdateJobAssetStatusModel) => {
    const url = `${endpoint}/${jobId}/jobasset/status`;
    return await put(url, { jobId, assetId, status });
  };

  const createShipJob = async (payload: CreateShipJobModel) => {
    return await post(`${endpoint}/ship`, payload);
  };

  return {
    getPendingJobs,
    getWorkingJobs,
    getFinishedJobs,
    getCompletedJobs,
    getJob,
    getJobsCount,
    updateJobStatus,
    updateJobProgress,
    updateJobAssetStatus,
    createShipJob,
  };
}
