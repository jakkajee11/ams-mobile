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
    if (loading) return
    // close the confirm dialog first (it stayed open under the loader and
    // CONFIRM could be tapped again, sending duplicate requests)
    setDialogVisible(false)
    setLoading(true)

    const { serialNo, assetId } = route.params.data

    try {
      const res = await resetAging({
        serialNos: [serialNo],
      })

      if (res && res.status === 200) {
        const assetRes = await getAssetInfo(assetId)
        if (assetRes && assetRes.status === 200 && assetRes.data) {
          setAssetDetail(assetRes.data)
        }
      } else {
        Alert.alert(
          'Error',
          `Failed to reset aging for asset with serial no. '${serialNo}'`
        )
      }
    } finally {
      setLoading(false)
    }
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
