/* eslint-disable */
import React, { useState, useCallback } from 'react';
import { Flex, Heading, Tooltip } from 'tailor-ui';
import { theme } from '@tailor-ui/theme';
import { readableColor, darken, lighten } from 'polished';
import styled from 'styled-components';

const { colors: themeColors } = theme;

const StyledHeading = styled(Heading.h5)`
  border-bottom: 1px dotted ${p => p.color};
  cursor: pointer;

  &:hover {
    color: ${p => p.changeColor(0.3, p.color)};
  }

  ${p => p.theme.transition};
`;

const CopyText = ({ color, children }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = useCallback(
    e => {
      navigator.clipboard.writeText(e.target.textContent);

      if (!copySuccess) {
        setCopySuccess(true);
      }

      setTimeout(() => setCopySuccess(false), 500);
    },
    [copySuccess]
  );

  return (
    <Tooltip content="Copied!" visible={copySuccess}>
      <StyledHeading
        color={color}
        changeColor={color === '#fff' ? darken : lighten}
        onClick={copyToClipboard}
      >
        {children}
      </StyledHeading>
    </Tooltip>
  );
};

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
      <CopyText color={fontColor}>{colorKey}</CopyText>
      <CopyText color={fontColor}>{color}</CopyText>
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
