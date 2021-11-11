import React from 'react';
import { ListItem, Icon, Text } from 'react-native-elements';
import { DateTimeFormat } from '~utils/format';
import { JobModel } from '~/types/jobs';

interface JobItemProps {
  data: JobModel;
  onPress?: (job: JobModel) => void;
}

export default function Job({ data, onPress }: JobItemProps) {
  const handleOnPress = () => {
    onPress && onPress(data);
  };

  const { id, jobNumber, dueDate, createdAt } = data;

  return (
    <ListItem key={id} bottomDivider onPress={handleOnPress}>
      <ListItem.Content>
        <ListItem.Title>
          <Text>
            {jobNumber}{' '}
            {DateTimeFormat.toStandardDate(dueDate ? dueDate : createdAt)}
          </Text>
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron
        name='chevron-right'
        type='font-awesome-5'
        onPress={handleOnPress}
        size={28}
      />
    </ListItem>
  );
}
