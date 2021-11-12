import React from 'react';
import { ListItem, Icon, Text, Button } from 'react-native-elements';
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
          padding: 10,
          borderBottomColor: Colors.darkGrey,
          borderBottomWidth: 0.2,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => handleOnPress(jobNumber)}
          >
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
              }}
            >
              <Text style={{ width: 150 }}>{jobNumber}</Text>
              <Text>
                {DateTimeFormat.toStandardDate(dueDate ? dueDate : createdAt)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            icon={
              <Icon
                name='info-circle'
                type='font-awesome-5'
                size={20}
                color='white'
              />
            }
            onPress={() => handleOnPress(jobNumber)}
          />
        </View>
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
