import styled from 'styled-components';
import {
  GridAreaProps,
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
  gridArea,
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

export type GridProps = GridGapProps &
  GridColumnGapProps &
  GridRowGapProps &
  GridColumnProps &
  GridRowProps &
  GridAutoFlowProps &
  GridAutoColumnsProps &
  GridAutoRowsProps &
  GridTemplateColumnsProps &
  GridTemplateRowsProps &
  GridTemplatesAreasProps &
  GridAreaProps;

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
  gridArea
);

const Grid = styled('div')<GridProps>({ display: 'grid' }, grid);

export { Grid };
