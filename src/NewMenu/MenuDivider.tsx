import React from 'react';

import Box from '../Grid/Box';
import Flex from '../Grid/Flex';

const MenuDivider = () => (
  <Flex
    width="48px"
    height="48px"
    alignItems="center"
    justifyContent="center"
    bg="primaryDark"
  >
    <Box bg="light" width="2px" height="2px" />
  </Flex>
);

export default MenuDivider;
