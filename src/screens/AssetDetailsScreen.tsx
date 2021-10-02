import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Image } from 'react-native-elements';

import { JobsParamsList } from '../types';
import Loading from '~components/shared/Loading';
import useAssetApi from '~apis/useAssetApi';
import { AssetDetailModel } from '~types/assets';
import { ATTACHMENT_TYPE } from '~constants/Status';
import baseStyles from '~styles/baseStyles';
import AssetDetails from '~components/assets/AssetDetails';

export default function AssetDetailsScreen({
  route,
  navigation,
}: StackScreenProps<JobsParamsList, 'AssetDetails'>) {
  const { getAssetInfo } = useAssetApi();
  const [loading, setLoading] = useState(false);
  const [data, setAssetDetail] = useState<AssetDetailModel>();

  useEffect(() => {
    (async function () {
      setLoading(true);
      const res = await getAssetInfo(route.params.assetId);
      if (res && res.status === 200 && res.data) {
        setAssetDetail(res.data);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <ScrollView style={baseStyles.scrollView}>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        // <View style={baseStyles.container}>
        //   <View style={baseStyles.row}>
        //     <Text>Asset ID:</Text>
        //     <Text>{data?.assetId}</Text>
        //   </View>

        //   <View style={baseStyles.row}>
        //     <Text>Asset Type: </Text>
        //     <Text>{data?.assetTypeName}</Text>
        //   </View>

        //   <View style={baseStyles.row}>
        //     <Text>Cost Center:</Text>
        //     <Text>{data?.costCenterName}</Text>
        //   </View>

        //   <View style={baseStyles.row}>
        //     <Text>Status:</Text>
        //     <Text>{data?.assetStatusName}</Text>
        //   </View>

        //   <View style={baseStyles.row}>
        //     <Text>Location:</Text>
        //     <Text>{data?.location}</Text>
        //   </View>

        //   <View style={baseStyles.row}>
        //     <Text>Sub Location:</Text>
        //     <Text>{data?.subLocation} </Text>
        //   </View>

        //   <View style={baseStyles.row}>
        //     <Text>Asset Class:</Text>
        //     <Text>{data?.assetClassName} </Text>
        //   </View>

        //   <View style={baseStyles.row}>
        //     <Text>Serial No: </Text>
        //     <Text>{data?.serialNo} </Text>
        //   </View>

        //   <View style={baseStyles.row}>
        //     <Text>Asset No (SAP):</Text>
        //     <Text>{data?.assetNo} </Text>
        //   </View>

        //   <View style={baseStyles.row}>
        //     <Text>Year of Mfg: </Text>
        //     <Text>{data?.yearOfManufacture} </Text>
        //   </View>

        //   <View style={baseStyles.row}>
        //     <Text>Warranty: </Text>
        //     <Text>{data?.warrantyEndAt} </Text>
        //   </View>

        //   <View style={baseStyles.col}>
        //     <Text>Detail:</Text>
        //     <Text style={baseStyles.longText}>{data?.details} </Text>
        //   </View>

        //   <View style={baseStyles.col}>
        //     <Text>Other:</Text>
        //     <Text style={baseStyles.longText}>{data?.others} </Text>
        //   </View>

        //   <View>
        //     <Text>Attachments</Text>
        //     {data?.attachments?.length === 0 && <Text>[ No attachment ]</Text>}
        //     {data?.attachments && data?.attachments.length > 0 && (
        //       <>
        //         <View style={baseStyles.attachmentContainer}>
        //           {data.attachments
        //             .filter((atm) => atm.type === ATTACHMENT_TYPE.Photo)
        //             .map((atm) => (
        //               <View key={atm.id}>
        //                 <Image
        //                   source={{ uri: `data:image/jpeg;base64,${atm.blob}` }}
        //                   style={baseStyles.image}
        //                 />
        //                 <Text>{atm.schemaName}</Text>
        //               </View>
        //             ))}
        //         </View>
        //       </>
        //     )}
        //   </View>
        // </View>
        <AssetDetails data={data} />
      )}
    </ScrollView>
  );
}
