import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { FullTheme } from 'react-native-elements';
import { ThemeProvider } from 'react-native-elements';
import Colors from './src/constants/Colors';

export default function App() {
  const { isLoadingComplete, isUserLoggedIn } = useCachedResources();
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
      backgroundColor: Colors.yellow,
    },
    StatusBar: {
      backgroundColor: Colors.yellow,
    },
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Navigation
            colorScheme={colorScheme}
            isUserLoggedIn={isUserLoggedIn}
          />
          <StatusBar />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
