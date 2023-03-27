import { handleImageUpload } from '../handleImageUpload';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { db } from '../../firebase';

jest.mock('../firebase', () => ({
  db: {},
  storage: {},
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
  doc: jest.fn(),
}));

describe('handleImageUpload', () => {
  const entityId = 'testEntityId';
  const entityPath = 'plans';
  const inputImage = {
    uri: 'https://testimageurl.com',
  };
  const onImageUploaded = jest.fn();
  const imageUrl = 'https://testuploadedimageurl.com';
  const storageRef = ref(getStorage(), `${entityPath}/${entityId}/testfilename`);
  const uploadedImageUrls = [imageUrl];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uploads an image and updates the document', async () => {
    const response = { blob: () => Promise.resolve() };
    global.fetch = jest.fn().mockResolvedValue(response);
    uploadBytes.mockResolvedValue();
    getDownloadURL.mockResolvedValue(imageUrl);
    ref.mockReturnValue(storageRef);
    arrayUnion.mockReturnValue(uploadedImageUrls);

    await handleImageUpload(entityId, entityPath, inputImage, onImageUploaded);

    expect(getStorage).toHaveBeenCalled();
    expect(ref).toHaveBeenCalledWith(getStorage(), `${entityPath}/${entityId}/testfilename`);
    expect(uploadBytes).toHaveBeenCalled();
    expect(getDownloadURL).toHaveBeenCalledWith(storageRef);
    expect(arrayUnion).toHaveBeenCalledWith(imageUrl);
    expect(updateDoc).toHaveBeenCalledWith(doc(db, entityPath, entityId), { images: uploadedImageUrls });
    expect(onImageUploaded).toHaveBeenCalledWith(uploadedImageUrls);
    expect(global.fetch).toHaveBeenCalledWith(inputImage.uri);
  });

  it('handles an error', async () => {
    const error = new Error('Test error');
    global.fetch = jest.fn().mockRejectedValue(error);

    await handleImageUpload(entityId, entityPath, inputImage, onImageUploaded);

    expect(console.error).toHaveBeenCalledWith('Error saving image(s):', error);
  });
});
