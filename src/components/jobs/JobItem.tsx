import React from 'react';
import { ListItem, Icon, Text, Button } from '@rn-vui/themed';
import { DateTimeFormat } from '~utils/format';
import { JobModel } from '~/types/jobs';
import { FlatList, RefreshControl, View } from 'react-native';
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
          accessibilityRole="button"
          accessibilityLabel={`Job ${jobNumber}`}
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
            {/* plain Views: the nested Pressables used onPressIn, which navigated
                on touch-down (while scrolling) and in addition to the outer onPress */}
            <View>
              <Text style={{ width: 170 }}>{jobNumber}</Text>
            </View>

            <Text>
              {DateTimeFormat.toStandardDate(dueDate ? dueDate : createdAt)}
            </Text>

            <View style={{ width: 60 }}>
              <Icon
                name='info-circle'
                type='font-awesome-5'
                size={20}
                color={Colors.black}
                style={{ marginTop: 0, marginRight: 5 }}
              />
            </View>
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
      contentContainerStyle={data.length === 0 ? { flexGrow: 1 } : undefined}
      ListEmptyComponent={
        !loading ? (
          <View style={{ flex: 1, alignItems: 'center', padding: 30 }}>
            <Text style={{ fontStyle: 'italic', color: Colors.darkGrey }}>
              No jobs. Pull down to refresh.
            </Text>
          </View>
        ) : null
      }
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
