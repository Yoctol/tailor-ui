import React, { FunctionComponent } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { animated, config, useSpring } from 'react-spring';

import { Icon } from 'tailor-ui';

const SelectArrow: FunctionComponent<{ on: boolean }> = ({ on }) => {
  const { deg } = useSpring({
    deg: on ? 0 : 180,
    config: config.stiff,
  });

  return (
    <animated.i
      style={{
        transform: deg.interpolate(d => `rotate(${d}deg)`),
        flex: 'none',
        pointerEvents: 'none',
        display: 'inline-flex',
      }}
    >
      <Icon type={MdKeyboardArrowUp} fill="gray400" />
    </animated.i>
  );
};

export default SelectArrow;
