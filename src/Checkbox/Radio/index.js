import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { themeGet } from 'styled-system';
import { ifProp, switchProp } from 'styled-tools';

import theme from '../../theme';

const getCheckmarkSpace = size => css`
  width: calc(${themeGet(size)} * 1.5);
  height: calc(${themeGet(size)} * 1.5);
`;

const Checkmark = styled.span`
  height: 0;
  margin-right: 0.25rem;
  border: 1px solid
    ${ifProp('disabled', themeGet('colors.border'), themeGet('colors.primary'))};
  border-radius: 50%;
  background-color: #fff;
  cursor: ${ifProp('disabled', 'default', 'pointer')};

  &::after {
    content: '';
    display: none;
    position: absolute;
    border-radius: 50%;
    background: ${themeGet('colors.primary')};
    transform: translate(-50%, -50%);

    ${switchProp('size', {
      sm: getCheckmarkSpace('space.paddingXSm'),
      m: getCheckmarkSpace('space.paddingX'),
      lg: getCheckmarkSpace('space.paddingXLg'),
    })};
  }

  ${switchProp('size', {
    sm: css`
      padding: ${themeGet('space.paddingXSm')} ${themeGet('space.paddingXSm')};
    `,
    m: css`
      padding: ${themeGet('space.paddingX')} ${themeGet('space.paddingX')};
    `,
    lg: css`
      padding: ${themeGet('space.paddingXLg')} ${themeGet('space.paddingXLg')};
    `,
  })};
`;

Checkmark.propTypes = {
  size: PropTypes.oneOf(['sm', 'm', 'lg']).isRequired,
};

Checkmark.defaultProps = {
  theme,
};

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;

    &:checked {
      /* stylelint-disable-next-line */
      & ~ ${Checkmark}::after {
        display: block;
      }
    }
  }
`;

const Radio = ({ disabled, size, ...props }) => (
  <Container>
    <input type="radio" disabled={disabled} {...props} />
    <Checkmark size={size} disabled={disabled} />
  </Container>
);

Radio.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'm', 'lg']),
};

Radio.defaultProps = {
  disabled: false,
  name: 'radio',
  size: 'm',
};

export default Radio;
