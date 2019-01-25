import analytics from './analytics';
import kurator from './kurator';
import line from './line';
import loading from './loading';
import messenger from './messenger';
import settings from './settings';
import tags from './tags';
import touch from './touch';
import understood from './understood';

export type BuiltInIconKeys =
  | 'line'
  | 'messenger'
  | 'understood'
  | 'kurator'
  | 'touch'
  | 'analytics'
  | 'tags'
  | 'settings'
  | 'loading';

export const icons = {
  line,
  messenger,
  understood,
  kurator,
  touch,
  analytics,
  tags,
  settings,
  loading,
};
