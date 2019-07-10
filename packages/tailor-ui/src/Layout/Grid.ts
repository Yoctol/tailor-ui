import styled from 'styled-components';
import {
  GridAutoColumnsProps,
  GridAutoFlowProps,
  GridAutoRowsProps,
  GridColumnGapProps,
  GridColumnProps,
  GridGapProps,
  GridRowGapProps,
  GridRowProps,
  GridTemplateColumnsProps,
  GridTemplateRowsProps,
  GridTemplatesAreasProps,
  compose,
  gridAutoColumns,
  gridAutoFlow,
  gridAutoRows,
  gridColumn,
  gridColumnGap,
  gridGap,
  gridRow,
  gridRowGap,
  gridTemplateAreas,
  gridTemplateColumns,
  gridTemplateRows,
} from 'styled-system';

import { BoxProps, box } from './Box';

export type GridProps = BoxProps &
  GridGapProps &
  GridColumnGapProps &
  GridRowGapProps &
  GridColumnProps &
  GridRowProps &
  GridAutoFlowProps &
  GridAutoColumnsProps &
  GridAutoRowsProps &
  GridTemplateColumnsProps &
  GridTemplateRowsProps &
  GridTemplatesAreasProps;

const grid = compose(
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  box
);

const Grid = styled('div')<GridProps>({ display: 'grid' }, grid);

export { Grid };
