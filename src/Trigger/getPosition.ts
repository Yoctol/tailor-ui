import { Placement } from './type';

const getPosition = (
  childrenRect: DOMRect,
  popupOffsets: { offsetHeight: number; offsetWidth: number },
  originPlacement: Placement = 'bottom',
  offset = 5
) => {
  const { offsetHeight, offsetWidth } = popupOffsets;
  const { innerHeight, innerWidth } =
    typeof window !== 'undefined' ? window : { innerHeight: 0, innerWidth: 0 };

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

  let placement = originPlacement;

  if (placement.includes('top') && TOP_OFFSET_TOP < 0) {
    placement = placement.replace('top', 'bottom') as Placement;
  }

  if (
    placement.includes('bottom') &&
    TOP_OFFSET_BOTTOM + offsetHeight > innerHeight
  ) {
    placement = placement.replace('bottom', 'top') as Placement;
  }

  if (placement.includes('left') && LEFT_OFFSET_LEFT < 0) {
    placement = placement.replace('left', 'right') as Placement;
  }

  if (
    placement.includes('right') &&
    LEFT_OFFSET_RIGHT + offsetWidth > innerWidth
  ) {
    placement = placement.replace('right', 'left') as Placement;
  }

  switch (placement) {
    case 'top':
      return {
        placement,
        top: TOP_OFFSET_TOP,
        left: LEFT_OFFSET_Y_CENTER,
      };
    case 'topRight':
      return {
        placement,
        top: TOP_OFFSET_TOP,
        left: LEFT_OFFSET_Y_RIGHT,
      };
    case 'topLeft':
      return {
        placement,
        top: TOP_OFFSET_TOP,
        left: LEFT_OFFSET_Y_LEFT,
      };

    case 'bottom':
      return {
        placement,
        top: TOP_OFFSET_BOTTOM,
        left: LEFT_OFFSET_Y_CENTER,
      };
    case 'bottomRight':
      return {
        placement,
        top: TOP_OFFSET_BOTTOM,
        left: LEFT_OFFSET_Y_RIGHT,
      };
    case 'bottomLeft':
      return {
        placement,
        top: TOP_OFFSET_BOTTOM,
        left: LEFT_OFFSET_Y_LEFT,
      };

    case 'left':
      return {
        placement,
        top: TOP_OFFSET_X_CENTER,
        left: LEFT_OFFSET_LEFT,
      };
    case 'leftTop':
      return {
        placement,
        top: TOP_OFFSET_X_TOP,
        left: LEFT_OFFSET_LEFT,
      };
    case 'leftBottom':
      return {
        placement,
        top: TOP_OFFSET_X_BOTTOM,
        left: LEFT_OFFSET_LEFT,
      };

    case 'right':
      return {
        placement,
        top: TOP_OFFSET_X_CENTER,
        left: LEFT_OFFSET_RIGHT,
      };
    case 'rightTop':
      return {
        placement,
        top: TOP_OFFSET_X_TOP,
        left: LEFT_OFFSET_RIGHT,
      };
    case 'rightBottom':
      return {
        placement,
        top: TOP_OFFSET_X_BOTTOM,
        left: LEFT_OFFSET_RIGHT,
      };

    default:
      return {
        placement,
        top: 0,
        left: 0,
      };
  }
};

export default getPosition;
