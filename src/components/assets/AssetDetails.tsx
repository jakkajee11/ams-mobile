import React from 'react'
import { View } from 'react-native'
import { Image, Text } from 'react-native-elements'
import { ATTACHMENT_TYPE } from '~constants/Status'
import baseStyles from '~styles/baseStyles'
import { AssetDetailModel } from '../../types/assets'
import Stack from '~components/shared/Stack'

interface AssetProps {
  data: AssetDetailModel | undefined
  showAgedDays?: boolean
  onPress?: () => void
}

export default function AssetDetails({
  data,
  showAgedDays = false,
  onPress,
}: AssetProps) {
  const handleOnPress = () => {
    onPress && onPress()
  }

  return (
    <View style={baseStyles.container}>
      {showAgedDays && (
        <View style={baseStyles.row}>
          <Text h4>Aging Day:</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Text
              h4
              style={{
                color:
                  data && data?.agedDays > data?.agingDays ? 'red' : 'green',
              }}
            >
              {data?.agedDays}
            </Text>
            <Text h4>/</Text>
            <Text h4>{data?.agingDays}</Text>
          </View>
        </View>
      )}
      <View style={baseStyles.row}>
        <Text>Serial No: </Text>
        <Text style={baseStyles.longText}>{data?.serialNo} </Text>
      </View>
      <View style={baseStyles.row}>
        <Text>Asset Type: </Text>
        <Text style={baseStyles.longText}>{data?.assetTypeName}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text>Asset Type Detail: </Text>
        <Text style={baseStyles.longText}>{data?.assetTypeDetailName}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text>Detail:</Text>
        <Text style={baseStyles.longText}>{data?.details} </Text>
      </View>
      <View style={baseStyles.row}>
        <Text>Cost Center:</Text>
        <Text style={baseStyles.longText}>{data?.costCenterName}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Asset Class:</Text>
        <Text style={baseStyles.longText}>{data?.assetClassName}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Sold-To:</Text>
        <Text style={baseStyles.longText}>{data?.soldToName}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Ship-To:</Text>
        <Text style={baseStyles.longText}>{data?.shipToName}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Status:</Text>
        <Text style={baseStyles.longText}>{data?.assetStatusName}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Location:</Text>
        <Text style={baseStyles.longText}>{data?.locationName}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Year of Mfg:</Text>
        <Text style={baseStyles.longText}>{data?.yearOfManufacture}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Warranty:</Text>
        <Text style={baseStyles.longText}>{data?.warrantyEndAt}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Asset QR Code:</Text>
        <Text style={baseStyles.longText}>{data?.assetId}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Asset No.:</Text>
        <Text style={baseStyles.longText}>{data?.assetNo}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Aging:</Text>
        <Text style={baseStyles.longText}>
          {data?.agingEnabled ? 'Yes' : 'No'}
        </Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Others:</Text>
        <Text style={baseStyles.longText}>{data?.others}</Text>
      </View>
      <View style={baseStyles.row}>
        <Text style={baseStyles.label}>Comments:</Text>
        <Text style={baseStyles.longText}>{data?.comments}</Text>
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
  )
}
