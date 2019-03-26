import styled, { css } from 'styled-components';
import { TextAlignProps, WidthProps, textAlign, width } from 'styled-system';

import tag from '../utils/CleanTag';

export const HeadColumn = styled(tag.th)<WidthProps>`
  padding: ${p => p.theme.paddings.sm};
  font-weight: bold;

  ${width};
`;

export const Column = styled(tag.td)`
  padding: ${p => p.theme.paddings.md} ${p => p.theme.paddings.sm};
`;

export const Row = styled(tag.tr)`
  border-bottom: ${p => p.theme.borders.base} ${p => p.theme.colors.gray300};

  ${p => p.theme.transition};
`;

export type StyledTableProps = TextAlignProps & WidthProps;

export const StyledTable = styled(tag.table)<StyledTableProps>`
  overflow: hidden;
  border-spacing: 0;
  border-collapse: collapse;
  border-style: hidden;
  border-radius: ${p => p.theme.radii.xl};
  font-size: ${p => p.theme.fontSizes.base};

  & > thead {
    border-bottom: ${p => p.theme.borders.base} ${p => p.theme.colors.gray300};
    background-color: ${p => p.theme.colors.surface2};
  }

  & > tbody > ${Row /* sc-selector */} {
    background-color: ${p => p.theme.colors.light};

    &:hover {
      background-color: ${p => p.theme.colors.gray100};
    }
  }

  ${width};
  ${textAlign};
`;

export type TableWrapperProps = WidthProps & {
  hasHeader: boolean;
  hasFooter: boolean;
};

export const TableWrapper = styled.div<TableWrapperProps>`
  overflow: hidden;
  border-radius: ${p => p.theme.radii.xl};
  background-color: ${p => p.theme.colors.light};

  /* stylelint-disable-next-line no-descending-specificity */
  & > ${StyledTable} {
    width: 100%;
    border-radius: 0;

    ${p =>
      p.hasHeader &&
      css`
        border-top: ${p.theme.borders.base} ${p.theme.colors.gray300};
      `}

    ${p =>
      p.hasFooter &&
      css`
        border-bottom: ${p.theme.borders.base} ${p.theme.colors.gray300};
      `}
  }

  ${width};
`;
