import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { range } from 'lodash';

import Table from '../';

storiesOf('Table', module)
  .addDecorator(centered)
  .add('default', () => (
    <Table>
      <Table.Head>
        {range(2, 10).map(x => <Table.HeadColumn>{x}</Table.HeadColumn>)}
      </Table.Head>
      <Table.Body>
        {range(1, 10).map(x => (
          <Table.Row key={x}>
            {range(2, 10).map(y => (
              <Table.Column>
                {y} * {x} = {x * y}
              </Table.Column>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ));
