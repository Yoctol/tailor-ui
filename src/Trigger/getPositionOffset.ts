import { Placement } from './type';

export default (
  childrenRect: DOMRect,
  popupOffsets: { offsetHeight: number; offsetWidth: number },
  placement: Placement = 'bottom',
  offset = 5
) => {
  const { offsetHeight, offsetWidth } = popupOffsets;

  const TOP_OFFSET_TOP = childrenRect.top - offsetHeight - offset;
  const TOP_OFFSET_BOTTOM = childrenRect.top + childrenRect.height + offset;
  const LEFT_OFFSET_LEFT = childrenRect.left - offsetWidth - offset;
  const LEFT_OFFSET_RIGHT = childrenRect.left + childrenRect.width + offset;

  const TOP_OFFSET_X_TOP = childrenRect.top;
  const TOP_OFFSET_X_CENTER =
    childrenRect.top + childrenRect.height / 2 - offsetHeight / 2;
  const TOP_OFFSET_X_BOTTOM =
    childrenRect.top + childrenRect.height - offsetHeight;
  const LEFT_OFFSET_Y_LEFT = childrenRect.left;
  const LEFT_OFFSET_Y_CENTER =
    childrenRect.left + childrenRect.width / 2 - offsetWidth / 2;
  const LEFT_OFFSET_Y_RIGHT =
    childrenRect.left + childrenRect.width - offsetWidth;

  switch (placement) {
    case 'top':
      return {
        top: TOP_OFFSET_TOP,
        left: LEFT_OFFSET_Y_CENTER,
      };
    case 'topRight':
      return {
        top: TOP_OFFSET_TOP,
        left: LEFT_OFFSET_Y_RIGHT,
      };
    case 'topLeft':
      return {
        top: TOP_OFFSET_TOP,
        left: LEFT_OFFSET_Y_LEFT,
      };

    case 'bottom':
      return {
        top: TOP_OFFSET_BOTTOM,
        left: LEFT_OFFSET_Y_CENTER,
      };
    case 'bottomRight':
      return {
        top: TOP_OFFSET_BOTTOM,
        left: LEFT_OFFSET_Y_RIGHT,
      };
    case 'bottomLeft':
      return {
        top: TOP_OFFSET_BOTTOM,
        left: LEFT_OFFSET_Y_LEFT,
      };

    case 'left':
      return {
        top: TOP_OFFSET_X_CENTER,
        left: LEFT_OFFSET_LEFT,
      };
    case 'leftTop':
      return {
        top: TOP_OFFSET_X_TOP,
        left: LEFT_OFFSET_LEFT,
      };
    case 'leftBottom':
      return {
        top: TOP_OFFSET_X_BOTTOM,
        left: LEFT_OFFSET_LEFT,
      };

    case 'right':
      return {
        top: TOP_OFFSET_X_CENTER,
        left: LEFT_OFFSET_RIGHT,
      };
    case 'rightTop':
      return {
        top: TOP_OFFSET_X_TOP,
        left: LEFT_OFFSET_RIGHT,
      };
    case 'rightBottom':
      return {
        top: TOP_OFFSET_X_BOTTOM,
        left: LEFT_OFFSET_RIGHT,
      };

    default:
      return {
        top: 0,
        left: 0,
      };
  }
};
