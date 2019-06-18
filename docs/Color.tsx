/* eslint-disable */
import React from 'react';
import { Flex, Heading } from '../packages/tailor-ui/src';
import { theme } from '../packages/tailor-ui-theme/src';
import { readableColor } from 'polished';

const { colors: themeColors } = theme;

type ColorKeys = keyof typeof themeColors;

const Color = ({
  colorKey,
  width,
}: {
  colorKey: ColorKeys;
  width: string | number;
}) => {
  const color = themeColors[colorKey];
  const fontColor = readableColor(color as string);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      width={width}
      p="4"
      mx="2"
      bg={colorKey}
    >
      <Heading.h5 color={fontColor}>{colorKey}</Heading.h5>
      <Heading.h4 color={fontColor}>{color}</Heading.h4>
    </Flex>
  );
};

const Colors = ({ colors }: { colors: ColorKeys[] }) => (
  <Flex mb="6">
    {colors.map(color => (
      <Color key={color} colorKey={color} width={1 / colors.length} />
    ))}
  </Flex>
);

export default Colors;
