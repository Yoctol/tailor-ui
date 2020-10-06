import React from 'react';

import { render } from 'test/test-utils';

import { Steps } from '../Steps';

describe('Steps', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Steps current={1}>
        <Steps.Step title="Finished" description="This is a description" />
        <Steps.Step
          status="error"
          title="In Progress"
          description="This is a description"
        />
        <Steps.Step title="Waiting" description="This is a description" />
      </Steps>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
