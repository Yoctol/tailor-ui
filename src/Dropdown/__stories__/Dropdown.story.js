import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import Button from '../../Button';
import README from '../README.md';
import themeProvider from '../../../.storybook/theme-provider';
import { Heading } from '../..';
import { Showcase, ShowcasePage } from '../../../.storybook/showcase';
import {
  withComponentReadme,
  withComponentShowcase,
} from '../../../.storybook/withDocs';

import Dropdown from '..';

const placements = {
  bottomLeft: 'Bottom Left (Default)',
  bottomRight: 'Bottom Right',
  topLeft: 'Top Left',
  topRight: 'Top Right',
};

storiesOf('Navigation|Dropdown', module)
  .addDecorator(themeProvider)
  .addDecorator(withKnobs)
  .add(
    'Docs',
    withComponentReadme(README, () => (
      <Showcase>
        <Dropdown
          placement={select('placement', placements, 'bottomLeft', 'props')}
          overlay={
            <Dropdown.List>
              <Dropdown.Item key="Item 1">Item 1</Dropdown.Item>
              <Dropdown.Item key="Item 2">Item 2</Dropdown.Item>
              <Dropdown.Item key="Item 3">Item 3</Dropdown.Item>
              <Dropdown.Item key="Item 4">Item 4</Dropdown.Item>
            </Dropdown.List>
          }
        >
          {({ visible, toggle }) => (
            <Button light={visible} onClick={toggle}>
              Toggle
            </Button>
          )}
        </Dropdown>
      </Showcase>
    ))
  )
  .add(
    'Showcase',
    withComponentShowcase(() => (
      <ShowcasePage title="Dropdown Showcase">
        <Heading.h3>Dropdown with placement bottomLeft</Heading.h3>
        <Showcase>
          <Dropdown
            placement="bottomLeft"
            overlay={
              <Dropdown.List>
                <Dropdown.Item key="Item 1">Item 1</Dropdown.Item>
                <Dropdown.Item key="Item 2">Item 2</Dropdown.Item>
                <Dropdown.Item key="Item 3">Item 3</Dropdown.Item>
                <Dropdown.Item key="Item 4">Item 4</Dropdown.Item>
              </Dropdown.List>
            }
          >
            {({ visible, toggle }) => (
              <Button light={visible} onClick={toggle}>
                Toggle
              </Button>
            )}
          </Dropdown>
        </Showcase>

        <Heading.h3>Dropdown with placement bottomRight</Heading.h3>
        <Showcase>
          <Dropdown
            placement="bottomRight"
            overlay={
              <Dropdown.List>
                <Dropdown.Item key="Item 1">Item 1</Dropdown.Item>
                <Dropdown.Item key="Item 2">Item 2</Dropdown.Item>
                <Dropdown.Item key="Item 3">Item 3</Dropdown.Item>
                <Dropdown.Item key="Item 4">Item 4</Dropdown.Item>
              </Dropdown.List>
            }
          >
            {({ visible, toggle }) => (
              <Button light={visible} onClick={toggle}>
                Toggle
              </Button>
            )}
          </Dropdown>
        </Showcase>

        <Heading.h3>Dropdown with placement topLeft</Heading.h3>
        <Showcase>
          <Dropdown
            placement="topLeft"
            overlay={
              <Dropdown.List>
                <Dropdown.Item key="Item 1">Item 1</Dropdown.Item>
                <Dropdown.Item key="Item 2">Item 2</Dropdown.Item>
                <Dropdown.Item key="Item 3">Item 3</Dropdown.Item>
                <Dropdown.Item key="Item 4">Item 4</Dropdown.Item>
              </Dropdown.List>
            }
          >
            {({ visible, toggle }) => (
              <Button light={visible} onClick={toggle}>
                Toggle
              </Button>
            )}
          </Dropdown>
        </Showcase>

        <Heading.h3>Dropdown with placement topRight</Heading.h3>
        <Showcase>
          <Dropdown
            placement="topRight"
            overlay={
              <Dropdown.List>
                <Dropdown.Item key="Item 1">Item 1</Dropdown.Item>
                <Dropdown.Item key="Item 2">Item 2</Dropdown.Item>
                <Dropdown.Item key="Item 3">Item 3</Dropdown.Item>
                <Dropdown.Item key="Item 4">Item 4</Dropdown.Item>
              </Dropdown.List>
            }
          >
            {({ visible, toggle }) => (
              <Button light={visible} onClick={toggle}>
                Toggle
              </Button>
            )}
          </Dropdown>
        </Showcase>
      </ShowcasePage>
    ))
  );
