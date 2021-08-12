import useApi from '~hooks/useApi';
import { AssetModel, ReportAssetModel } from '~types/assets';

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

const endpoint = 'v1/assets';
export default function useAssetApi() {
  const { get, post } = useApi();

  const getAsset = async (id: string) => {
    const url = `${endpoint}/${id}`;
    return await get(url);
  };

  const getAssetInfo = async (assetId: string) => {
    const url = `${endpoint}/assetinfo/${assetId}`;
    return await get(url);
  };

  const reportAssetLocation = async (model: ReportAssetModel) => {
    return await post(`${endpoint}/notify`, model);
  };

  return {
    getAsset,
    getAssetInfo,
    reportAssetLocation,
  };
}
