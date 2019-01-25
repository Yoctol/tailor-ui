import 'styled-components';

import { ThemeType } from '../src/theme';

declare module 'styled-components' {
  // tslint:disable-next-line
  export interface DefaultTheme extends ThemeType {}
}
