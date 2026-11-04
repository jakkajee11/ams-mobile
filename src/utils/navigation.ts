import { NavigationProp, ParamListBase } from '@react-navigation/native'

/**
 * Reset the top-level (app) navigator to a single route, e.g. 'Auth' on
 * logout or 'Root' after login, so the user can't go "back" across the
 * auth boundary with the Android back button / swipe gesture.
 */
export function resetToRoute(
  navigation: NavigationProp<ParamListBase> | any,
  name: 'Auth' | 'Root'
) {
  let root = navigation
  while (root.getParent && root.getParent()) {
    root = root.getParent()
  }
  root.reset({ index: 0, routes: [{ name }] })
}
