import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'Yoctol UI',
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/,
  addonPanelInRight: true,
});

const req = require.context('../src', true, /.story.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
