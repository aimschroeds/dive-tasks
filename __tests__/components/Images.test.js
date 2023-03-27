import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Images from '../../components/Images';

const mockImages = [
  'https://picsum.photos/200/300',
  'https://picsum.photos/400/300',
  'https://picsum.photos/200/200',
];

const entityId = '1';
const entityPath = 'test-entity';
const refreshImagesMock = jest.fn();

describe('Images', () => {
  it('renders images correctly', () => {
    const { getByTestId } = render(
      <Images
        entityId={entityId}
        entityPath={entityPath}
        images={mockImages}
        refreshImages={refreshImagesMock}
      />
    );

    mockImages.forEach((image, index) => {
      expect(getByTestId(`image-${index}`)).toHaveProp('source', { uri: image });
    });
  });

  it('triggers modal open and close on image press', () => {
    const { getByTestId, queryByTestId } = render(
      <Images
        entityId={entityId}
        entityPath={entityPath}
        images={mockImages}
        refreshImages={refreshImagesMock}
      />
    );

    fireEvent.press(getByTestId('image-0'));
    expect(queryByTestId('modal-image')).toHaveProp('source', { uri: mockImages[0] });

    fireEvent.press(queryByTestId('modal-container'));
    expect(queryByTestId('modal-image')).toBeNull();
  });
});
