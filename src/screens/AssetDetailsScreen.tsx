import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import { JobsParamsList } from '../types'
import Loading from '~components/shared/Loading'
import useAssetApi from '~apis/useAssetApi'
import { AssetDetailModel } from '~types/assets'
import baseStyles from '~styles/baseStyles'
import AssetDetails from '~components/assets/AssetDetails'

export default function AssetDetailsScreen({
  route,
  navigation,
}: StackScreenProps<JobsParamsList, 'AssetDetails'>) {
  const { getAssetInfo } = useAssetApi()
  const [loading, setLoading] = useState(false)
  const [data, setAssetDetail] = useState<AssetDetailModel>()

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const res = await getAssetInfo(route.params.assetId)
      if (res && res.status === 200 && res.data) {
        setAssetDetail(res.data)
      }
      setLoading(false)
    })()
  }, [])

  return (
    <ScrollView style={baseStyles.scrollView}>
      {loading ? <Loading loading={loading} /> : <AssetDetails data={data} />}
    </ScrollView>
  )
}
