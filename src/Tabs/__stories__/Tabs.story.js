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

const TabWithActive = withActiveTab(({ activeTab, setActiveTab, ...props }) => (
  <div style={{ width: 400, padding: 20 }}>
    <Tabs {...props}>
      {TABS.map(({ key, text }) => (
        <Tab active={key === activeTab} onClick={() => setActiveTab(key)}>
          {text}
        </Tab>
      ))}
    </Tabs>
    <p>Active Tab is {activeTab}</p>
  </div>
));

storiesOf('Tabs', module)
  .addDecorator(centered)
  .add('default', () => <TabWithActive />)
  .add('default with block', () => <TabWithActive block />)
  .add('pills', () => <TabWithActive pills />)
  .add('pills with block', () => <TabWithActive pills block />);
