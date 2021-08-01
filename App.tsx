import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { FullTheme } from 'react-native-elements';
import { ThemeProvider } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const theme = {
    colors: {
      primary: '#363b42', //'#ffb900',
      secondary: '#ffb900', //'#363b42',
      //background: '#ffb900',
    },
    Button: {
      buttonStyle: {
        borderRadius: 8,
      },
    },
    // Icon: {
    //   iconStyle: {
    //     //color: 'white',
    //   },
    // },
    // Text: {
    //   style: {
    //     color: 'white',
    //   },
    // },
    View: {
      backgroundColor: '#ffb900',
    },
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
