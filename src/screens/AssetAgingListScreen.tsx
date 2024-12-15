import { StackScreenProps } from '@react-navigation/stack'
import _ from 'lodash'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { View, FlatList, ListRenderItemInfo } from 'react-native'
import { Button, Icon, ListItem, Text } from 'react-native-elements'
import 'react-native-get-random-values'
import useMasterDataApi from '~apis/useMasterDataApi'
import { RootStackParamList } from '../types'
import Colors from '~constants/Colors'
import DropDownPicker from 'react-native-dropdown-picker'
import { SelectItemOption } from '~types/selectOptions'
import { AssetTypeDetailModel, AssetTypeModel } from '~types/masterData'
import Stack from '~components/shared/Stack'
import { AssetDetailModel } from '~types/assets'
import baseStyles from '~styles/baseStyles'
import useReportApi from '~apis/useReportApi'
import AssetListItemContent from '~components/assets/AssetListItemContent'
import Loading from '~components/shared/Loading'

export default function AssetAgingListScreen({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, 'AssetAgingList'>) {
  const { getAgingReport } = useReportApi()
  const { getAssetTypes, getAssetTypeDetails } = useMasterDataApi()
  const [searchText, setSearchText] = useState('')
  const [assetTypeId, setAssetTypeId] = useState('')
  const [assetTypeDetailId, setAssetTypeDetailId] = useState('')
  const [assetTypeOptions, setAssetTypeOptions] = useState<SelectItemOption[]>(
    []
  )
  const [assetTypeDetailOptions, setAssetTypeDetailOptions] = useState<
    SelectItemOption[]
  >([])
  const [loading, setLoading] = useState(false)
  const [openAssetType, setOpenAssetType] = useState(false)
  const [openAssetTypeDetail, setOpenAssetTypeDetail] = useState(false)
  const [data, setData] = useState<AssetDetailModel[]>([])

  const useAssetTypeFilter = false
  const useAssetTypeDetailFilter = true

  const toggleAssetTypeDropdown = () => setOpenAssetType(!openAssetType)
  const toggleAssetTypeDetailDropdown = () =>
    setOpenAssetTypeDetail(!openAssetTypeDetail)

  const fetchReports = async () => {
    const res = await getAgingReport({
      page: 0,
      size: 10,
      sort: '',
      assetTypeId: assetTypeId === '' ? [] : [assetTypeId],
      assetTypeDetailId: assetTypeDetailId === '' ? [] : [assetTypeDetailId],
    })
    if (res.status === 200) {
      setData(res.data.records)
    }
  }

  const resetDropdown = () => {
    setAssetTypeDetailId('')
  }

  const renderItem = ({ item }: ListRenderItemInfo<AssetDetailModel>) => (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate('AssetAgingDetails', { data: item })}
    >
      <AssetListItemContent data={item} />
    </ListItem>
  )

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const [assetTypes, assetTypeDetails, reports] = await Promise.all([
        getAssetTypes({
          page: 1,
          size: 100,
          search: searchText,
        }),
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
        setAssetTypeOptions(
          assetTypes.data.records.map((x: AssetTypeModel) => ({
            label: x.name,
            value: x.id,
          }))
        )
      }

      if (
        assetTypeDetails &&
        assetTypeDetails.status === 200 &&
        assetTypeDetails.data
      ) {
        setAssetTypeDetailOptions(
          assetTypeDetails.data.records.map((x: AssetTypeDetailModel) => ({
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

  useEffect(() => {
    fetchReports()
  }, [assetTypeDetailId])

  return (
    <>
      <View style={baseStyles.container}>
        {loading && <Loading loading={loading} />}
        <Stack>
          {useAssetTypeFilter && (
            <DropDownPicker
              placeholder="Asset Type"
              searchable={true}
              searchPlaceholder={'search...'}
              loading={loading}
              open={openAssetType}
              value={assetTypeId}
              items={assetTypeOptions}
              setOpen={toggleAssetTypeDropdown}
              setValue={setAssetTypeId}
              listMode="MODAL"
              onChangeSearchText={(text: string) => {
                setSearchText(text)
              }}
              maxHeight={600}
              selectedItemContainerStyle={{
                backgroundColor: Colors.yellow,
              }}
              ListEmptyComponent={() => (
                <Text style={{ textAlign: 'center' }}>No item found</Text>
              )}
            />
          )}

          <View style={{ flexDirection: 'row' }}>
            {useAssetTypeDetailFilter && (
              <View style={{ width: '90%' }}>
                <DropDownPicker
                  placeholder="All - Asset Type Detail"
                  searchable={true}
                  searchPlaceholder={'search...'}
                  loading={loading}
                  open={openAssetTypeDetail}
                  value={assetTypeDetailId}
                  items={assetTypeDetailOptions}
                  setOpen={toggleAssetTypeDetailDropdown}
                  setValue={setAssetTypeDetailId}
                  listMode="MODAL"
                  onChangeSearchText={(text: string) => {
                    setSearchText(text)
                  }}
                  maxHeight={600}
                  selectedItemContainerStyle={{
                    backgroundColor: Colors.yellow,
                  }}
                  ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center' }}>No item found</Text>
                  )}
                  style={{ width: '100%' }}
                />
              </View>
            )}
            <View
              style={{
                justifyContent: 'center',
              }}
            >
              <Button
                type="clear"
                icon={<Icon name="x" type="feather" size={28} color="white" />}
                onPress={resetDropdown}
              />
            </View>
          </View>
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
