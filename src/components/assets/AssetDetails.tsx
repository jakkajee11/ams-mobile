import React from 'react';
import { View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { ATTACHMENT_TYPE } from '~constants/Status';
import baseStyles from '~styles/baseStyles';
import { AssetDetailModel } from '../../types/assets';

interface AssetProps {
  data: AssetDetailModel | undefined;
  onPress?: () => void;
}

export default function AssetDetails({ data, onPress }: AssetProps) {
  const handleOnPress = () => {
    onPress && onPress();
  };

  return (
    <View style={baseStyles.container}>
      <View style={baseStyles.row}>
        <Text>Serial No: </Text>
        <Text>{data?.serialNo} </Text>
      </View>

      <View style={baseStyles.row}>
        <Text>Asset ID:</Text>
        <Text>{data?.assetId}</Text>
      </View>

      <View style={baseStyles.row}>
        <Text>Asset Type: </Text>
        <Text>{data?.assetTypeName}</Text>
      </View>

      <View style={baseStyles.row}>
        <Text>Cost Center:</Text>
        <Text style={baseStyles.longText}>{data?.costCenterName}</Text>
      </View>

      <View style={baseStyles.row}>
        <Text>Status:</Text>
        <Text>{data?.assetStatusName}</Text>
      </View>

      <View style={baseStyles.row}>
        <Text>Sold-To:</Text>
        <Text style={baseStyles.longText}>{data?.shipToName}</Text>
      </View>

      <View style={baseStyles.row}>
        <Text>Ship-To:</Text>
        <Text style={baseStyles.longText}>{data?.shipToName} </Text>
      </View>

      <View style={baseStyles.row}>
        <Text>Asset Class:</Text>
        <Text style={baseStyles.longText}>{data?.assetClassName} </Text>
      </View>

      <View style={baseStyles.row}>
        <Text>Asset No (SAP):</Text>
        <Text>{data?.assetNo} </Text>
      </View>

      <View style={baseStyles.row}>
        <Text>Year of Mfg: </Text>
        <Text>{data?.yearOfManufacture} </Text>
      </View>

      <View style={baseStyles.row}>
        <Text>Warranty: </Text>
        <Text>{data?.warrantyEndAt} </Text>
      </View>

      <View style={baseStyles.col}>
        <Text>Detail:</Text>
        <Text style={baseStyles.longText}>{data?.details} </Text>
      </View>

      <View style={baseStyles.col}>
        <Text>Other:</Text>
        <Text style={baseStyles.longText}>{data?.others} </Text>
      </View>

      <View>
        <Text>Attachments</Text>
        {data?.attachments?.length === 0 && <Text>[ No attachment ]</Text>}
        {data?.attachments && data?.attachments.length > 0 && (
          <>
            <View style={baseStyles.attachmentContainer}>
              {data.attachments
                .filter((atm) => atm.type === ATTACHMENT_TYPE.Photo)
                .map((atm) => (
                  <View key={atm.id}>
                    <Image
                      source={{ uri: `data:image/jpeg;base64,${atm.blob}` }}
                      style={baseStyles.image}
                    />
                    <Text>{atm.schemaName}</Text>
                  </View>
                ))}
            </View>
          </>
        )}
      </View>
    </View>
  );
}
