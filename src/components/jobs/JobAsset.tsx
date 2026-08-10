import React from 'react';
import { ListItem } from '@rn-vui/themed';
import Colors from '~constants/Colors';
import { JOB_ASSET_STATUS } from '~constants/Status';
import { JobAssetModel } from '../../types/jobs';

interface JobAssetProps {
  data: JobAssetModel;
  onPress?: () => void;
}

export default function JobAsset({
  data: {
    key,
    location,
    assetTypeName,
    assetId,
    serialNo,
    jobAssetStatusId,
    assetStatusName,
    qrCode,
  },
  onPress,
}: JobAssetProps) {
  const handleOnPress = () => {
    onPress && onPress();
  };
  return (
    <ListItem key={key} bottomDivider onPress={handleOnPress}>
      <ListItem.Content>
        {(jobAssetStatusId === JOB_ASSET_STATUS.Checked ||
          jobAssetStatusId === JOB_ASSET_STATUS.NotCheck) && (
          <ListItem.Title style={{ fontSize: 12 }}>
            {assetTypeName} / {serialNo} / {assetStatusName}
          </ListItem.Title>
        )}
        {jobAssetStatusId === JOB_ASSET_STATUS.WrongShipTo && (
          <ListItem.Title style={{ fontSize: 12 }}>
            {assetTypeName} / {serialNo} / {assetStatusName} / (Wrong Ship-To)
          </ListItem.Title>
        )}
        {jobAssetStatusId === JOB_ASSET_STATUS.NotFound && (
          <ListItem.Title style={{ fontSize: 12 }}>
            {qrCode} / (Not Found)
          </ListItem.Title>
        )}
      </ListItem.Content>
      {/* <ListItem.Chevron name={jobAssetStatusId === JOB_ASSET_STATUS.Checked ? '' : ''} type='feather' color='red' /> */}
      {jobAssetStatusId === JOB_ASSET_STATUS.NotCheck && (
        <ListItem.Chevron name='x-circle' type='feather' color={Colors.red} />
      )}
      {jobAssetStatusId === JOB_ASSET_STATUS.Checked && (
        <ListItem.Chevron
          name='check-circle'
          type='AntDesign'
          color={Colors.green}
        />
      )}
      {jobAssetStatusId === JOB_ASSET_STATUS.WrongShipTo && (
        <ListItem.Chevron
          name='exclamation-circle'
          type='font-awesome-5'
          color={Colors.red}
        />
      )}
      {jobAssetStatusId === JOB_ASSET_STATUS.NotFound && (
        <ListItem.Chevron
          name='exclamation-circle'
          type='font-awesome-5'
          color={Colors.red}
        />
      )}
    </ListItem>
  );
}
