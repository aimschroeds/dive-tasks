import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NotificationDrawer from '../../views/NotificationDrawer';

const mockNotifications = [
  {
    id: '1',
    title: 'Test Notification 1',
    description: 'This is a test notification 1',
    read: false,
  },
  {
    id: '2',
    title: 'Test Notification 2',
    description: 'This is a test notification 2',
    read: true,
  },
];

const toggleDrawerMock = jest.fn();
const onNotificationPressMock = jest.fn();

describe('NotificationDrawer', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <NotificationDrawer
        notifications={mockNotifications}
        toggleDrawer={toggleDrawerMock}
        onNotificationPress={onNotificationPressMock}
      />
    );

    mockNotifications.forEach((notification) => {
      expect(getByText(notification.title)).toBeDefined();
      expect(getByText(notification.description)).toBeDefined();
    });
  });

  it('calls toggleDrawer on button press', () => {
    const { getByTestId } = render(
      <NotificationDrawer
        notifications={mockNotifications}
        toggleDrawer={toggleDrawerMock}
        onNotificationPress={onNotificationPressMock}
      />
    );

    fireEvent.press(getByTestId('toggle-drawer-button'));
    expect(toggleDrawerMock).toHaveBeenCalledTimes(1);
  });

  it('calls onNotificationPress with correct id on notification press', () => {
    const { getByText } = render(
      <NotificationDrawer
        notifications={mockNotifications}
        toggleDrawer={toggleDrawerMock}
        onNotificationPress={onNotificationPressMock}
      />
    );

    fireEvent.press(getByText(mockNotifications[0].title));
    expect(onNotificationPressMock).toHaveBeenCalledWith(mockNotifications[0].id);
  });
});
