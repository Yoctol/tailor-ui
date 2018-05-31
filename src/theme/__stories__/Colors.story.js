import React from 'react';
import { storiesOf } from '@storybook/react';

import { Flex, Box } from '../../';
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
      <Color
        bg={colors.secondaryGreen.secondary}
        title="Secondary Green"
        color="#0E0C1A"
      />
      <Color
        bg={colors.secondaryGreen.secondaryDark}
        title="Secondary Green Dark"
      />
      <Color
        bg={colors.secondaryGreen.secondaryLight}
        title="Secondary Green Light"
        color="#0E0C1A"
      />
    </Flex>
    <Flex>
      <Color bg={colors.secondaryBlue.secondary} title="Secondary Blue" />
      <Color
        bg={colors.secondaryBlue.secondaryDark}
        title="Secondary Blue Dark"
      />
      <Color
        bg={colors.secondaryBlue.secondaryLight}
        title="Secondary Blue Light"
        color="#0E0C1A"
      />
    </Flex>
    <Flex>
      <Color bg={colors.success} title="Success" />
      <Color bg={colors.warning} title="Warning" />
      <Color bg={colors.error} title="Error" />
    </Flex>
    <Flex>
      <Color bg={colors.dark} title="Dark" />
      <Color bg={colors.light} title="Light" color="#0E0C1A" />
    </Flex>
    <Flex>
      <Color bg={colors.border} title="Border" color="#0E0C1A" />
      <Color bg={colors.borderDark} title="Border Dark" color="#0E0C1A" />
    </Flex>
    <Flex>
      <Color bg={colors.bg} title="Background" color="#0E0C1A" />
      <Color bg={colors.bgDark} title="Background Dark" color="#0E0C1A" />
      <Color bg={colors.bgLight} title="Background Light" color="#0E0C1A" />
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
