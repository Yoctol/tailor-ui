/* eslint-disable */
import React from 'react';
import { Flex, Heading } from 'tailor-ui';
import { theme } from '@tailor-ui/theme';
import { readableColor } from 'polished';

const { colors: themeColors } = theme;

const Color = ({ colorKey, width }) => {
  const color = themeColors[colorKey];
  const fontColor = readableColor(color);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      width={width}
      p="3"
      mx="2"
      bg={colorKey}
    >
      <Heading.h5 color={fontColor}>{colorKey}</Heading.h5>
      <Heading.h4 color={fontColor}>{color}</Heading.h4>
    </Flex>
  );
};

const Colors = ({ colors }) => (
  <Flex mb={4}>
    {colors.map(color => (
      <Color key={color} colorKey={color} width={1 / colors.length} />
    ))}
  </Flex>
);

export default Colors;
