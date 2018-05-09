import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { Flex, Box } from 'grid-styled';
import { withState } from 'recompose';

import Tooltip from '../';
import Button from '../../Button';

const withVisible = withState('visible', 'setVisible', true);

const ToggleTooltip = withVisible(
  ({ visible, setVisible, placement, ...props }) => (
    <Tooltip visible={visible} placement={placement} {...props}>
      <Button onClick={() => setVisible(current => !current)}>
        {`Toggle ${placement}`}
      </Button>
    </Tooltip>
  )
);

storiesOf('Tooltip', module)
  .addDecorator(centered)
  .add('with dark version', () => (
    <Flex flexDirection="column" alignItems="center">
      <Box m={3}>
        <ToggleTooltip placement="top" content={<span>Tooltip Content</span>} />
      </Box>
      <Box m={3}>
        <ToggleTooltip
          placement="right"
          content={<span>Tooltip Content</span>}
        />
      </Box>
      <Box m={3}>
        <ToggleTooltip
          placement="left"
          content={<span>Tooltip Content</span>}
        />
      </Box>
      <Box m={3}>
        <ToggleTooltip
          placement="bottom"
          content={<span>Tooltip Content</span>}
        />
      </Box>
    </Flex>
  ))
  .add('with light version', () => (
    <Flex flexDirection="column" alignItems="center">
      <Box m={3}>
        <ToggleTooltip
          dark={false}
          placement="top"
          content={<span>Tooltip Content</span>}
        />
      </Box>
      <Box m={3}>
        <ToggleTooltip
          dark={false}
          placement="right"
          content={<span>Tooltip Content</span>}
        />
      </Box>
      <Box m={3}>
        <ToggleTooltip
          dark={false}
          placement="left"
          content={<span>Tooltip Content</span>}
        />
      </Box>
      <Box m={3}>
        <ToggleTooltip
          dark={false}
          placement="bottom"
          content={<span>Tooltip Content</span>}
        />
      </Box>
    </Flex>
  ))
  .add('with complex content', () => (
    <ToggleTooltip
      dark={false}
      placement="left"
      content={
        <ToggleTooltip
          dark
          placement="bottom"
          content={
            <ToggleTooltip
              dark={false}
              placement="right"
              content={
                <ToggleTooltip
                  dark
                  placement="right"
                  content={
                    <ToggleTooltip
                      dark={false}
                      placement="top"
                      content={<span>Tooltip Content</span>}
                    />
                  }
                />
              }
            />
          }
        />
      }
    />
  ));
