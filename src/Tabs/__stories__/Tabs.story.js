import React from 'react';
import { storiesOf } from '@storybook/react';
import { Value } from 'react-powerplug';
import { range } from 'ramda';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

import themeProvider from '../../../.storybook/theme-provider';
import { space } from '../../../.storybook/knobs';
import {
  withComponentReadme,
  withComponentShowcase,
} from '../../../.storybook/withDocs';
import { Showcase, ShowcasePage } from '../../../.storybook/showcase';
import README from '../README.md';
import { Heading, Box } from '../../';
import Tabs from '../';

const TABS = range(1, 4).map(val => ({
  key: `tab_${val}`,
  label: `Tab ${val}`,
}));

const sizes = { sm: 'SM', m: 'M (Default)', lg: 'LG' };

storiesOf('Data Display|Tabs', module)
  .addDecorator(withKnobs)
  .addDecorator(themeProvider)
  .add(
    'Docs',
    withComponentReadme(README, () => (
      <Value initial="tab_1">
        {({ value, set }) => (
          <Showcase>
            <Box
              p={3}
              bg="gray.9"
              position="relative"
              height="120px"
              width="300px"
              borderBottom="3px solid"
              borderColor="primary"
            >
              <Tabs
                absolute={boolean('absolute', false, 'props')}
                block={boolean('block', false, 'props')}
                size={select('size', sizes, 'm', 'props')}
                {...space()}
              >
                {TABS.map(({ key, label }) => (
                  <Tabs.Tab active={key === value} onClick={() => set(key)}>
                    {label}
                  </Tabs.Tab>
                ))}
              </Tabs>
              <p>{`Active Tab is ${value}`}</p>
            </Box>
          </Showcase>
        )}
      </Value>
    ))
  )
  .add(
    'Showcase',
    withComponentShowcase(() => (
      <ShowcasePage title="Tabs Showcase">
        <Heading.h3>Basic</Heading.h3>
        <Value initial="tab_1">
          {({ value, set }) => (
            <Showcase>
              <Tabs>
                {TABS.map(({ key, label }) => (
                  <Tabs.Tab onClick={() => set(key)} active={key === value}>
                    {label}
                  </Tabs.Tab>
                ))}
              </Tabs>
              <p>{`Active Tab is ${value}`}</p>
            </Showcase>
          )}
        </Value>

        <Heading.h3>with absolute</Heading.h3>
        <Value initial="tab_1">
          {({ value, set }) => (
            <Showcase>
              <Box
                position="relative"
                height="120px"
                width="300px"
                borderBottom="3px solid #ddd"
              >
                <Tabs absolute>
                  {TABS.map(({ key, label }) => (
                    <Tabs.Tab onClick={() => set(key)} active={key === value}>
                      {label}
                    </Tabs.Tab>
                  ))}
                </Tabs>
              </Box>
              <p>{`Active Tab is ${value}`}</p>
            </Showcase>
          )}
        </Value>

        <Heading.h3>with disabled</Heading.h3>
        <Value initial="tab_1">
          {({ value, set }) => (
            <Showcase>
              <Tabs>
                {TABS.map(({ key, label }) => (
                  <Tabs.Tab
                    onClick={() => set(key)}
                    active={key === value}
                    disabled={key === 'tab_2'}
                  >
                    {label}
                  </Tabs.Tab>
                ))}
              </Tabs>
              <p>{`Active Tab is ${value}`}</p>
            </Showcase>
          )}
        </Value>

        <Heading.h3>with size</Heading.h3>
        <Value initial="tab_1">
          {({ value, set }) => (
            <Showcase>
              <Tabs size="sm">
                {TABS.map(({ key, label }) => (
                  <Tabs.Tab onClick={() => set(key)} active={key === value}>
                    {label}
                  </Tabs.Tab>
                ))}
              </Tabs>
              <Tabs>
                {TABS.map(({ key, label }) => (
                  <Tabs.Tab onClick={() => set(key)} active={key === value}>
                    {label}
                  </Tabs.Tab>
                ))}
              </Tabs>
              <Tabs size="lg">
                {TABS.map(({ key, label }) => (
                  <Tabs.Tab onClick={() => set(key)} active={key === value}>
                    {label}
                  </Tabs.Tab>
                ))}
              </Tabs>
              <p>{`Active Tab is ${value}`}</p>
            </Showcase>
          )}
        </Value>
      </ShowcasePage>
    ))
  );
