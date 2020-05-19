import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import {
  ColorProps,
  SpaceProps,
  TypographyProps,
  space,
  color as styledColor,
  typography,
} from 'styled-system';

type StyledDividerProps = SpaceProps &
  ColorProps &
  TypographyProps & {
    type: 'horizontal' | 'vertical';
    orientation?: 'left' | 'right';
    dashed?: boolean;
    withText: boolean;
  };

const StyledInnerText = styled.span`
  display: inline-block;
  padding: 0 ${(p) => p.theme.space[3]};
`;

const StyledDivider = styled.div<StyledDividerProps>`
  background-color: ${(p) => p.theme.colors.gray300};

  ${(p) => {
    if (p.type === 'vertical') {
      return css`
        display: inline-block;
        position: relative;
        top: -0.06em;
        width: 1px;
        height: 0.9em;
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
        background-color: transparent;
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

  ${(p) =>
    p.dashed &&
    css`
      border-top: ${p.theme.borders.dashed};
      border-color: ${p.theme.colors.gray300};
      background-color: transparent;
    `}

    ${space};
    ${styledColor};
    ${typography};
`;

export type DividerProps = SpaceProps &
  ColorProps &
  TypographyProps & {
    type?: 'horizontal' | 'vertical';
    orientation?: 'left' | 'right';
    dashed?: boolean;
  };

const Divider: FC<DividerProps> = ({
  type = 'horizontal',
  orientation,
  dashed,
  children,
  color = 'gray400',
  fontSize = 'sm',
  fontWeight = 500,
  ...props
}) => (
  <StyledDivider
    type={type}
    orientation={orientation}
    dashed={dashed}
    withText={!!children}
    my={type === 'horizontal' ? 2 : 0}
    mx={type === 'vertical' ? 2 : 0}
    color={color as string}
    fontSize={fontSize}
    fontWeight={fontWeight}
    {...props}
  >
    {children && <StyledInnerText>{children}</StyledInnerText>}
  </StyledDivider>
);

export { Divider };
