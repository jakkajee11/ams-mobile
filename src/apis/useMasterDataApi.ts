import useApi from '~hooks/useApi';
import {
  AssetClassModel,
  AssetStatusModel,
  AssetTypeDetailModel,
  AssetTypeModel,
  CostCenterModel,
  ShipAddressModel,
} from '~types/masterData';
import { SearchQuery } from '~types/queries';

const endpoint = 'v1/masters';
export default function useMasterDataApi() {
  const { find, get, post, put, delete: remove, exportFile } = useApi();

  const getAssetTypes = async (query: SearchQuery) => {
    var url = `${endpoint}/types`;
    return await find(url, query);
  };

  const getAssetType = async (id: string) => {
    return await get(`${endpoint}/types/${id}`);
  };

  const createAssetType = async (payload: AssetTypeModel) => {
    return await post(`${endpoint}/types`, payload);
  };

  const updateAssetType = async (payload: AssetTypeModel) => {
    return await put(`${endpoint}/types`, payload);
  };

  const deleteAssetType = async (id: string) => {
    return await remove(`${endpoint}/types/${id}`);
  };

  const exportAssetTypes = async (query: SearchQuery) => {
    const url = `${endpoint}/types/export`;
    return await exportFile(url, { ...query, page: 0 });
  };

  const getAssetTypeDetails = async (query: SearchQuery) => {
    var url = `${endpoint}/typedetails`;
    return await find(url, query);
  };

  const getAssetTypeDetail = async (id: string) => {
    return await get(`${endpoint}/typedetails/${id}`);
  };

  const createAssetTypeDetail = async (payload: AssetTypeDetailModel) => {
    return await post(`${endpoint}/typedetails`, payload);
  };

  const updateAssetTypeDetail = async (payload: AssetTypeDetailModel) => {
    return await put(`${endpoint}/typedetails`, payload);
  };

  const deleteAssetTypeDetail = async (id: string) => {
    return await remove(`${endpoint}/typedetails/${id}`);
  };

  const exportAssetTypeDetails = async (query: SearchQuery) => {
    const url = `${endpoint}/typedetails/export`;
    return await exportFile(url, { ...query, page: 0 });
  };

  const getAssetClasses = async (query: SearchQuery) => {
    var url = `${endpoint}/classes`;
    return await find(url, query);
  };

  const getAssetClass = async (id: string) => {
    return await get(`${endpoint}/classes/${id}`);
  };

  const createAssetClass = async (payload: AssetClassModel) => {
    return await post(`${endpoint}/classes`, payload);
  };

  const updateAssetClass = async (payload: AssetClassModel) => {
    return await put(`${endpoint}/classes`, payload);
  };

  const deleteAssetClass = async (id: string) => {
    return await remove(`${endpoint}/classes/${id}`);
  };

  const exportAssetClasses = async (query: SearchQuery) => {
    const url = `${endpoint}/classes/export`;
    return await exportFile(url, { ...query, page: 0 });
  };

  const getCostCenters = async (query: SearchQuery) => {
    var url = `${endpoint}/costcenters`;
    return await find(url, query);
  };

  const getCostCenter = async (id: string) => {
    return await get(`${endpoint}/costcenters/${id}`);
  };

  const createCostCenter = async (payload: CostCenterModel) => {
    return await post(`${endpoint}/costcenters`, payload);
  };

  const updateCostCenter = async (payload: CostCenterModel) => {
    return await put(`${endpoint}/costcenters`, payload);
  };

  const deleteCostCenter = async (id: string) => {
    return await remove(`${endpoint}/costcenters/${id}`);
  };

  const exportCostCenters = async (query: SearchQuery) => {
    const url = `${endpoint}/costcenters/export`;
    return await exportFile(url, { ...query, page: 0 });
  };

  const getAssetStatuses = async (query: SearchQuery) => {
    var url = `${endpoint}/statuses`;
    return await find(url, query);
  };

  const getAssetStatus = async (id: string) => {
    return await get(`${endpoint}/statuses/${id}`);
  };

  const createAssetStatus = async (payload: AssetStatusModel) => {
    return await post(`${endpoint}/statuses`, payload);
  };

  const updateAssetStatus = async (payload: AssetStatusModel) => {
    return await put(`${endpoint}/statuses`, payload);
  };

  const deleteAssetStatus = async (id: string) => {
    return await remove(`${endpoint}/statuses/${id}`);
  };

  const exportAssetStatuses = async (query: SearchQuery) => {
    const url = `${endpoint}/statuses/export`;
    return await exportFile(url, { ...query, page: 0 });
  };

  const getShipAddresses = async (query: SearchQuery) => {
    var url = `${endpoint}/shipaddresses`;
    console.log(['shipaddress', url]);
    return await find(url, query);
  };

  const getShipAddress = async (id: string) => {
    return await get(`${endpoint}/shipaddresses/${id}`);
  };

  const createShipAddress = async (payload: ShipAddressModel) => {
    return await post(`${endpoint}/shipaddresses`, payload);
  };

  const updateShipAddress = async (payload: ShipAddressModel) => {
    return await put(`${endpoint}/shipaddresses`, payload);
  };

  const deleteShipAddress = async (id: string) => {
    return await remove(`${endpoint}/shipaddresses/${id}`);
  };

  const exportShipAddresses = async (query: SearchQuery) => {
    const url = `${endpoint}/shipaddresses/export`;
    return await exportFile(url, { ...query, page: 0 });
  };

  return {
    getAssetTypes,
    getAssetType,
    createAssetType,
    updateAssetType,
    deleteAssetType,
    exportAssetTypes,

    getAssetTypeDetails,
    getAssetTypeDetail,
    createAssetTypeDetail,
    updateAssetTypeDetail,
    deleteAssetTypeDetail,
    exportAssetTypeDetails,

    getAssetClasses,
    getAssetClass,
    createAssetClass,
    updateAssetClass,
    deleteAssetClass,
    exportAssetClasses,

    getAssetStatuses,
    getAssetStatus,
    createAssetStatus,
    updateAssetStatus,
    deleteAssetStatus,
    exportAssetStatuses,

    getCostCenters,
    getCostCenter,
    createCostCenter,
    updateCostCenter,
    deleteCostCenter,
    exportCostCenters,

    getShipAddresses,
    getShipAddress,
    createShipAddress,
    updateShipAddress,
    deleteShipAddress,
    exportShipAddresses,
  };
}
