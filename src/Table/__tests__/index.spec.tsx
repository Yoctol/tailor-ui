import React from 'react';

import { render } from 'test/test-utils';

import Table from '../Table';

function range(start: number, end: number) {
  return new Array(end - start).fill(0).map((_, i) => start + i);
}

describe('Table', () => {
  it('should render multiplication table correctly', () => {
    const { container } = render(
      <Table>
        <Table.Head>
          {range(2, 10).map(x => (
            <Table.HeadColumn key={x}>{x}</Table.HeadColumn>
          ))}
        </Table.Head>
        <Table.Body>
          {range(1, 10).map(x => (
            <Table.Row key={x}>
              {range(2, 10).map(y => (
                <Table.Column key={y}>
                  {y} * {x} = {x * y}
                </Table.Column>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render week schedule', () => {
    const { container } = render(
      <Table textAlign="center">
        <Table.Head>
          <Table.HeadColumn colSpan={8}>Time</Table.HeadColumn>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Column />
            <Table.Column>Sun</Table.Column>
            <Table.Column>Mon</Table.Column>
            <Table.Column>Tue</Table.Column>
            <Table.Column>Wed</Table.Column>
            <Table.Column>Thu</Table.Column>
            <Table.Column>Fri</Table.Column>
            <Table.Column>Sat</Table.Column>
          </Table.Row>
          <Table.Row>
            <Table.Column>
              Morning
              <br />
              10:00-13:00
            </Table.Column>
            <Table.Column
              rowSpan={3}
              borderColor="gray300"
              borderLeft="base"
              borderRight="base"
            >
              Day off
            </Table.Column>
            {range(1, 7).map(key => (
              <Table.Column key={key}>
                <div>Master {key}</div>
                <div>Slave {key}</div>
              </Table.Column>
            ))}
          </Table.Row>
          <Table.Row>
            <Table.Column>
              Afternoon
              <br />
              14:00-18:00
            </Table.Column>
            {range(1, 7).map(key => (
              <Table.Column key={key}>
                <div>Master {key}</div>
                <div>Slave {key}</div>
              </Table.Column>
            ))}
          </Table.Row>
          <Table.Row>
            <Table.Column>
              Night
              <br />
              19:00-22:00
            </Table.Column>
            {range(1, 7).map(key => (
              <Table.Column key={key}>
                <div>Master {key}</div>
                <div>Slave {key}</div>
              </Table.Column>
            ))}
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
