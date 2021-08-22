import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import Colors from '~constants/Colors';

interface LoadingProps {
  loading: boolean;
  size?: 'large' | 'small';
  color?: string;
}

const Loading = ({
  loading,
  size = 'large',
  color = Colors.yellow,
}: LoadingProps) => (
  <ActivityIndicator animating={loading} size={size} color={color} />
);

export default Loading;
