
import { getHeaderTitle } from '../../helpers/getHeaderTitle'

describe('getHeaderTitle', () => {
  it('returns Feed if focused route is not found', () => {
    // Arrange
    const route = {
      state: {
        routes: [],
      },
    };

    // Act
    const result = getHeaderTitle(route);

    // Assert
    expect(result).toEqual('Feed');
  });

  it('returns the correct header title based on route name', () => {
    // Arrange
    const route = {
      state: {
        routes: [
          { name: 'Home' },
          { name: 'Plans' },
          { name: 'Plan Form' },
          { name: 'Plan' },
          { name: 'Profile' },
          { name: 'Search Users' },
          { name: 'Dive Form' },
          { name: 'Unknown Screen' }, // add a non-existing route
        ],
      },
    };

    // Act
    const resultHome = getHeaderTitle({ ...route, state: { ...route.state, index: 0 } });
    const resultPlans = getHeaderTitle({ ...route, state: { ...route.state, index: 1 } });
    const resultPlanForm = getHeaderTitle({ ...route, state: { ...route.state, index: 2 } });
    const resultPlan = getHeaderTitle({ ...route, state: { ...route.state, index: 3 } });
    const resultProfile = getHeaderTitle({ ...route, state: { ...route.state, index: 4 } });
    const resultSearchUsers = getHeaderTitle({ ...route, state: { ...route.state, index: 5 } });
    const resultDiveForm = getHeaderTitle({ ...route, state: { ...route.state, index: 6 } });
    const resultUnknownScreen = getHeaderTitle({ ...route, state: { ...route.state, index: 7 } });

    // Assert
    expect(resultHome).toEqual('Home');
    expect(resultPlans).toEqual('Plans');
    expect(resultPlanForm).toEqual('Plan');
    expect(resultPlan).toEqual('Plan');
    expect(resultProfile).toEqual('Profile');
    expect(resultSearchUsers).toEqual('Find Friends');
    expect(resultDiveForm).toEqual('Log Dive');
    expect(resultUnknownScreen).toEqual('Home'); // base case
  });
});
