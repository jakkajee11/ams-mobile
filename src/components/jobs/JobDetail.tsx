import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-elements';
import { JOB_ASSET_STATUS, JOB_STATUS } from '~constants/Status';
import baseStyles from '~styles/baseStyles';
import { DateTimeFormat } from '~utils/format';
import { JobModel } from '../../types/jobs';
import JobAsset from './JobAsset';

interface JobDetailProps {
  data: JobModel;
  progress?: string;
}

export default function JobDetail({
  data: {
    id,
    jobNumber,
    jobStatusId,
    jobStatusName,
    dueDate,
    details,
    soldToName,
    shipToName,
    assets,
    createdAt,
  },
  progress,
}: JobDetailProps) {
  const navigation = useNavigation();

  const renderItem = ({ item }: any) => (
    <JobAsset
      key={item.serialNo}
      data={item}
      onPress={() =>
        navigation.navigate('AssetDetails', { assetId: item.assetId })
      }
    />
  );

  const checkedCount =
    assets.filter((x) => x.jobAssetStatusId === JOB_ASSET_STATUS.Checked)
      .length ?? 0;
  const notCheckCount =
    assets.filter((x) => x.jobAssetStatusId === JOB_ASSET_STATUS.NotCheck)
      .length ?? 0;
  const wrongShipToCount =
    assets.filter((x) => x.jobAssetStatusId === JOB_ASSET_STATUS.WrongShipTo)
      .length ?? 0;
  const notFoundCount =
    assets.filter((x) => x.jobAssetStatusId === JOB_ASSET_STATUS.NotFound)
      .length ?? 0;

  return (
    <View style={{ height: '60%' }}>
      <View style={baseStyles.content}>
        <View style={baseStyles.row}>
          <Text>Job Number:</Text>
          <Text>{jobNumber}</Text>
        </View>
        <View style={baseStyles.row}>
          <Text>Due date:</Text>
          <Text>{DateTimeFormat.toStandardDateTime(dueDate)}</Text>
        </View>
        <View style={baseStyles.row}>
          <Text>Created at:</Text>
          <Text>{DateTimeFormat.toStandardDateTime(createdAt)}</Text>
        </View>
        <View style={baseStyles.row}>
          <Text>Status:</Text>
          <Text>{jobStatusName}</Text>
        </View>
        <View style={baseStyles.row}>
          <Text>Sold-To:</Text>
          <Text style={baseStyles.longText}>{soldToName}</Text>
        </View>
        <View style={baseStyles.row}>
          <Text>Ship-To: </Text>
          <Text style={baseStyles.longText}>{shipToName}</Text>
        </View>
        <View style={baseStyles.row}>
          <Text>Detail:</Text>
          <Text style={baseStyles.longText}>{details}</Text>
        </View>
        {jobStatusId === JOB_STATUS.Finished && (
          <View>
            <View style={baseStyles.row}>
              <Text>Assigned:</Text>
              <Text>{assets.length}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text>Checked:</Text>
              <Text>
                {checkedCount}/{assets.length} (
                {((checkedCount / assets.length) * 100).toFixed(2)} %)
              </Text>
            </View>
            <View style={baseStyles.row}>
              <Text>NotCheck:</Text>
              <Text>
                {notCheckCount} (
                {((notCheckCount / assets.length) * 100).toFixed(2)} %)
              </Text>
            </View>
            <View style={baseStyles.row}>
              <Text>WrongShipTo:</Text>
              <Text>{wrongShipToCount}</Text>
            </View>
            <View style={baseStyles.row}>
              <Text>NotFound:</Text>
              <Text>{notFoundCount}</Text>
            </View>
          </View>
        )}
        <View style={baseStyles.col}>
          <Text
            style={{
              textAlign: 'center',
            }}
          >
            {jobStatusId === JOB_STATUS.Finished ||
            jobStatusId === JOB_STATUS.Completed
              ? `Finished (${progress} checked)`
              : `Included ${assets.length} assets`}
          </Text>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, height: '100%' }}>
          <FlatList
            keyExtractor={(item) => item.serialNo}
            //stickyHeaderIndices={[0]}
            // ListHeaderComponent={
            //   <Text
            //     style={{
            //       textAlign: 'center',
            //     }}
            //   >
            //     {jobStatusId === JOB_STATUS.Finished ||
            //     jobStatusId === JOB_STATUS.Completed
            //       ? `Finished (${progress} checked)`
            //       : `Included ${assets.length} assets`}
            //   </Text>
            // }
            data={assets}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
}
