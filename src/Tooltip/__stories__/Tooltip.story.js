import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import { Flex, Box } from '../../';
import themeProvider from '../../../.storybook/theme-provider';
import Tooltip from '../';
import Button from '../../Button';

storiesOf('Data Display|Tooltip', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('with dark version', () => (
    <Flex flexDirection="column" alignItems="center">
      <Box m={3}>
        <Tooltip placement="top" content={<span>Tooltip Content</span>}>
          <span>Hover top</span>
        </Tooltip>
      </Box>
      <Box m={3}>
        <Tooltip placement="right" content={<span>Tooltip Content</span>}>
          <span>Hover right</span>
        </Tooltip>
      </Box>
      <Box m={3}>
        <Tooltip
          trigger="click"
          placement="left"
          content={<span>Tooltip Content</span>}
        >
          <Button>Click left</Button>
        </Tooltip>
      </Box>
      <Box m={3}>
        <Tooltip
          trigger="click"
          placement="bottom"
          content={<span>Tooltip Content</span>}
        >
          <Button>Click bottom</Button>
        </Tooltip>
      </Box>
    </Flex>
  ))
  .add('with light version', () => (
    <Flex flexDirection="column" alignItems="center">
      <Box m={3}>
        <Tooltip light placement="top" content={<span>Tooltip Content</span>}>
          <span>Hover top</span>
        </Tooltip>
      </Box>
      <Box m={3}>
        <Tooltip light placement="right" content={<span>Tooltip Content</span>}>
          <span>Hover right</span>
        </Tooltip>
      </Box>
      <Box m={3}>
        <Tooltip
          light
          trigger="click"
          placement="left"
          content={<span>Tooltip Content</span>}
        >
          <Button>Click left</Button>
        </Tooltip>
      </Box>
      <Box m={3}>
        <Tooltip
          light
          trigger="click"
          placement="bottom"
          content={<span>Tooltip Content</span>}
        >
          <Button>Click bottom</Button>
        </Tooltip>
      </Box>
    </Flex>
  ));
