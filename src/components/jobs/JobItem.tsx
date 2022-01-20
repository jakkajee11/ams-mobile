import React from 'react';
import { ListItem, Icon, Text, Button } from 'react-native-elements';
import { DateTimeFormat } from '~utils/format';
import { JobModel } from '~/types/jobs';
import { FlatList, Pressable, RefreshControl, View } from 'react-native';
import Colors from '~constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface JobItemProps {
  data: JobModel[];
  onPress?: (job: JobModel) => void;
  onRefresh?: () => void;
  loading: boolean;
}

export default function JobItem({
  data,
  onPress,
  onRefresh,
  loading,
}: JobItemProps) {
  const goToJobDetail = (jobNumber: string) => {
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
        {/* <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        > */}
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={() => goToJobDetail(jobNumber)}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <Pressable onPressIn={() => goToJobDetail(jobNumber)}>
              <Text style={{ width: 170 }}>{jobNumber}</Text>
            </Pressable>

            <Text>
              {DateTimeFormat.toStandardDate(dueDate ? dueDate : createdAt)}
            </Text>

            <Pressable
              onPressIn={() => goToJobDetail(jobNumber)}
              style={{ width: 60 }}
            >
              <Icon
                name='info-circle'
                type='font-awesome-5'
                size={20}
                color={Colors.black}
                style={{ marginTop: 0, marginRight: 5 }}
              />
            </Pressable>
          </View>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    );
  };

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={data}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          colors={[Colors.yellow]}
        />
      }
    />
  );
}
