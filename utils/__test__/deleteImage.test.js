import { getStorageRefFromUrl, deleteImage } from './imageHelpers';

describe('getStorageRefFromUrl', () => {
  it('should return a storage ref for a valid URL', () => {
    const storage = { ref: jest.fn() };
    const url = 'https://firebasestorage.googleapis.com/v0/b/my-app.appspot.com/o/images%2Fexample.jpg?alt=media&token=12345';
    const expectedPath = 'images/example.jpg';

    const storageRef = getStorageRefFromUrl(storage, url);

    expect(storageRef).toBeDefined();
    expect(storageRef.fullPath).toEqual(expectedPath);
  });

  it('should throw an error for an invalid URL', () => {
    const storage = { ref: jest.fn() };
    const url = 'https://firebasestorage.googleapis.com/v0/b/my-app.appspot.com/o/';

    expect(() => getStorageRefFromUrl(storage, url)).toThrowError('Unable to extract storage path from URL');
  });
});

describe('deleteImage', () => {
  it('should delete an image from storage and remove its URL from the entity', async () => {
    const entityId = '123';
    const entityPath = 'posts';
    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/my-app.appspot.com/o/images%2Fexample.jpg?alt=media&token=12345';
    const storageRef = { delete: jest.fn() };
    const updateDoc = jest.fn();

    const storage = { ref: jest.fn(() => storageRef) };
    const db = { doc: jest.fn(() => ({ update: updateDoc })) };
    const expectedPath = 'images/example.jpg';

    await deleteImage(entityId, entityPath, imageUrl, db, storage);

    expect(storageRef.delete).toHaveBeenCalled();
    expect(db.doc).toHaveBeenCalledWith(entityPath + '/' + entityId);
    expect(updateDoc).toHaveBeenCalledWith({
      images: expect.arrayContaining([expect.not.stringContaining(expectedPath)]),
    });
  });
});
