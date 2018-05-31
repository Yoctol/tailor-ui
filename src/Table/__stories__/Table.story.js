import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { range } from 'ramda';

import themeProvider from '../../../.storybook/theme-provider';
import Table from '../';

storiesOf('Data Display|Table', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
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
  ))
  .add('dental', () => (
    <Table textAlign="center">
      <Table.Head>
        <Table.HeadColumn colSpan="8">醫師看診時間</Table.HeadColumn>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Column />
          <Table.Column>日</Table.Column>
          <Table.Column>一</Table.Column>
          <Table.Column>二</Table.Column>
          <Table.Column>三</Table.Column>
          <Table.Column>四</Table.Column>
          <Table.Column>五</Table.Column>
          <Table.Column>六</Table.Column>
        </Table.Row>
        <Table.Row>
          <Table.Column>
            上午班<br />10:00-13:00
          </Table.Column>
          <Table.Column
            rowSpan="3"
            borderLeft="1px solid"
            borderRight="1px solid"
          >
            休診日
          </Table.Column>
          {range(1, 7).map(key => (
            <Table.Column key={key}>
              <div>大濕濕 {key}</div>
              <div>小乾乾 {key}</div>
            </Table.Column>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Column>
            下午班<br />14:00-18:00
          </Table.Column>
          {range(1, 7).map(key => (
            <Table.Column key={key}>
              <div>大濕濕 {key}</div>
              <div>小乾乾 {key}</div>
            </Table.Column>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Column>
            晚班<br />19:00-22:00
          </Table.Column>
          {range(1, 7).map(key => (
            <Table.Column key={key}>
              <div>大濕濕 {key}</div>
              <div>小乾乾 {key}</div>
            </Table.Column>
          ))}
        </Table.Row>
      </Table.Body>
    </Table>
  ));
