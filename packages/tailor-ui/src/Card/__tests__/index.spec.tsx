import React from 'react';

import { fireEvent, render } from 'test/test-utils';

import Button from '../../Button';
import Card from '../Card';

describe('Card', () => {
  it('should render correctly with Card.Block', () => {
    const { container } = render(
      <Card width="400px">
        <Card.Block>Title</Card.Block>
        <Card.Block>Content</Card.Block>
        <Card.Block>Footer</Card.Block>
      </Card>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly with Button', () => {
    const { container } = render(
      <Card width="400px">
        <Card.Block>Title</Card.Block>
        <Card.Block>Content</Card.Block>
        <Card.Block p="1">
          <Button width="100%">With Button</Button>
        </Card.Block>
      </Card>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly with Card.Image', () => {
    const { container } = render(
      <Card width="400px">
        <Card.Image>
          <img src="https://via.placeholder.com/400x300" alt="placeholder" />
        </Card.Image>
        <Card.Block>Content</Card.Block>
      </Card>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render clickable Card', () => {
    const onClick = jest.fn();

    const { container } = render(
      <Card width="400px" onClick={onClick}>
        <Card.Block>Content</Card.Block>
      </Card>
    );

    fireEvent.click(container.firstChild as HTMLDivElement);

    expect(onClick).toBeCalled();
  });

  it('should call Card onClick when clicked item is not a button', () => {
    const onCardClick = jest.fn();

    const { getByText } = render(
      <Card width="400px" onClick={onCardClick}>
        <Card.Block>Title</Card.Block>
        <Card.Block>Content</Card.Block>
        <Card.Block p="1">
          <Button width="100%">With Button</Button>
        </Card.Block>
      </Card>
    );

    const title = getByText('Title');

    fireEvent.click(title);

    expect(onCardClick).toBeCalled();
  });

  it('should call Button onClick instead of Card onClick when button is clicked', () => {
    const onButtonClick = jest.fn();
    const onCardClick = jest.fn();

    const { getByText } = render(
      <Card width="400px" onClick={onCardClick}>
        <Card.Block>Title</Card.Block>
        <Card.Block>Content</Card.Block>
        <Card.Block p="1">
          <Button
            width="100%"
            onClick={(event: any) => {
              event.stopPropagation();
              onButtonClick();
            }}
          >
            With Button
          </Button>
        </Card.Block>
      </Card>
    );

    const button = getByText('With Button');

    fireEvent.click(button);

    expect(onButtonClick).toBeCalled();
    expect(onCardClick).not.toBeCalled();
  });

  it('should render hoverable Card', () => {
    const { container } = render(
      <Card width="400px" hoverable>
        <Card.Block>Content</Card.Block>
      </Card>
    );

    fireEvent.mouseEnter(container.firstChild as HTMLDivElement);

    expect(container.firstChild).toMatchSnapshot();
  });
});
