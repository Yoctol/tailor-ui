import React from 'react';
import { MdDelete } from 'react-icons/md';

import { fireEvent, render } from 'test/test-utils';

import Button from '..';

describe('Button', () => {
  it('should render correctly', () => {
    const { container } = render(<Button>Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render text button', () => {
    const { container } = render(<Button text>Text Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render different button type', () => {
    const { container } = render(<Button type="info">Text Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render rounded button', () => {
    const { container } = render(<Button rounded>Text Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render outlined button', () => {
    const { container } = render(<Button outlined>Text Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render loading button', () => {
    const { container } = render(<Button loading>Text Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render disabled button', () => {
    const { container } = render(<Button disabled>Text Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render block button', () => {
    const { container } = render(<Button block>Text Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render button with specified icon', () => {
    const { container } = render(
      <Button type="danger" icon={MdDelete}>
        Delete
      </Button>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render button with specified size', () => {
    const { container } = render(<Button size="sm">Text Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call onClick when button is clicked', () => {
    const onClick = jest.fn();

    const { getByText } = render(
      <Button onClick={onClick}>Text Button</Button>
    );

    const button = getByText('Text Button');

    fireEvent.click(button);

    expect(onClick).toBeCalled();
  });
});
