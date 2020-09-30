interface GetOverlayPosition {
  mentionRect: {
    top: number;
    left: number;
  };
  coordinates: {
    top: number;
    left: number;
    height: number;
  };
  target: HTMLElement;
  placement: 'bottom' | 'top';
}

export interface OverlayPosition {
  top: number;
  left: number;
}

export const getOverlayPosition = ({
  mentionRect,
  coordinates,
  target,
  placement,
}: GetOverlayPosition): OverlayPosition => {
  const top =
    mentionRect.top +
    coordinates.top -
    target.scrollTop +
    (placement === 'bottom' ? coordinates.height : 0);
  const left = mentionRect.left + coordinates.left - target.scrollLeft;

  return {
    top,
    left,
  };
};

const PREFIX = '{{';
const SUFFIX = '}}';

export const getCursorPosition = (value: string, selectionStart: number) => {
  const startPos =
    value.lastIndexOf(PREFIX, selectionStart) > -1
      ? value.lastIndexOf(PREFIX, selectionStart) + 2
      : -1;

  const suffixPos = value.indexOf(SUFFIX, selectionStart);
  const nextPrefixPos = value.indexOf(PREFIX, selectionStart);
  const spacePos = value.indexOf(' ', selectionStart);

  const positions = [suffixPos, nextPrefixPos, spacePos]
    .filter((pos) => pos !== -1)
    .sort((a, b) => a - b);

  if (
    selectionStart === startPos &&
    nextPrefixPos !== -1 &&
    nextPrefixPos === positions[0]
  ) {
    return {
      startPos,
      endPos: startPos,
    };
  }

  const endPos = positions[0] || selectionStart;

  return {
    startPos,
    endPos,
  };
};

export const getMentionCursor = (
  originValue: string,
  selectionStart: number
) => {
  const value = originValue.replace(/[\r\n]/g, ' ');

  const { startPos, endPos } = getCursorPosition(value, selectionStart);
  const mention = value.substring(startPos, endPos);
  const searchValue = value.substring(startPos, selectionStart);
  const createValue =
    mention.length > searchValue.length ? mention : searchValue;

  if (
    startPos < 0 ||
    endPos < 0 ||
    mention.includes('{') ||
    mention.includes('}') ||
    selectionStart < startPos ||
    selectionStart > endPos
  ) {
    return {
      mention: null,
      searchValue: null,
      createValue: null,
      startPos: -1,
      endPos: -1,
    };
  }

  return {
    mention,
    searchValue,
    createValue,
    startPos,
    endPos,
  };
};
