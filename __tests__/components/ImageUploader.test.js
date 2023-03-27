import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import ImageUploader from '../../components/ImageUploader';

jest.mock('../../hooks/useImagePicker');
jest.mock('../../utils/handleImageUpload');

describe('ImageUploader', () => {
  const entityId = 'testEntityId';
  const entityPath = 'testEntityPath';
  const images = [];
  const onImagesUploaded = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the ImageUploader component', () => {
    const { getByTestId } = render(
      <ImageUploader
        entityId={entityId}
        entityPath={entityPath}
        images={images}
        onImagesUploaded={onImagesUploaded}
      />
    );

    const uploadButton = getByTestId('upload-button');
    expect(uploadButton).toBeTruthy();
  });

  it('should call pickImages when the upload button is pressed', () => {
    const { pickImages } = require('../../hooks/useImagePicker');
    const { getByTestId } = render(
      <ImageUploader
        entityId={entityId}
        entityPath={entityPath}
        images={images}
        onImagesUploaded={onImagesUploaded}
      />
    );

    const uploadButton = getByTestId('upload-button');
    fireEvent.press(uploadButton);
    expect(pickImages).toHaveBeenCalled();
  });
});
