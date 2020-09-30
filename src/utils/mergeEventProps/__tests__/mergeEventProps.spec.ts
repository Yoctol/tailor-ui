import { mergeEventProps } from '../mergeEventProps';

describe('merge-event-props', () => {
  it('should merge all the event props', () => {
    const mockOnMouseEnter = jest.fn();
    const mockOnMouseEnter2 = jest.fn();
    const mockOnMouseLeave = jest.fn();
    const mockOnMouseLeave2 = jest.fn();

    const composed = mergeEventProps(
      {
        onMouseEnter: mockOnMouseEnter,
        onMouseLeave: mockOnMouseLeave,
      },
      {
        onMouseEnter: mockOnMouseEnter2,
        onMouseLeave: mockOnMouseLeave2,
      }
    );

    composed.onMouseEnter();
    composed.onMouseLeave();

    expect(mockOnMouseEnter).toBeCalled();
    expect(mockOnMouseEnter2).toBeCalled();
    expect(mockOnMouseLeave).toBeCalled();
    expect(mockOnMouseLeave2).toBeCalled();
  });
});
