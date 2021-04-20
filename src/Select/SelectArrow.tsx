import React, { FC } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { animated, config, to, useSpring } from '@react-spring/web';

import { Icon } from '../Icon';

const SelectArrow: FC<{ on: boolean }> = ({ on }) => {
  const { deg } = useSpring({
    deg: on ? 0 : 180,
    config: config.stiff,
  });

  return (
    <animated.i
      style={{
        transform: to(deg, (d) => `rotate(${d}deg)`),
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
