import Close from 'react-icons/lib/md/close';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';

const CloseBtn = styled.button.attrs({
  type: 'button',
})`
  padding: 0;
  border: 0;
  background: transparent;
  transform: rotate(0deg);
  transition: all 0.2s ease-in;
  cursor: pointer;

  :focus {
    outline: 0;
  }

  :hover {
    transform: rotate(90deg);
  }
`;

const CloseButton = ({ handleClose }) => (
  <CloseBtn onClick={handleClose}>
    <Icon cursor="pointer" type={Close} />
  </CloseBtn>
);

CloseButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default CloseButton;
