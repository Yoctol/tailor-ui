import analytics from './analytics';
import danger from './danger';
import info from './info';
import kurator from './kurator';
import line from './line';
import messenger from './messenger';
import robot from './robot';
import settings from './settings';
import success from './success';
import tags from './tags';
import touch from './touch';
import tutorial from './tutorial';
import understood from './understood';
import warning from './warning';

export type BuiltInIconKeys =
  | 'line'
  | 'messenger'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'error'
  | 'robot'
  | 'understood'
  | 'kurator'
  | 'touch'
  | 'analytics'
  | 'tags'
  | 'tutorial'
  | 'settings';

export const icons = {
  line,
  messenger,
  info,
  success,
  warning,
  danger,
  error: danger,
  robot,
  understood,
  kurator,
  touch,
  analytics,
  tags,
  settings,
  tutorial,
};
