import styled, { css } from 'styled-components';
import { TextAlignProps, WidthProps, textAlign, width } from 'styled-system';

interface ShadowType {
  showScrollShadowStart?: boolean;
  showScrollShadowEnd?: boolean;
  isLastFixedLeft?: boolean;
  isFirstFixedRight?: boolean;
  fixed?: boolean;
}

const columnSharedStyle = css<ShadowType>`
  height: 56px;
  padding: ${(p) => p.theme.paddings.xs} ${(p) => p.theme.paddings.sm};
  border: none;
  border-bottom: ${(p) => p.theme.borders.base} ${(p) => p.theme.colors.gray300};

  ${(p) =>
    p.fixed &&
    css`
      position: sticky;
      z-index: 5;
    `}

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: -1px;
    width: 30px;
    pointer-events: none;
    ${(p) => p.theme.transition};

    ${(p) =>
      p.isLastFixedLeft &&
      css`
        right: 0;
        transform: translateX(100%);
      `}

    ${(p) =>
      p.isFirstFixedRight &&
      css`
        left: 0;
        transform: translateX(-100%);
      `}

    ${(p) =>
      p.showScrollShadowStart &&
      css`
        box-shadow: inset 10px 0 8px -8px rgb(0 0 0 / 15%);
      `}

    ${(p) =>
      p.showScrollShadowEnd &&
      css`
        box-shadow: inset -10px 0 8px -8px rgb(0 0 0 / 15%);
      `}
  }
`;

export const StyledHeadColumn = styled.th<WidthProps & ShadowType>`
  background-color: ${(p) => p.theme.colors.surface2};
  color: ${(p) => p.theme.colors.gray700};
  font-weight: bold;

  ${columnSharedStyle};
  ${width};
  ${(p) => p.theme.transition};
`;

export const StyledColumn = styled.td<ShadowType>`
  background-color: ${(p) => p.theme.colors.light};

  ${columnSharedStyle};
  ${(p) => p.theme.transition};
`;

export const Row = styled.tr`
  border-top: none;

  &:last-child > ${StyledColumn} {
    border-bottom: none;
  }
`;

export const StyledTable = styled.table`
  display: table;
  width: 100%;
  margin-bottom: 1px;
  overflow: auto;
  border-spacing: 0;
  border-collapse: separate;
  border-style: hidden;
  background-color: ${(p) => p.theme.colors.light};
  font-size: ${(p) => p.theme.fontSizes.base};

  & > tbody > tr:hover > td {
    background-color: ${(p) => p.theme.colors.gray100};
  }
`;

export type StyledTableWrapperProps = TextAlignProps &
  WidthProps & {
    hasHeader: boolean;
    hasFooter: boolean;
  };

export const StyledTableWrapper = styled.div<StyledTableWrapperProps>`
  position: relative;
  flex: none;
  overflow: auto;
  border-radius: ${(p) => p.theme.radii.xl};
  background-color: ${(p) => p.theme.colors.light};

  ${(p) =>
    !p.hasHeader &&
    !p.hasFooter &&
    css`
      box-shadow: ${p.theme.shadows.base};
    `}

  ${width};
  ${textAlign};
`;

export type TableWrapperProps = WidthProps & {
  hasHeader: boolean;
  hasFooter: boolean;
};

export const TableWrapper = styled.div<TableWrapperProps>`
  flex: none;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radii.xl};
  background-color: ${(p) => p.theme.colors.light};
  box-shadow: ${(p) => p.theme.shadows.base};

  /* stylelint-disable-next-line no-descending-specificity */
  & ${StyledTableWrapper} {
    width: 100%;
    border-radius: 0;

    ${(p) =>
      p.hasHeader &&
      css`
        border-top: ${p.theme.borders.base} ${p.theme.colors.gray300};
      `}

    ${(p) =>
      p.hasFooter &&
      css`
        border-bottom: ${p.theme.borders.base} ${p.theme.colors.gray300};
      `}
  }

  ${width};
`;
