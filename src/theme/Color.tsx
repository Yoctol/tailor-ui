import React from 'react';
import { readableColor } from 'polished';

import { Flex } from '..';

import * as themeColors from './colors';

const get = (colorKey: string) => {
  const path = colorKey.split('.');

  return path.length === 2
    ? (themeColors as any)[path[0]][path[1]]
    : (themeColors as any)[path[0]];
};

const upperFirst = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const Color = ({
  colorKey,
  width,
}: {
  colorKey: string;
  width: string | number;
}) => {
  const color = get(colorKey);
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width={width}
      p={4}
      mx={2}
      bg={colorKey}
      color={readableColor(color)}
    >
      <div>{upperFirst(colorKey)}</div>
      <div>{color}</div>
    </Flex>
  );
};

const Colors = ({ colors }: { colors: string[] }) => (
  <Flex mb={4}>
    {colors.map(color => (
      <Color key={color} colorKey={color} width={1 / colors.length} />
    ))}
  </Flex>
);

export default Colors;
