import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import tag from 'utils/CleanTag';

interface IStyledDividerProps {
  type: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right';
  dashed?: boolean;
  withText: boolean;
}

const StyledInnerText = styled(tag.span)`
  display: inline-block;
  padding: 0 ${p => p.theme.space[3]};
`;

const StyledDivider = styled<IStyledDividerProps>(tag.div)`
  background-color: ${p => p.theme.colors.gray300};

  ${p => {
    if (p.type === 'vertical') {
      return css`
        display: inline-block;
        position: relative;
        top: -0.06em;
        width: 1px;
        height: 0.9em;
        margin: 0 8px;
        vertical-align: middle;

        ${p.withText &&
          css`
            border-top: 0;
            &::before,
            &::after {
              border-style: dashed none none;
            }
          `}
      `;
    }

    return css`
      display: block;
      width: 100%;
      min-width: 100%;
      height: 1px;
      margin: ${p.theme.space[3]} 0;
      clear: both;

      ${p.withText &&
        css`
          display: table;
          margin: 16px 0;
          background-color: transparent;
          color: ${p.theme.colors.primaryDark};
          font-size: ${p.theme.fontSizes.lg};
          font-weight: 500;
          text-align: center;
          white-space: nowrap;

          &::before,
          &::after {
            content: '';
            display: table-cell;
            position: relative;
            top: 50%;
            width: 50%;
            border-top: ${p.theme.borders.base};
            border-color: ${p.theme.colors.gray300};
            transform: translateY(50%);
          }

          ${p.orientation &&
            css`
              &::before {
                top: 50%;
                width: ${p.orientation === 'left' ? '5%' : '95%'};
              }

              &::after {
                top: 50%;
                width: ${p.orientation === 'left' ? '95%' : '5%'};
              }

              ${StyledInnerText} {
                display: inline-block;
                padding: 0 10px;
              }
            `}
        `}
    `;
  }}

  ${p =>
    p.dashed &&
    css`
      border-top: ${p.theme.borders.dashed};
      border-color: ${p.theme.colors.gray300};
      background-color: transparent;
    `}
`;

export interface IDividerProps {
  /**
   * direction type of divider
   */
  type?: 'horizontal' | 'vertical';
  /**
   * position of title inside divider
   */
  orientation?: 'left' | 'right';
  /**
   * 	whether line is dashed
   */
  dashed?: boolean;
}

const Divider: FunctionComponent<IDividerProps> = ({
  type = 'horizontal',
  orientation,
  dashed,
  children,
}) => (
  <StyledDivider
    type={type}
    orientation={orientation}
    dashed={dashed}
    withText={!!children}
  >
    {children && <StyledInnerText>{children}</StyledInnerText>}
  </StyledDivider>
);

export default Divider;
