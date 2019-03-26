import React from 'react';

import { render } from 'test/test-utils';

import Table from '../Table';

function range(start: number, end: number) {
  return new Array(end - start).fill(0).map((_, i) => start + i);
}

describe('Table', () => {
  it('should render table correctly', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          <Table.HeadColumn>Name</Table.HeadColumn>
          <Table.HeadColumn>Platform</Table.HeadColumn>
          <Table.HeadColumn>People</Table.HeadColumn>
          <Table.HeadColumn>Ammount</Table.HeadColumn>
          <Table.HeadColumn>Action</Table.HeadColumn>
        </Table.Head>
        <Table.Body>
          {range(1, 4).map(value => (
            <Table.Row key={value}>
              <Table.Column>Name {value}</Table.Column>
              <Table.Column>Platform {value}</Table.Column>
              <Table.Column>10,000</Table.Column>
              <Table.Column>1,000 NTD</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render table correctly with header and footer', () => {
    const { container } = render(
      <Table header="Header" footer="Footer">
        <Table.Head>
          <Table.HeadColumn>Name</Table.HeadColumn>
          <Table.HeadColumn>Platform</Table.HeadColumn>
          <Table.HeadColumn>People</Table.HeadColumn>
          <Table.HeadColumn>Ammount</Table.HeadColumn>
          <Table.HeadColumn>Action</Table.HeadColumn>
        </Table.Head>
        <Table.Body>
          {range(1, 4).map(value => (
            <Table.Row key={value}>
              <Table.Column>Name {value}</Table.Column>
              <Table.Column>Platform {value}</Table.Column>
              <Table.Column>10,000</Table.Column>
              <Table.Column>1,000 NTD</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
