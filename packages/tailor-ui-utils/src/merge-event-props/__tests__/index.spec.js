import mergeEventProps from '../merge-event-props';

it('should merge all the event props', () => {
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();

  const composed = mergeEventProps(
    {
      onMouseEnter: mockOnMouseEnter,
    },
    {
      onMouseLeave: mockOnMouseLeave,
    }
  );

  composed.onMouseEnter();
  composed.onMouseLeave();

  expect(mockOnMouseEnter).toBeCalled();
  expect(mockOnMouseLeave).toBeCalled();
});
