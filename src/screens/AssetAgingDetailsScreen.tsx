import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Text, Image, Button, Icon } from 'react-native-elements'

import { JobsParamsList, RootStackParamList } from '../types'
import Loading from '~components/shared/Loading'
import useAssetApi from '~apis/useAssetApi'
import { AssetDetailModel } from '~types/assets'
import { ATTACHMENT_TYPE } from '~constants/Status'
import baseStyles from '~styles/baseStyles'
import AssetDetails from '~components/assets/AssetDetails'
import Stack from '~components/shared/Stack'

export default function AssetAgingDetailsScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'AssetAgingDetails'>) {
  const { getAssetInfo } = useAssetApi()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async function () {
      // setLoading(true);
      // const res = await getAssetInfo(route.params.assetId);
      // if (res && res.status === 200 && res.data) {
      //   setAssetDetail(res.data);
      // }
      // setLoading(false);
      console.log('data', route.params.data)
    })()
  }, [])

  return (
    <Stack>
      <ScrollView style={baseStyles.scrollView}>
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <AssetDetails data={route.params.data} showAgedDays={true} />
          </>
        )}
      </ScrollView>
      <Button
        icon={
          <Icon name="refresh-ccw" type="feather" size={28} color="white" />
        }
        title="  RESET AGING"
        //onPress={openCamera}
      />
    </Stack>
  )
}
