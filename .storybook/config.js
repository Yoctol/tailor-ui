import { configure } from '@storybook/react';
import injectGlobalCss from '../src/injectGlobalCss';

injectGlobalCss();

const req = require.context('../src', true, /.story.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
