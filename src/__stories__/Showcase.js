import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from '../';

const Showcase = ({ children, bg }) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    border="1px dashed rgb(229, 229, 229)"
    my="16px"
    px="50px"
    py="35px"
    bg={bg}
  >
    {children}
  </Flex>
);

Showcase.propTypes = {
  bg: PropTypes.string,
  children: PropTypes.node,
};

Showcase.defaultProps = {
  children: '',
  bg: 'light',
};

export default Showcase;
