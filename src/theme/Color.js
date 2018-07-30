import PropTypes from 'prop-types';
import React from 'react';
import { __, compose, path, split } from 'ramda';
import { readableColor } from 'polished';

import { Flex } from '..';

import * as themeColors from './colors';

const get = compose(
  path(__, themeColors),
  split('.')
);

const upperFirst = string => string.charAt(0).toUpperCase() + string.slice(1);

const Color = ({ colorKey, width }) => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    width={width}
    p={4}
    mx={2}
    bg={colorKey}
    color={readableColor(get(colorKey))}
  >
    <div>{upperFirst(colorKey)}</div>
    <div>{get(colorKey)}</div>
  </Flex>
);

Color.propTypes = {
  colorKey: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

const Colors = ({ colors }) => (
  <Flex mb={4}>
    {colors.map(color => (
      <Color key={color} colorKey={color} width={1 / colors.length} />
    ))}
  </Flex>
);

Colors.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Colors;
