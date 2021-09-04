import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import baseStyles from '~styles/baseStyles';
import { DateTimeFormat } from '~utils/format';
import Colors from '../../constants/Colors';
import { JobModel } from '../../types/jobs';
import JobAsset from './JobAsset';

interface JobDetailProps {
  data: JobModel;
}

export default function JobDetail({
  data: {
    id,
    jobNumber,
    jobStatusId,
    jobStatusName,
    dueDate,
    details,
    location,
    subLocation,
    assets,
    createdAt,
  },
}: JobDetailProps) {
  const navigation = useNavigation();

  const renderItem = ({ item }: any) => (
    <JobAsset
      key={item.assetId}
      data={item}
      onPress={() =>
        navigation.navigate('AssetDetails', { assetId: item.assetId })
      }
    />
  );

  return (
    <View style={baseStyles.container}>
      <View style={baseStyles.content}>
        <View style={baseStyles.row}>
          <Text>Job Number:</Text>
          <Text>{jobNumber}</Text>
        </View>
        <View style={baseStyles.row}>
          <Text>Duedate:</Text>
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
          <Text>Location:</Text>
          <Text>{location}</Text>
        </View>
        <View style={baseStyles.row}>
          <Text>Sub Location: </Text>
          <Text>{subLocation}</Text>
        </View>
        <View style={baseStyles.col}>
          <Text>Detail:</Text>
          <Text style={baseStyles.longText}>{details}</Text>
        </View>

        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <FlatList
            keyExtractor={(item) => item.assetId}
            ListHeaderComponent={
              <Text
                style={{
                  //...styles.text,
                  textAlign: 'center',
                  //fontStyle: 'italic',
                }}
              >
                Included {assets.length} assets
              </Text>
            }
            data={assets}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
}
