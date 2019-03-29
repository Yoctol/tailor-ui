import 'styled-components';
import { ThemeType } from '../packages/tailor-ui/src/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
