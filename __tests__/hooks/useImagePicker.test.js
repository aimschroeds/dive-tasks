import { act } from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';

import useImagePicker from '../../hooks/useImagePicker';

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  MediaTypeOptions: { Images: 'Images' },
  launchImageLibraryAsync: jest.fn(),
}));

const { requestMediaLibraryPermissionsAsync, launchImageLibraryAsync } = require('expo-image-picker');

describe('useImagePicker', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should request permissions and pick images', async () => {
    requestMediaLibraryPermissionsAsync.mockResolvedValue({ granted: true });
    launchImageLibraryAsync.mockResolvedValue({ canceled: false, assets: [{ uri: 'fakeImageUri' }] });

    const { result } = renderHook(() => useImagePicker());

    expect(result.current.selectedImages).toEqual([]);

    await act(async () => {
      await result.current.pickImages();
    });

    expect(requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
    expect(launchImageLibraryAsync).toHaveBeenCalled();
    expect(result.current.selectedImages).toEqual([{ uri: 'fakeImageUri' }]);
  });

  it('should not pick images if permission is not granted', async () => {
    requestMediaLibraryPermissionsAsync.mockResolvedValue({ granted: false });

    const { result } = renderHook(() => useImagePicker());

    await act(async () => {
      await result.current.pickImages();
    });

    expect(requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
    expect(launchImageLibraryAsync).not.toHaveBeenCalled();
    expect(result.current.selectedImages).toEqual([]);
  });

});
