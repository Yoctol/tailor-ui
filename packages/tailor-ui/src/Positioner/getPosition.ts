import { Position, Positions } from '../constants';

interface Dimensions {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

interface Position {
  left: number;
  top: number;
}

const makeRect = ({ width, height }: Dimensions, { left, top }: Position) => {
  const ceiledLeft = Math.ceil(left);
  const ceiledTop = Math.ceil(top);
  return {
    width,
    height,
    left: ceiledLeft,
    top: ceiledTop,
    right: ceiledLeft + width,
    bottom: ceiledTop + height,
  };
};

const flipHorizontal = (position: Positions) => {
  switch (position) {
    case Position.TOP_LEFT:
      return Position.BOTTOM_LEFT;
    case Position.TOP:
    default:
      return Position.BOTTOM;
    case Position.TOP_RIGHT:
      return Position.BOTTOM_RIGHT;
    case Position.BOTTOM_LEFT:
      return Position.TOP_LEFT;
    case Position.BOTTOM:
      return Position.TOP;
    case Position.BOTTOM_RIGHT:
      return Position.TOP_RIGHT;
  }
};

/**
 * Function that returns if position is aligned on top.
 * @param {Position} position
 * @return {Boolean}
 */
const isAlignedOnTop = (position: string) => {
  switch (position) {
    case Position.TOP_LEFT:
    case Position.TOP:
    case Position.TOP_RIGHT:
      return true;
    default:
      return false;
  }
};

const isAlignedHorizontal = (position: string) => {
  switch (position) {
    case Position.LEFT:
    case Position.RIGHT:
      return true;
    default:
      return false;
  }
};

const getFitsOnBottom = (
  rect: ClientRect,
  viewport: Viewport,
  viewportOffset: number
) => {
  return rect.bottom < viewport.height - viewportOffset;
};

const getFitsOnTop = (rect: ClientRect, viewportOffset: number) => {
  return rect.top > viewportOffset;
};

const getFitsOnRight = (
  rect: ClientRect,
  viewport: Viewport,
  viewportOffset: number
) => {
  return rect.right < viewport.width - viewportOffset;
};

const getFitsOnLeft = (rect: ClientRect, viewportOffset: number) => {
  return rect.left > viewportOffset;
};

const getTransformOrigin = ({
  rect,
  position,
  dimensions,
  targetCenter,
}: {
  rect: ClientRect;
  position: Positions;
  dimensions: Dimensions;
  targetCenter: number;
}) => {
  const centerY = Math.round(targetCenter - rect.top);

  if (position === Position.LEFT) {
    /* Syntax: x-offset | y-offset */
    return `${dimensions.width}px ${centerY}px`;
  }

  if (position === Position.RIGHT) {
    /* Syntax: x-offset | y-offset */
    return `0px ${centerY}px`;
  }

  const centerX = Math.round(targetCenter - rect.left);

  if (isAlignedOnTop(position)) {
    /* Syntax: x-offset | y-offset */
    return `${centerX}px ${dimensions.height}px `;
  }

  /* Syntax: x-offset | y-offset */
  return `${centerX}px 0px `;
};

function getRect({
  position,
  targetOffset,
  dimensions,
  targetRect,
}: {
  position: Positions;
  targetOffset: number;
  dimensions: Dimensions;
  targetRect: ClientRect;
}) {
  const leftRect =
    targetRect.left + targetRect.width / 2 - dimensions.width / 2;
  const alignedTopY = targetRect.top - dimensions.height - targetOffset;
  const alignedBottomY = targetRect.bottom + targetOffset;
  const alignedRightX = targetRect.right - dimensions.width;
  const alignedLeftRightY =
    targetRect.top + targetRect.height / 2 - dimensions.height / 2;

  switch (position) {
    case Position.LEFT:
      return makeRect(dimensions, {
        left: targetRect.left - dimensions.width - targetOffset,
        top: alignedLeftRightY,
      });
    case Position.RIGHT:
      return makeRect(dimensions, {
        left: targetRect.right + targetOffset,
        top: alignedLeftRightY,
      });
    case Position.TOP:
      return makeRect(dimensions, {
        left: leftRect,
        top: alignedTopY,
      });
    case Position.TOP_LEFT:
      return makeRect(dimensions, {
        left: targetRect.left,
        top: alignedTopY,
      });
    case Position.TOP_RIGHT:
      return makeRect(dimensions, {
        left: alignedRightX,
        top: alignedTopY,
      });
    default:
    case Position.BOTTOM:
      return makeRect(dimensions, {
        left: leftRect,
        top: alignedBottomY,
      });
    case Position.BOTTOM_LEFT:
      return makeRect(dimensions, {
        left: targetRect.left,
        top: alignedBottomY,
      });
    case Position.BOTTOM_RIGHT:
      return makeRect(dimensions, {
        left: alignedRightX,
        top: alignedBottomY,
      });
  }
}

function getPosition({
  position,
  dimensions,
  targetRect,
  targetOffset,
  viewport,
  viewportOffset = 8,
}: {
  position: Positions;
  dimensions: Dimensions;
  targetRect: ClientRect;
  targetOffset: number;
  viewport: Viewport;
  viewportOffset: number;
}) {
  const isHorizontal = isAlignedHorizontal(position);

  // Handle left and right positions
  if (isHorizontal) {
    const leftRect = getRect({
      position: Position.LEFT,
      dimensions,
      targetRect,
      targetOffset,
    });

    const rightRect = getRect({
      position: Position.RIGHT,
      dimensions,
      targetRect,
      targetOffset,
    });

    const fitsOnLeft = getFitsOnLeft(leftRect, viewportOffset);
    const fitsOnRight = getFitsOnRight(rightRect, viewport, viewportOffset);

    if (position === Position.LEFT) {
      if (fitsOnLeft) {
        return {
          position,
          rect: leftRect,
        };
      }

      if (fitsOnRight) {
        return {
          position: Position.RIGHT,
          rect: rightRect,
        };
      }
    }

    if (position === Position.RIGHT) {
      if (fitsOnRight) {
        return {
          position,
          rect: rightRect,
        };
      }

      if (fitsOnLeft) {
        return {
          position: Position.LEFT,
          rect: leftRect,
        };
      }
    }

    // Default to using the position with the most space
    const spaceRight = Math.abs(
      viewport.width - viewportOffset - rightRect.right
    );
    const spaceLeft = Math.abs(leftRect.left - viewportOffset);

    if (spaceRight < spaceLeft) {
      return {
        position: Position.RIGHT,
        rect: rightRect,
      };
    }

    return {
      position: Position.LEFT,
      rect: leftRect,
    };
  }

  const positionIsAlignedOnTop = isAlignedOnTop(position);
  let topRect;
  let bottomRect;

  if (positionIsAlignedOnTop) {
    topRect = getRect({
      position,
      dimensions,
      targetRect,
      targetOffset,
    });

    bottomRect = getRect({
      position: flipHorizontal(position),
      dimensions,
      targetRect,
      targetOffset,
    });
  } else {
    topRect = getRect({
      position: flipHorizontal(position),
      dimensions,
      targetRect,
      targetOffset,
    });

    bottomRect = getRect({
      position,
      dimensions,
      targetRect,
      targetOffset,
    });
  }

  const topRectFitsOnTop = getFitsOnTop(topRect, viewportOffset);

  const bottomRectFitsOnBottom = getFitsOnBottom(
    bottomRect,
    viewport,
    viewportOffset
  );

  if (positionIsAlignedOnTop) {
    if (topRectFitsOnTop) {
      return {
        position,
        rect: topRect,
      };
    }

    if (bottomRectFitsOnBottom) {
      return {
        position: flipHorizontal(position),
        rect: bottomRect,
      };
    }
  }

  if (!positionIsAlignedOnTop) {
    if (bottomRectFitsOnBottom) {
      return {
        position,
        rect: bottomRect,
      };
    }

    if (topRectFitsOnTop) {
      return {
        position: flipHorizontal(position),
        rect: topRect,
      };
    }
  }

  // Default to most spacious if there is no fit.
  const spaceBottom = Math.abs(
    viewport.height - viewportOffset - bottomRect.bottom
  );

  const spaceTop = Math.abs(topRect.top - viewportOffset);

  if (spaceBottom < spaceTop) {
    return {
      position: positionIsAlignedOnTop ? flipHorizontal(position) : position,
      rect: bottomRect,
    };
  }

  return {
    position: positionIsAlignedOnTop ? position : flipHorizontal(position),
    rect: topRect,
  };
}

export default function getFittedPosition({
  position,
  dimensions,
  targetRect,
  targetOffset,
  viewport,
  viewportOffset = 8,
}: {
  position: Positions;
  dimensions: Dimensions;
  targetRect: ClientRect;
  targetOffset: number;
  viewport: Viewport;
  viewportOffset: number;
}) {
  const { rect, position: finalPosition } = getPosition({
    position,
    dimensions,
    targetRect,
    targetOffset,
    viewport,
    viewportOffset,
  });

  // Push rect to the right if overflowing on the left side of the viewport.
  if (rect.left < viewportOffset) {
    rect.right += Math.ceil(Math.abs(rect.left - viewportOffset));
    rect.left = Math.ceil(viewportOffset);
  }

  // Push rect to the left if overflowing on the right side of the viewport.
  if (rect.right > viewport.width - viewportOffset) {
    const delta = Math.ceil(rect.right - (viewport.width - viewportOffset));
    rect.left -= delta;
    rect.right -= delta;
  }

  // Push rect down if overflowing on the top side of the viewport.
  if (rect.top < viewportOffset) {
    rect.top += Math.ceil(Math.abs(rect.top - viewportOffset));
    rect.bottom = Math.ceil(viewportOffset);
  }

  // Push rect up if overflowing on the bottom side of the viewport.
  if (rect.bottom > viewport.height - viewportOffset) {
    const delta = Math.ceil(rect.bottom - (viewport.height - viewportOffset));
    rect.top -= delta;
    rect.right -= delta;
  }

  const targetCenter = isAlignedHorizontal(position)
    ? targetRect.top + targetRect.height / 2
    : targetRect.left + targetRect.width / 2;

  const transformOrigin = getTransformOrigin({
    rect,
    position: finalPosition,
    dimensions,
    targetCenter,
  });

  return {
    rect,
    position: finalPosition,
    transformOrigin,
  };
}
