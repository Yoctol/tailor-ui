import React from 'react';
import userEvent from '@testing-library/user-event';
import { MdCheck, MdDelete } from 'react-icons/md';

import { render, screen } from 'test/test-utils';

import { Button } from '../Button';

describe('Button', () => {
  it('should render correctly', () => {
    const { container } = render(<Button>Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render different button type', () => {
    const { container } = render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="primary-invert">Primary Invert</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="danger-invert">Danger Invert</Button>
        <Button variant="regular">Regular</Button>
        <Button variant="normal">Normal</Button>
      </>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render rounded button', () => {
    const { container } = render(
      <>
        <Button variant="primary" rounded>
          Primary
        </Button>
        <Button variant="primary-invert" rounded>
          Primary Invert
        </Button>
        <Button variant="danger" rounded>
          Danger
        </Button>
        <Button variant="danger-invert" rounded>
          Danger Invert
        </Button>
        <Button variant="regular" rounded>
          Regular
        </Button>
        <Button variant="normal" rounded>
          Normal
        </Button>
      </>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render loading button', () => {
    const { container } = render(
      <>
        <Button variant="primary" loading>
          Primary
        </Button>
        <Button variant="primary-invert" loading>
          Primary Invert
        </Button>
        <Button variant="danger" loading>
          Danger
        </Button>
        <Button variant="danger-invert" loading>
          Danger Invert
        </Button>
        <Button variant="regular" loading>
          Regular
        </Button>
        <Button variant="normal" loading>
          Normal
        </Button>
      </>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render disabled button', () => {
    const { container } = render(
      <>
        <Button variant="primary" disabled>
          Primary
        </Button>
        <Button variant="primary-invert" disabled>
          Primary Invert
        </Button>
        <Button variant="danger" disabled>
          Danger
        </Button>
        <Button variant="danger-invert" disabled>
          Danger Invert
        </Button>
        <Button variant="regular" disabled>
          Regular
        </Button>
        <Button variant="normal" disabled>
          Normal
        </Button>
      </>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render width 100% button', () => {
    const { container } = render(<Button width="100%">Text Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render button with specified icon', () => {
    const { container } = render(
      <Button variant="danger" icon={MdDelete}>
        Delete
      </Button>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render rounded icon button', () => {
    const { container } = render(
      <>
        <Button icon={MdCheck} variant="primary" rounded />
        <Button icon={MdCheck} variant="primary-invert" rounded />
        <Button icon={MdCheck} variant="danger" rounded />
        <Button icon={MdCheck} variant="danger-invert" rounded />
        <Button icon={MdCheck} variant="regular" rounded />
        <Button icon={MdCheck} variant="normal" rounded />
      </>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render button with specified size', () => {
    const { container } = render(<Button size="sm">Text Button</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call onClick when button is clicked', () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Text Button</Button>);

    const button = screen.getByText('Text Button');

    userEvent.click(button);

    expect(onClick).toBeCalled();
  });
});
