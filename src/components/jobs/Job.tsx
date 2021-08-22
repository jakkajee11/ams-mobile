import React from 'react';
import { ListItem, Icon, Text } from 'react-native-elements';
import { DateTimeFormat } from '~utils/format';
import { JobModel } from '../../types/jobs';

interface JobItemProps {
  data: JobModel;
  onPress?: (job: JobModel) => void;
}

export default function Job({ data, onPress }: JobItemProps) {
  const handleOnPress = () => {
    onPress && onPress(data);
  };

  const { id, jobNumber, dueDate } = data;

  return (
    <ListItem key={id} bottomDivider onPress={handleOnPress}>
      <ListItem.Content>
        <ListItem.Title>
          <Text>
            {jobNumber} {DateTimeFormat.toStandardDateTime(dueDate)}
          </Text>
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron name='chevron-right' type='font-awesome-5' />
    </ListItem>
  );
}
