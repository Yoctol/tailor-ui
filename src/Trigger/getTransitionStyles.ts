import { Placement } from './getPositionOffset';

const getTransitionStyles = ({
  placement,
  animation,
}: {
  placement: Placement;
  animation: 'slide' | 'scale';
}) => {
  let transform = {
    enter: 'scale(1)',
    leave: 'scale(0.3)',
  };

  let transformOrigin = 'initial';

  if (animation === 'slide') {
    const translateFrom = placement.startsWith('top') ? 10 : -10;
    transform = {
      leave:
        placement.startsWith('top') || placement.startsWith('bottom')
          ? `translate3d(0, ${translateFrom}px, 0)`
          : `translate3d(${translateFrom}px, 0, 0)`,
      enter: 'translate3d(0, 0px, 0)',
    };
  } else if (animation === 'scale') {
    transformOrigin = {
      topLeft: 'left bottom',
      top: '50% bottom',
      topRight: 'right bottom',
      bottomLeft: 'left top',
      bottom: '50% top',
      bottomRight: 'right top',
      leftTop: 'right top',
      left: 'right 50%',
      leftBottom: 'right bottom',
      rightTop: 'left top',
      right: 'left 50%',
      rightBottom: 'left bottom',
    }[placement];
  }

  return {
    from: {
      opacity: 0,
      transform: transform.leave,
      transformOrigin,
    },
    enter: {
      opacity: 1,
      transform: transform.enter,
      transformOrigin,
    },
    leave: {
      opacity: 0,
      transform: transform.leave,
      transformOrigin,
    },
  };
};

export default getTransitionStyles;
