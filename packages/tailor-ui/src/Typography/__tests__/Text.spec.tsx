import React from 'react';

import { render } from 'test/test-utils';

import { Text } from '../Text';

describe('Text', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Text
        color="primaryDark"
        letterSpacing={1.5}
        lineHeight="2"
        textAlign="center"
        fontSize="lg"
      >
        Some Text
      </Text>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
