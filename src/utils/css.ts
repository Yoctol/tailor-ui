import { InterpolationValue } from 'styled-components';

export interface ICssProps {
  css?: InterpolationValue;
}

export const styledCss = (p: ICssProps) => p.css;
