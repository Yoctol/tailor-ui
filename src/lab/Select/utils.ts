import fuzzaldrin from 'fuzzaldrin-plus';
import { PRect } from '@reach/rect';
import { Position } from '@reach/popover';

import {
  SelectCreateOptionObject,
  SelectOption,
  SelectOptionObject,
  SelectValue,
} from './types';

export const CREATE_OPTION = 'CREATE_OPTION';

export const isObjectOption = (
  item?: SelectValue
): item is SelectOptionObject => typeof item === 'object' && Boolean(item);

export const isCreateOption = (
  item?: SelectValue
): item is SelectCreateOptionObject =>
  isObjectOption(item) && item.label === CREATE_OPTION;

export const itemToString = (item?: SelectValue) => {
  if (isObjectOption(item)) {
    return item.label;
  }

  if (item === null || typeof item === 'undefined') {
    return '';
  }

  return String(item);
};

export const filter = <T extends SelectOption>(items: T[], input: string) => {
  const wrappedItems = items.map((item) => ({
    key: itemToString(item),
    item,
  }));

  return fuzzaldrin
    .filter(wrappedItems, input, { key: 'key' })
    .map(({ item }) => item);
};

function getCollisions(
  targetRect: PRect,
  popoverRect: PRect,
  offsetLeft = 0,
  offsetBottom = 0
) {
  const collisions = {
    top: targetRect.top - popoverRect.height < 0,
    right: window.innerWidth < targetRect.left + popoverRect.width - offsetLeft,
    bottom:
      window.innerHeight <
      targetRect.bottom + popoverRect.height - offsetBottom,
    left: targetRect.left + targetRect.width - popoverRect.width < 0,
  };

  const directionRight = collisions.right && !collisions.left;
  const directionLeft = collisions.left && !collisions.right;
  const directionUp = collisions.bottom && !collisions.top;
  const directionDown = collisions.top && !collisions.bottom;

  return { directionRight, directionLeft, directionUp, directionDown };
}

const POSITION_Y_OFFSET = 5;

function getTopPosition(targetRect: PRect, popoverRect: PRect) {
  const { directionUp } = getCollisions(targetRect, popoverRect);
  return {
    top: directionUp
      ? `${
          targetRect.top -
          popoverRect.height +
          window.pageYOffset -
          POSITION_Y_OFFSET
        }px`
      : `${
          targetRect.top +
          targetRect.height +
          window.pageYOffset +
          POSITION_Y_OFFSET
        }px`,
  };
}

export const positionMatchWidth: Position = (targetRect, popoverRect) => {
  if (!targetRect || !popoverRect) {
    return {};
  }

  return {
    width: targetRect.width,
    left: targetRect.left,
    ...getTopPosition(targetRect, popoverRect),
  };
};
