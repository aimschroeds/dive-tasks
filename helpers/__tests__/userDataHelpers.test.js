import { getDisplayName, getProfilePicture } from '../userDataHelpers';

describe('getDisplayName', () => {
  test('returns the user display name from the database', async () => {
    const displayName = 'John Smith';
    const mockData = { display_name: displayName };
    const mockDocSnap = { exists: () => true, data: () => mockData };
    const mockGetDoc = jest.fn(() => Promise.resolve(mockDocSnap));
    const mockDocRef = { id: '123' };
    const mockDb = { doc: jest.fn(() => mockDocRef) };

    const result = await getDisplayName('123', mockDb, mockGetDoc);

    expect(mockGetDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toBe(displayName);
  });

  test('returns undefined if the user is not found', async () => {
    const mockDocSnap = { exists: () => false };
    const mockGetDoc = jest.fn(() => Promise.resolve(mockDocSnap));
    const mockDocRef = { id: '456' };
    const mockDb = { doc: jest.fn(() => mockDocRef) };

    const result = await getDisplayName('456', mockDb, mockGetDoc);

    expect(mockGetDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toBeUndefined();
  });
});

describe('getProfilePicture', () => {
  test('returns the user profile picture from the database', async () => {
    const profilePicture = 'https://example.com/profile.png';
    const mockData = { image_url: profilePicture };
    const mockDocSnap = { exists: () => true, data: () => mockData };
    const mockGetDoc = jest.fn(() => Promise.resolve(mockDocSnap));
    const mockDocRef = { id: '789' };
    const mockDb = { doc: jest.fn(() => mockDocRef) };

    const result = await getProfilePicture('789', mockDb, mockGetDoc);

    expect(mockGetDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toBe(profilePicture);
  });

  test('returns undefined if the user is not found', async () => {
    const mockDocSnap = { exists: () => false };
    const mockGetDoc = jest.fn(() => Promise.resolve(mockDocSnap));
    const mockDocRef = { id: '1011' };
    const mockDb = { doc: jest.fn(() => mockDocRef) };

    const result = await getProfilePicture('1011', mockDb, mockGetDoc);

    expect(mockGetDoc).toHaveBeenCalledWith(mockDocRef);
    expect(result).toBeUndefined();
  });
});
