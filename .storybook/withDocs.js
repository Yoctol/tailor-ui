import { withDocs } from 'storybook-readme';
import { Space } from '../src';

export const withComponentReadme = withDocs({
  PreviewComponent: Space,
});

export const withComponentShowcase = fn => withComponentReadme('<!-- STORY -->', fn);
