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
