import 'styled-components';

import { ThemeType } from '../packages/tailor-ui/src/theme';

declare module 'styled-components' {
  // tslint:disable-next-line
  export interface DefaultTheme extends ThemeType {}
}
