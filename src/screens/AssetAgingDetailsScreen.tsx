import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { Text, Image, Button, Icon, Dialog } from '@rn-vui/themed'

import { RootStackParamList } from '../types'
import Loading from '~components/shared/Loading'
import useAssetApi from '~apis/useAssetApi'
import { AssetDetailModel } from '~types/assets'
import baseStyles from '~styles/baseStyles'
import AssetDetails from '~components/assets/AssetDetails'
import Stack from '~components/shared/Stack'

export default function AssetAgingDetailsScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'AssetAgingDetails'>) {
  const { getAssetInfo, resetAging } = useAssetApi()
  const [loading, setLoading] = useState(false)
  const [assetDetail, setAssetDetail] = useState<AssetDetailModel>()
  const [dialogVisible, setDialogVisible] = useState(false)
  const toggleDialog = () => setDialogVisible(!dialogVisible)

  const updateAssetAging = async () => {
    setLoading(true)

    const { serialNo, assetId } = route.params.data

    const res = await resetAging({
      serialNos: [serialNo],
    })

    if (res.status === 200) {
      const assetRes = await getAssetInfo(assetId)
      if (assetRes.status === 200) {
        setAssetDetail(assetRes.data)
      }
    } else {
      Alert.alert(
        'Error',
        `Asset with serialNo '${serialNo}' was failed to reset aging`
      )
    }

    setLoading(false)
  }

  useEffect(() => {
    ;(async function () {
      setAssetDetail(route.params.data)
    })()
  }, [])

  return (
    <Stack>
      <ScrollView style={baseStyles.scrollView}>
        <>
          {loading && <Loading loading={loading} />}
          <AssetDetails data={assetDetail} showAgedDays={true} />
        </>
      </ScrollView>
      <Button
        icon={
          <Icon name="refresh-ccw" type="feather" size={28} color="white" />
        }
        title="  RESET AGING"
        loading={loading}
        disabled={loading || assetDetail?.agedDays === 0}
        onPress={toggleDialog}
      />
      <Dialog
        style={{ width: 1000 }}
        isVisible={dialogVisible}
        onBackdropPress={toggleDialog}
      >
        <Dialog.Title title="Please confirm?" />

        <Dialog.Actions>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              flex: 1,
            }}
          >
            <Dialog.Button title="CONFIRM" onPress={updateAssetAging} />
            <Dialog.Button title="CANCEL" onPress={toggleDialog} />
          </View>
        </Dialog.Actions>
      </Dialog>
    </Stack>
  )
}
