// From: https://reactnavigation.org/docs/screen-options-resolution/#setting-parent-screen-options-based-on-child-navigators-state

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Plans':
      return 'Plans';
    case 'Plan Form':
      return 'Plan';
    case 'Plan':
      return 'Plan';
    case 'Home':
        return 'Home';
    case 'Profile':
      return 'Profile';
    case 'Search Users':
      return 'Find Friends';
  }
}
