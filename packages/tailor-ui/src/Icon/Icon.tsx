import React, { FunctionComponent, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { IconType as ReactIconsIconType } from 'react-icons';
import { SpaceProps, style, space as styledSpace } from 'styled-system';

import tag from '../utils/CleanTag';

import { BuiltInIconKeys, icons } from './icons';

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
  pointerEvents?: string;
  size?: Size;
  fill?: string;
};

export const IconWrapper = styled(tag.i)<IconWrapperProps>`
  display: inline-flex;
  line-height: 1;
  cursor: ${p => p.cursor};
  pointer-events: ${p => p.pointerEvents};

  svg {
    fill: ${p => p.theme.colors.gray500};
    vertical-align: middle;
    ${p => p.theme.transition /* sc-declaration */};
  }

  &&& svg {
    ${styledFill};
    ${styledSize};
  }

  ${styledSpace};
`;

export type IconType = BuiltInIconKeys | ReactIconsIconType;

export type IconProps = HTMLAttributes<HTMLDivElement> &
  IconWrapperProps & {
    type: IconType;
  };

const Icon: FunctionComponent<IconProps> = ({
  type,
  cursor = 'default',
  size = 24,
  ...otherProps
}) => {
  let IconComponent: FunctionComponent;

  if (typeof type === 'string') {
    const BuiltInIcon = icons[type];

    if (!BuiltInIcon) {
      console.error('Built-in icon does not exists!');

      return null;
    }

    IconComponent = BuiltInIcon;
  } else {
    IconComponent = type;
  }

  return (
    <IconWrapper cursor={cursor} size={size} {...otherProps}>
      <IconComponent />
    </IconWrapper>
  );
};

export default Icon;
