import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeView from '../views/HomeView';
import { auth, db } from '../firebase';
import { collection, query, where } from 'firebase/firestore';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('../helpers/friendsHelpers', () => {
  return {
    getFriends: jest.fn(() => Promise.resolve([])),
  };
});

describe('HomeView', () => {
  beforeAll(() => {
    // Suppress console.error warnings from Firebase
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    const { getByTestId } = render(<HomeView />);
    await waitFor(() => getByTestId('home-view'));
  });

  it('fetches dives and plans from the database', async () => {
    const userId = 'user123';
    const friends = ['friend1', 'friend2'];
    const dives = [{ id: 'dive1', type: 'dive' }, { id: 'dive2', type: 'dive' }];
    const plans = [{ id: 'plan1', type: 'plan' }];
    const mergedList = [...dives, ...plans].sort((a, b) => {
      const timestampA = a.type === 'dive' ? a.startTime : a.completedAt;
      const timestampB = b.type === 'dive' ? b.startTime : b.completedAt;
      return timestampA - timestampB;
    });

    jest.spyOn(auth, 'onAuthStateChanged').mockImplementation((callback) => {
      callback({ uid: userId });
      return jest.fn();
    });

    jest.spyOn(db, 'collection').mockReturnValue({
      where: jest.fn(() => ({
        orderBy: jest.fn(() => ({
          onSnapshot: jest.fn((callback) => {
            callback({
              forEach: (docCallback) => {
                docCallback({
                  id: dives[0].id,
                  data: () => ({ userId }),
                });
              },
            });
          }),
        })),
      })),
    });

    jest.spyOn(db, 'collection').mockReturnValue({
      where: jest.fn(() => ({
        orderBy: jest.fn(() => ({
          onSnapshot: jest.fn((callback) => {
            callback({
              forEach: (docCallback) => {
                docCallback({
                  id: plans[0].id,
                  data: () => ({ userId }),
                });
              },
            });
          }),
        })),
      })),
    });

    jest.spyOn(db, 'collection').mockReturnValue({
      where: jest.fn(() => ({
        orderBy: jest.fn(() => ({
          onSnapshot: jest.fn((callback) => {
            callback({
              forEach: (docCallback) => {
                docCallback({
                  id: dives[1].id,
                  data: () => ({ userId }),
                });
              },
            });
          }),
        })),
      })),
    });

    jest.spyOn(db, 'collection').mockReturnValue({
      where: jest.fn(() => ({
        orderBy: jest.fn(() => ({
          onSnapshot: jest.fn((callback) => {
            callback({
              forEach: (docCallback) => {
                docCallback({
                  id: plans[0].id,
                  data: () => ({ userId }),
                });
              },
            });
          }),
        })),
      })),
    });
});
});

    describe('<HomeView />', () => {
        test('should render dives', async () => {
          const mockDives = [{ id: 1, type: 'dive' }];
          const mockPlans = [{ id: 1, type: 'plan' }];
          const mockFeed = [...mockDives, ...mockPlans];
          const { queryByTestId } = render(<HomeView feed={mockFeed} />);
          expect(queryByTestId('dive-item')).toBeTruthy();
        });
      
        test('should render plans', async () => {
          const mockDives = [{ id: 1, type: 'dive' }];
          const mockPlans = [{ id: 1, type: 'plan' }];
          const mockFeed = [...mockDives, ...mockPlans];
          const { queryByTestId } = render(<HomeView feed={mockFeed} />);
          expect(queryByTestId('plan-item')).toBeTruthy();
        });
        });

