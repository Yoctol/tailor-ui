import React, { SFC } from 'react';
import { IconType as ReactIconsIconType } from 'react-icons';
import { SpaceProps, style, space as styledSpace } from 'styled-system';

import styled, { css } from 'utils/styled-components';
import tag from 'utils/CleanTag';
import { ICssProps, styledCss } from 'utils/css';

import * as icons from './icons';

interface Icons {
  [key: string]: any;
}

const styledFill = style({
  prop: 'fill',
  cssProperty: 'fill',
  key: 'colors',
});

type Size = string | number;

const styledSize = css<{ size: Size }>`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
`;

export type IconWrapperProps = SpaceProps &
  ICssProps & {
    cursor?: string;
    size?: Size;
    fill?: string;
  };

export const IconWrapper = styled<IconWrapperProps, 'i'>(tag.i)`
  display: inline-flex;
  line-height: 1;
  cursor: ${p => p.cursor};

  svg {
    fill: ${p => p.theme.colors.primary};
    vertical-align: middle;
    ${p => p.theme.transition /* sc-declaration */};
  }

  &&& svg {
    ${styledFill};
    ${styledSize};
  }

  ${styledSpace};
  ${styledCss};
`;

export type IconType = string | ReactIconsIconType;

export type IconProps = SpaceProps & {
  cursor?: string;
  size?: Size;
  fill?: string;
  type: IconType;
  [key: string]: any;
};

const Icon: SFC<IconProps> = ({
  type,
  cursor = 'default',
  size = 24,
  ...otherProps
}) => {
  let IconComponent = type;

  if (typeof type === 'string') {
    const BuiltInIcon = (icons as Icons)[type];

    if (!BuiltInIcon) {
      throw new Error('Built-in icon does not exists!');
    }

    IconComponent = BuiltInIcon;
  }

  return (
    <IconWrapper cursor={cursor} size={size} {...otherProps}>
      <IconComponent />
    </IconWrapper>
  );
};

export default Icon;
