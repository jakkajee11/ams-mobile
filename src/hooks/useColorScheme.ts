import { useColorScheme as _useColorScheme } from 'react-native';

// React Native's useColorScheme can return null or 'unspecified' (RN 0.7x+),
// which would index Colors['unspecified'] -> undefined. Normalize to light/dark.
export default function useColorScheme(): 'light' | 'dark' {
  return _useColorScheme() === 'dark' ? 'dark' : 'light';
}
