import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
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
    <ListItem key={id} bottomDivider>
      <ListItem.Content>
        <ListItem.Title onPress={handleOnPress}>
          {jobNumber} {dueDate}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron name='chevron-right' type='font-awesome-5' />
    </ListItem>
  );
}
