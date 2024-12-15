import useApi from '~hooks/useApi'
import {
  UpdateAssetAgingModel,
  UpdateAssetStatusAndLocationModel,
} from '~types/assets'

const endpoint = 'v1/assets'
export default function useAssetApi() {
  const { get, post, put } = useApi()

  const getAsset = async (id: string) => {
    const url = `${endpoint}/${id}`
    return await get(url)
  }

  const getAssetInfo = async (assetId: string) => {
    const url = `${endpoint}/assetinfo?code=${encodeURIComponent(assetId)}`
    return await get(url)
  }

  const searchAssets = async (serialNo: string) => {
    const url = `${endpoint}/search/${serialNo}`
    return await get(url)
  }

  const getAssetByAddressId = async (id: string) => {
    const url = `${endpoint}/shipto/${id}?page=0&size=10`
    return await get(url)
  }

  const getAssetByAssetTypeDetailId = async (id: string) => {
    const url = `${endpoint}/type-detail/${id}?page=0&size=10`
    return await get(url)
  }

  const updateStatusAndLocations = async (
    assets: UpdateAssetStatusAndLocationModel[]
  ) => {
    return await put(`${endpoint}/status-location/bulk`, assets)
  }

  const resetAging = async (payload: UpdateAssetAgingModel) => {
    return await put(`${endpoint}/aging/reset`, payload)
  }

  return {
    getAsset,
    getAssetInfo,
    getAssetByAddressId,
    getAssetByAssetTypeDetailId,
    searchAssets,
    updateStatusAndLocations,
    resetAging,
  }
}
