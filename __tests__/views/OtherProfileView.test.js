import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import OtherProfileView from '../OtherProfileView';

// Mock the navigation prop
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('OtherProfileView', () => {
  // Mock user data
  const userData = {
    display_name: 'John Doe',
    image_url: 'https://example.com/avatar.jpg',
  };

  // Mock Firebase methods
  const mockOnAuthStateChanged = jest.fn();
  const mockGetDoc = jest.fn(() => ({ exists: () => true, data: () => userData }));
  const mockWhere = jest.fn(() => ({ where: mockWhere, get: () => Promise.resolve({ empty: true }) }));
  const mockQuery = jest.fn(() => ({ where: mockWhere, get: () => Promise.resolve({ empty: true }) }));
  const mockAddDoc = jest.fn();
  const mockDeleteDoc = jest.fn();
  const mockUpdateDoc = jest.fn();

  beforeAll(() => {
    // Mock Firebase functions before running tests
    jest.mock('firebase', () => ({
      ...jest.requireActual('firebase'),
      auth: () => ({
        onAuthStateChanged: mockOnAuthStateChanged,
      }),
      firestore: () => ({
        collection: () => ({
          doc: () => ({
            get: mockGetDoc,
            delete: mockDeleteDoc,
            update: mockUpdateDoc,
          }),
          where: mockWhere,
          add: mockAddDoc,
          get: mockQuery,
        }),
      }),
    }));
  });

  beforeEach(() => {
    // Reset mock functions before each test
    jest.clearAllMocks();
  });

  it('should render a loading indicator when loading', () => {
    const { getByTestId } = render(<OtherProfileView route={{ params: { viewingUserId: '123' } }} />);
    expect(getByTestId('loading-indicator')).toBeDefined();
  });

  it('should render the user data when loaded', async () => {
    const { getByText } = render(<OtherProfileView route={{ params: { viewingUserId: '123' } }} />);
    await waitFor(() => expect(mockGetDoc).toHaveBeenCalledTimes(1));
    expect(getByText('John Doe')).toBeDefined();
  });

  it('should render a "Send Friend Request" button when not friends', async () => {
    const { getByText } = render(<OtherProfileView route={{ params: { viewingUserId: '123' } }} />);
    await waitFor(() => expect(mockGetDoc).toHaveBeenCalledTimes(1));
    expect(getByText('Send Friend Request')).toBeDefined();
  });

  it('should call addDoc and setRelationshipStatus("pending") when "Send Friend Request" button is pressed', async () => {
    const { getByText } = render(<OtherProfileView route={{ params: { viewingUserId: '123' } }} />);
    await waitFor(() => expect(mockGetDoc).toHaveBeenCalledTimes(1));
    fireEvent.press(getByText('Send Friend Request'));
    await waitFor(() => expect(mockAddDoc).toHaveBeenCalledTimes(1));
    expect(mockAddDoc).toHaveBeenCalledWith('relationships', { userId1: undefined, userId2: '123', status1: 'pending', status2: 'pending' });
    expect(getByText('Cancel Friend Request')).toBeDefined();
  });

  it('should render a "Cancel Friend Request" button when a request is sent by the current user', async () => {
    // Mock a relationship document where the current user has sent a friend request
    mockQuery.mockReturnValueOnce(Promise.resolve({ empty:
