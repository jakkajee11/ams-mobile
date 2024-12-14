import { StackScreenProps } from '@react-navigation/stack'
import _ from 'lodash'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { View, FlatList, ListRenderItemInfo, Pressable } from 'react-native'
import { Badge, Button, ListItem, Text } from 'react-native-elements'
import 'react-native-get-random-values'
import useAssetApi from '~apis/useAssetApi'
import useMasterDataApi from '~apis/useMasterDataApi'
import { RootStackParamList } from '../types'
import Colors from '~constants/Colors'
import DropDownPicker from 'react-native-dropdown-picker'
import { SelectItemOption } from '~types/selectOptions'
import { AssetTypeDetailModel } from '~types/masterData'
import Stack from '~components/shared/Stack'
import { AssetAgingListModel, AssetDetailModel } from '~types/assets'
import baseStyles from '~styles/baseStyles'
import useReportApi from '~apis/useReportApi'
import AssetListItemContent from '~components/assets/AssetListItemContent'
import Loading from '~components/shared/Loading'

export default function AssetAgingListScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'AssetAgingList'>) {
  const { getAssetInfo, searchAssets, getAssetByAssetTypeDetailId } =
    useAssetApi()
  const { getAgingReport } = useReportApi()
  const { getAssetTypeDetails } = useMasterDataApi()
  const [searchText, setSearchText] = useState('')
  const [assetTypeDetailId, setAssetTypeDetailId] = useState('')
  const [assetTypeDetailOptions, setAssetTypeDetailOptions] = useState<
    SelectItemOption[]
  >([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<AssetDetailModel[]>([])

  const renderItem = ({ item }: ListRenderItemInfo<AssetDetailModel>) => (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate('AssetAgingDetails', { data: item })}
    >
      {/* <View style={{ ...baseStyles.column, alignItems: 'flex-start' }}>
        <View style={baseStyles.row}>
          <Stack direction="row">
            <Text>{item.serialNo}</Text>
            <Text>
              <Text
                style={{
                  color: item.agedDays > item.agingDays ? 'red' : 'green',
                }}
              >
                {item.agedDays}
              </Text>
              <Text>/</Text>
              <Text>{item.agingDays}</Text>
            </Text>
          </Stack>
        </View>
        <Text style={baseStyles.textSmallItalic}>
          {item.assetTypeName} / {item.assetTypeDetailName} /{' '}
          {item.assetStatusName}
        </Text>
        <Text style={baseStyles.textSmallItalic}>{item.details}</Text>
      </View> */}
      <AssetListItemContent data={item} />
    </ListItem>
  )

  const toggleDropdown = () => setOpen(!open)

  const fetchReports = async () => {
    const res = await getAgingReport({
      page: 0,
      size: 10,
      sort: '',
      assetTypeDetailId: assetTypeDetailId === '' ? [] : [assetTypeDetailId],
    })
    if (res.status === 200) {
      setData(res.data.records)
    }
  }

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const [assetTypes, reports] = await Promise.all([
        getAssetTypeDetails({
          page: 1,
          size: 100,
          search: searchText,
        }),
        getAgingReport({
          page: 0,
          size: 10,
          sort: '',
        }),
      ])

      if (assetTypes && assetTypes.status === 200 && assetTypes.data) {
        setAssetTypeDetailOptions(
          assetTypes.data.records.map((x: AssetTypeDetailModel) => ({
            label: x.name,
            value: x.id,
          }))
        )
      }

      if (reports && reports.status === 200 && reports.data) {
        setData(reports.data.records)
      }

      setLoading(false)
    })()
  }, [])

  return (
    <>
      <View style={baseStyles.container}>
        {loading && <Loading loading={loading} />}
        <Stack>
          <DropDownPicker
            placeholder="Asset Type Detail"
            searchable={true}
            searchPlaceholder={'search...'}
            loading={loading}
            open={open}
            value={assetTypeDetailId}
            items={assetTypeDetailOptions}
            setOpen={toggleDropdown}
            setValue={setAssetTypeDetailId}
            listMode="MODAL"
            onChangeSearchText={(text: string) => {
              setSearchText(text)
            }}
            onSelectItem={fetchReports}
            maxHeight={600}
            selectedItemContainerStyle={{
              backgroundColor: Colors.yellow,
            }}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: 'center' }}>No item found</Text>
            )}
          />

          <FlatList
            keyExtractor={(item) => item.id}
            extraData={assetTypeDetailId}
            data={data}
            renderItem={renderItem}
            ListHeaderComponent={
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: 300,
                }}
              >
                <Text style={baseStyles.textItalic}>
                  Total {data.length} {data.length > 1 ? 'items' : 'item'}
                </Text>
              </View>
            }
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  alignContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  [
                </Text>
                <Text
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  Empty
                </Text>
                <Text
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  ]
                </Text>
              </View>
            }
          />
        </Stack>
      </View>
    </>
  )
}
