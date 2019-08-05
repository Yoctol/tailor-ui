import React, { CSSProperties, FC } from 'react';

import { RangeValue, Value } from './utils';
import {
  StyledDotContainer,
  StyledSliderDot,
  StyledSliderDotNumber,
} from './styles';

export interface DotProps {
  active: boolean;
  value: Value;
  style: CSSProperties;
}

const Dot: FC<DotProps> = ({ active, value, style }) => {
  return (
    <StyledDotContainer style={style} active={active}>
      <StyledSliderDot />
      <StyledSliderDotNumber>{value}</StyledSliderDotNumber>
    </StyledDotContainer>
  );
};

export interface SliderDotProps {
  active: boolean;
  changedValue?: number;
  denominator: number;
  min: number;
  valuePercentage: string;
  range: boolean;
  value: Value;
}

const SliderDot: FC<SliderDotProps> = ({
  range,
  value,
  active,
  changedValue,
  denominator,
  min,
  valuePercentage,
}) => {
  if (!range) {
    return (
      <Dot
        active={active}
        value={value as number}
        style={{
          left: valuePercentage,
        }}
      />
    );
  }

  return (
    <>
      <Dot
        active={active && (value as RangeValue)[0] === changedValue}
        value={(value as RangeValue)[0]}
        style={{
          left: `${(((value as RangeValue)[0] - min) / denominator) * 100}%`,
        }}
      />
      <Dot
        active={active && (value as RangeValue)[1] === changedValue}
        value={(value as RangeValue)[1]}
        style={{
          left: `${(((value as RangeValue)[1] - min) / denominator) * 100}%`,
        }}
      />
    </>
  );
};

export default SliderDot;
