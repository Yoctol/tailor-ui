import React, { ComponentClass, SFC } from 'react';
import styled, { css } from 'styled-components';
import { SpaceProps, style, space as styledSpace } from 'styled-system';

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

export type IconWrapperProps = SpaceProps & {
  cursor?: string;
  size?: Size;
  fill?: string;
};

export const IconWrapper = styled<IconWrapperProps, 'i'>('i')`
  display: inline-flex;
  line-height: 1;
  cursor: ${p => p.cursor};

  svg {
    vertical-align: middle;

    ${p => p.theme.transition /* sc-declaration */};
    ${styledFill};
    ${styledSize};
  }

  ${styledSpace};
`;

export type IconType = string | ComponentClass;

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
  fill = 'gray.2',
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
    <IconWrapper cursor={cursor} size={size} fill={fill} {...otherProps}>
      <IconComponent />
    </IconWrapper>
  );
};

export default Icon;
