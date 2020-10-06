import React from 'react';

import { fireEvent, render } from 'test/test-utils';

import { Mention } from '../Mention';

it('should be defined', () => {
  expect(Mention).toBeDefined();
});

describe('Mention', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Mention
        defaultValue=""
        suggestions={[]}
        creatable
        highlightInvalid={false}
        formatCreateText={() => 'Press Enter'}
        onMentionCreate={() => {}}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should trigger onBlur from props when suggestions is visible and click outside mention', async () => {
    const onBlurFromProps = jest.fn();
    const onChangeFromProps = jest.fn();

    const MENTION_TEST_ID = 'my-mention';
    const OTHER_TEST_ID = 'your-dom';

    const { getByTestId } = render(
      <div>
        <Mention
          data-testid={MENTION_TEST_ID}
          defaultValue=""
          suggestions={['drink']}
          creatable
          highlightInvalid={false}
          formatCreateText={() => 'Press Enter'}
          onMentionCreate={() => {}}
          onBlur={onBlurFromProps}
          onChange={onChangeFromProps}
        />
        <div data-testid={OTHER_TEST_ID} />
      </div>
    );

    const mention = getByTestId(MENTION_TEST_ID);
    const other = getByTestId(OTHER_TEST_ID);

    fireEvent.focus(mention);
    fireEvent.change(mention, {
      target: {
        value: '{{',
        selectionStart: 2,
      },
    });

    fireEvent.click(other);

    expect(onChangeFromProps).toBeCalledWith('{{');
    expect(onBlurFromProps).toBeCalled();
  });
});
