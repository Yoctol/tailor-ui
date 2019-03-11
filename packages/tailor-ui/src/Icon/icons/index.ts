import analytics from './analytics';
import kurator from './kurator';
import line from './line';
import loading from './loading';
import messenger from './messenger';
import robot from './robot';
import settings from './settings';
import tags from './tags';
import touch from './touch';
import tutorial from './tutorial';
import understood from './understood';

export type BuiltInIconKeys =
  | 'line'
  | 'messenger'
  | 'robot'
  | 'understood'
  | 'kurator'
  | 'touch'
  | 'analytics'
  | 'tags'
  | 'tutorial'
  | 'settings'
  | 'loading';

export const icons = {
  line,
  messenger,
  robot,
  understood,
  kurator,
  touch,
  analytics,
  tags,
  settings,
  tutorial,
  loading,
};
