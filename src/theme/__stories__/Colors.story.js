import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Flex } from '../..';
import * as colors from '../colors';

// eslint-disable-next-line react/prop-types
const Color = ({ bg, title, color = '#fff' }) => (
  <Box width={1 / 4} p={2}>
    <div style={{ backgroundColor: bg, color, padding: '.5rem' }}>
      <div>{bg}</div>
      <div style={{ fontSize: '.7rem', opacity: 0.75 }}>{title}</div>
    </div>
  </Box>
);

storiesOf('Other|Colors', module).add('colors', () => (
  <div style={{ width: 800 }}>
    <Flex>
      <Color bg={colors.primary} title="Primary" />
      <Color bg={colors.primaryDark} title="Primary Dark" />
      <Color bg={colors.primaryLight} title="Primary Light" />
    </Flex>
    <Flex>
      <Color bg={colors.secondary} title="Secondary " color="#0E0C1A" />
      <Color bg={colors.secondaryDark} title="Secondary Dark" />
      <Color
        bg={colors.secondaryLight}
        title="Secondary Light"
        color="#0E0C1A"
      />
    </Flex>
    <Flex>
      <Color bg={colors.info} title="Info" />
      <Color bg={colors.success} title="Success" />
      <Color bg={colors.warning} title="Warning" />
      <Color bg={colors.error} title="Error" />
    </Flex>
    <Flex>
      <Color bg={colors.dark} title="Dark" />
      <Color bg={colors.light} title="Light" color="#0E0C1A" />
    </Flex>
    <Flex flexWrap="wrap">
      {colors.gray.map((g, index) => (
        <Color
          key={g}
          bg={g}
          title={`Gray-${index}`}
          color={index >= 7 ? '#0E0C1A' : '#fff'}
        />
      ))}
    </Flex>
  </div>
));
