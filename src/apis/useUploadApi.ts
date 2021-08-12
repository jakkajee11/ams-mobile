import useApi from '~hooks/useApi';
import { UploadFileBase64Model } from '~types/fileUploads';

const endpoint = 'v1/uploads';
export default function useUploadApi() {
  const { post } = useApi();

  const uploadFile = async (file: UploadFileBase64Model) => {
    return await post(`${endpoint}/fileupload`, file);
  };

  return {
    uploadFile,
  };
}
