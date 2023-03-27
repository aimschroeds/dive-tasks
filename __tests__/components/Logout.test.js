import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';
import Logout from '../../components/Logout';

jest.mock('@react-navigation/native');
jest.mock('../../firebase');

describe('Logout', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Logout component', () => {
    const { getByText } = render(<Logout />);

    const logoutButton = getByText('Logout');
    expect(logoutButton).toBeTruthy();
  });

  it('should call signOut and navigate to Login when the logout button is pressed', async () => {
    const { getByText } = render(<Logout />);

    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    expect(auth.signOut).toHaveBeenCalled();
    await expect(auth.signOut).toHaveBeenCalled();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });
});
