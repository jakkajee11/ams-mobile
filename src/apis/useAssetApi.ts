import useApi from '~hooks/useApi';
import { ReportAssetModel } from '~types/assets';

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

  const getAssetByAddressId = async (id: string) => {
    const url = `${endpoint}/shipto/${id}`;
    return await get(url);
  };

  const checkAsset = async (assetId: string) => {
    const url = `${endpoint}/checkasset/${assetId}`;
    return await get(url);
  };

  // const reportAssetLocation = async (model: ReportAssetModel) => {
  //   return await post(`${endpoint}/notify`, model);
  // };

  return {
    getAsset,
    getAssetInfo,
    getAssetByAddressId,
    checkAsset,
    // reportAssetLocation,
  };
}
