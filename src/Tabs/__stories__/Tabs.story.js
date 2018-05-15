import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { withState } from 'recompose';
import { range } from 'lodash';

import Tabs from '../';

const { Tab } = Tabs;

const TABS = range(1, 4).map(val => ({
  key: `tab_${val}`,
  text: `Tab ${val}`,
}));

const withActiveTab = withState('activeTab', 'setActiveTab', 'tab_1');

const TabWithActive = withActiveTab(
  ({ activeTab, setActiveTab, pills, disabled, ...props }) => (
    <div
      style={{
        width: 600,
        padding: 20,
        ...(pills
          ? {}
          : {
              position: 'relative',
              borderBottom: '3px solid #e9e9e9',
            }),
      }}
    >
      <Tabs pills={pills} {...props}>
        {TABS.map(({ key, text }) => (
          <Tab
            active={key === activeTab}
            disabled={disabled === key}
            onClick={() => setActiveTab(key)}
          >
            {text}
          </Tab>
        ))}
      </Tabs>
      <p>Active Tab is {activeTab}</p>
    </div>
  )
);

storiesOf('Tabs', module)
  .addDecorator(centered)
  .add('default', () => <TabWithActive />)
  .add('default with disabled', () => <TabWithActive disabled="tab_2" />)
  .add('default with size', () => (
    <div>
      <TabWithActive size="sm" />
      <TabWithActive size="m" />
      <TabWithActive size="lg" />
    </div>
  ))
  .add('pills', () => <TabWithActive pills />)
  .add('pills with disabled', () => <TabWithActive pills disabled="tab_2" />)
  .add('pills with size', () => (
    <div>
      <TabWithActive pills size="sm" />
      <TabWithActive pills size="m" />
      <TabWithActive pills size="lg" />
    </div>
  ))
  .add('pills with block', () => <TabWithActive pills block />);
