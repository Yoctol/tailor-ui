export type Positions =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right';

const Position: {
  TOP: 'top';
  TOP_LEFT: 'top-left';
  TOP_RIGHT: 'top-right';
  BOTTOM: 'bottom';
  BOTTOM_LEFT: 'bottom-left';
  BOTTOM_RIGHT: 'bottom-right';
  LEFT: 'left';
  RIGHT: 'right';
} = {
  TOP: 'top',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM: 'bottom',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  LEFT: 'left',
  RIGHT: 'right',
};

export default Position;
