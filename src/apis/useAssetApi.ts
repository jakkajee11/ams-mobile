import useApi from '~hooks/useApi';
import { AssetModel } from '~types/assets';

export interface AssetQueryProps {
  page: number;
  size: number;
  search: string;
}

export interface AssetLogQueryProps {
  id: string;
  page: number;
  size: number;
  search: string;
}

const endpoint = 'assets';
export default function useAssetApi() {
  const {
    instance: api,
    find,
    get,
    post,
    put,
    delete: remove,
    exportFile,
    postExportFile,
  } = useApi();

  const getAssets = async (query: AssetQueryProps) => {
    return await find(endpoint, query);
  };

  const getAssetLogs = async (query: AssetLogQueryProps) => {
    const url = `${endpoint}/${query.id}/logs`;
    return await find(url, query);
  };

  const advSearch = async (query: AssetModel) => {
    return await post(`${endpoint}/search`, query);
  };

  const getAsset = async (id: string) => {
    const url = `${endpoint}/${id}`;
    return await get(url);
  };

  const getAssetLog = async (id: string) => {
    const url = `${endpoint}/logs/${id}/detail`;
    return await get(url);
  };

  const fetchTypes = async () => {
    return await get(`${endpoint}/types`);
  };

  const fetchCostCenters = async () => {
    return await get(`${endpoint}/costcenters`);
  };

  const fetchStatuses = async () => {
    return await get(`${endpoint}/statuses`);
  };

  const fetchClasses = async () => {
    return await get(`${endpoint}/classes`);
  };

  const create = async (payload: AssetModel) => {
    return await post(endpoint, payload);
  };

  const update = async (payload: AssetModel) => {
    return await put(`${endpoint}/${payload.id}`, payload);
  };

  const destroy = async (id: string) => {
    return await remove(`${endpoint}/${id}`);
  };

  const exportAssets = async (query: AssetQueryProps) => {
    const url = `${endpoint}/export`;
    return await exportFile(url, { ...query, page: 0 });
  };

  const exportAssetLogs = async (query: AssetLogQueryProps) => {
    const url = `${endpoint}/${query.id}/logs/export`;
    return await exportFile(url, query);
  };

  const exportAdvSearch = async (query: AssetModel) => {
    return await postExportFile(`${endpoint}/search/export`, query);
  };

  return {
    getAssets,
    getAssetLogs,
    getAssetLog,
    getAsset,
    fetchTypes,
    fetchStatuses,
    fetchCostCenters,
    fetchClasses,
    advSearch,
    exportAdvSearch,
    create,
    update,
    destroy,
    exportAssets,
    exportAssetLogs,
  };
}
