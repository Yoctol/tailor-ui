import React from 'react';
import { storiesOf } from '@storybook/react';
import { range } from 'ramda';
import { compose, withState, withHandlers } from 'recompose';

import themeProvider from '../../../.storybook/theme-provider';

import Menu from '..';

import Icon from '../../Icon';

const activeEnhancer = compose(
  withState('active', 'setActive', 1),
  withHandlers({
    updateActive: ({ setActive }) => current => () =>
      setActive(active => (current === active ? null : current)),
  })
);

const WithActive = activeEnhancer(({ active, updateActive, children }) => (
  <div style={{ height: 600 }}>{children({ active, updateActive })}</div>
));

storiesOf('Navigation|Menu', module)
  .addDecorator(themeProvider)
  .add('default', () => (
    <WithActive>
      {({ active, updateActive }) => (
        <Menu>
          {range(1, 10).map(key => (
            <Menu.Item active={key === active} onClick={updateActive(key)}>
              Menu {key}
            </Menu.Item>
          ))}
        </Menu>
      )}
    </WithActive>
  ))
  .add('with group', () => (
    <WithActive>
      {({ active, updateActive }) => (
        <Menu>
          {range(1, 6).map(key => (
            <Menu.SubMenu
              title={
                <span>
                  <Icon type="kurator" />Group {key}
                </span>
              }
              onClick={updateActive(key)}
              active={active === key}
            >
              <Menu.Item>Group Item 1</Menu.Item>
              <Menu.Item>Group Item 2</Menu.Item>
              <Menu.Item>Group Item 3</Menu.Item>
              <Menu.Item>Group Item 4</Menu.Item>
            </Menu.SubMenu>
          ))}
        </Menu>
      )}
    </WithActive>
  ));
