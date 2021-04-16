import React from 'react';

import { render } from 'test/test-utils';

import { Button } from '../../Button';
import { Container } from '../Container';
import { Heading } from '../../Typography';
import { Table } from '../../Table';

describe('Container', () => {
  it('should render correctly', () => {
    const { container } = render(
      <div>
        <Container title="Title A">
          <Container.Section title="Subtitle #1">
            Subtitles are text derived from either a transcript or screenplay of
            the dialog or commentary in films.
          </Container.Section>
          <Container.Section title="Subtitle #2">
            Subtitles are text derived from either a transcript or screenplay of
            the dialog or commentary in films.
          </Container.Section>
        </Container>

        <Container title={<>Title B</>} subTitle={<>Sub Title B</>}>
          <Container.Section title="Subtitle #1">
            Subtitles are text derived from either a transcript or screenplay of
            the dialog or commentary in films.
          </Container.Section>
          <Container.Section title="Subtitle #2">
            Subtitles are text derived from either a transcript or screenplay of
            the dialog or commentary in films.
          </Container.Section>
        </Container>
      </div>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render without title correctly', () => {
    const { container } = render(
      <Container>The content of container</Container>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with table correctly', () => {
    const { container } = render(
      <Container>
        <Heading.H4>Text Here</Heading.H4>

        <Table>
          <Table.Head>
            <Table.HeadColumn>Name</Table.HeadColumn>
            <Table.HeadColumn>Platform</Table.HeadColumn>
            <Table.HeadColumn>People</Table.HeadColumn>
            <Table.HeadColumn>Ammount</Table.HeadColumn>
            <Table.HeadColumn>Action</Table.HeadColumn>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Column>Name</Table.Column>
              <Table.Column>Platform</Table.Column>
              <Table.Column>10,000</Table.Column>
              <Table.Column>NTD 1,000</Table.Column>
              <Table.Column>
                <Button variant="primary-invert">Action</Button>
              </Table.Column>
            </Table.Row>
          </Table.Body>
        </Table>

        <Button variant="regular">+ Button</Button>
      </Container>
    );

    expect(container).toMatchSnapshot();
  });
});
