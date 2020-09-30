import styled from 'styled-components';
import { GridProps as BaseGridProps, compose, grid } from 'styled-system';

import { BoxProps, box } from './Box';

export type GridProps = BoxProps & BaseGridProps;

const gridProps = compose(grid, box);

const Grid = styled('div')<GridProps>({ display: 'grid' }, gridProps);

export { Grid };
