import useApi from '~hooks/useApi';
import { ReportAssetModel } from '~types/assets';

const endpoint = 'v1/assetnotifications';
export default function useAssetNotificationApi() {
  const { post } = useApi();

  const reportAssetLocation = async (model: ReportAssetModel) => {
    return await post(`${endpoint}`, model);
  };

  return {
    reportAssetLocation,
  };
}
