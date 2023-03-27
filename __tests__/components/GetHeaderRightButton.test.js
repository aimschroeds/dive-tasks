import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetHeaderRightButton from '../../components/GetHeaderRightButton';

jest.mock('../firebase', () => ({
  db: {},
  auth: {},
}));

jest.mock('../path/to/your/getUnreadNotificationsCount', () => ({
  getUnreadNotificationsCount: jest.fn(() => Promise.resolve(2)),
}));

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => (
  <GetHeaderRightButton navigation={navigation} route={{ name: 'Home' }} user={{ uid: 'testUserId' }} />
);

const NotificationsScreen = () => <></>;
const PlanFormScreen = () => <></>;

const TestNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Plan Form" component={PlanFormScreen} />
    </Stack.Navigator>
  );
};

describe('GetHeaderRightButton', () => {
  it('renders correctly and navigates on button press', async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <TestNavigator />
      </NavigationContainer>
    );

    const headerRightButton = getByTestId('header-right-button');
    expect(headerRightButton).toBeDefined();

    fireEvent.press(headerRightButton);
    expect(getByTestId('notifications-screen')).toBeDefined();
  });
});
