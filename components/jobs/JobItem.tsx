import React from 'react';
import { ListItem, Icon } from 'react-native-elements';

type JobData = {
  id: string;
  jobNumber: string;
  createdAt: string;
};
interface JobItemProps {
  data: JobData;
}

export default function JobItem({
  data: { id, jobNumber, createdAt },
}: JobItemProps) {
  return (
    <ListItem key={id} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>
          {jobNumber} {createdAt}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron name='chevron-right' type='font-awesome-5' />
    </ListItem>
  );
}
