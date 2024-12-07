/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking'

export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: {
            screens: {
              LoginScreen: 'Login',
            },
          },
          ForgotPassword: {
            screens: {
              ForgotPasswordScreen: 'Forgot Password',
            },
          },
        },
      },
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'Home',
            },
          },
          Jobs: {
            screens: {
              JobsScreen: 'Jobs',
            },
          },
          JobDetails: {
            screens: {
              JobDetailsScreen: 'JobDetails',
            },
          },
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
}
