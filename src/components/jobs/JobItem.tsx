import React from 'react';
import { ListItem, Icon, Text } from 'react-native-elements';
import { DateTimeFormat } from '~utils/format';
import { JobModel } from '~/types/jobs';
import { FlatList, Pressable, View } from 'react-native';
import Colors from '~constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface JobItemProps {
  data: JobModel[];
  onPress?: (job: JobModel) => void;
}

export default function JobItem({ data, onPress }: JobItemProps) {
  const handleOnPress = (jobNumber: string) => {
    const job = data.find((j) => j.jobNumber === jobNumber);
    job && onPress && onPress(job);
  };

  const renderItem = ({ item: { jobNumber, dueDate, createdAt } }: any) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}
      >
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={() => handleOnPress(jobNumber)}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              borderBottomColor: Colors.darkGrey,
              borderBottomWidth: 0.2,
              width: '95%',
            }}
          >
            <Text>{jobNumber}</Text>
            <Text>
              {DateTimeFormat.toStandardDate(dueDate ? dueDate : createdAt)}
            </Text>
            <Icon
              name='chevron-right'
              type='feather'
              size={30}
              color={Colors.grey}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      keyExtractor={(item) => item.jobNumber}
      data={data}
      renderItem={renderItem}
    />
  );
}
