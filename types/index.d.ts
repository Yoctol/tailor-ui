import 'styled-components';
import { ThemeType } from '../packages/tailor-ui-theme/src';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
