---
id: table
title: Table
---

A table displays rows of data.

## When To Use

- To display a collection of structured data.
- To sort, search, paginate, filter data.

## Examples

```js
import { Table } from 'tailor-ui';
```

### Basic Table

```jsx live
<Box width="100%" height="100%" borderRadius="xl" bg="#eef0f5" p="4">
  <Table>
    <Table.Head>
      <Table.HeadColumn>Name</Table.HeadColumn>
      <Table.HeadColumn>Platform</Table.HeadColumn>
      <Table.HeadColumn>People</Table.HeadColumn>
      <Table.HeadColumn>Ammount</Table.HeadColumn>
      <Table.HeadColumn>Action</Table.HeadColumn>
    </Table.Head>
    <Table.Body>
      {range(1, 4).map((value) => (
        <Table.Row key={value}>
          <Table.Column>Name {value}</Table.Column>
          <Table.Column>Platform {value}</Table.Column>
          <Table.Column>10,000</Table.Column>
          <Table.Column>NTD 1,000</Table.Column>
          <Table.Column>
            <Button variant="primary-invert">Action</Button>
          </Table.Column>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Box>
```

### With maxHeight

```jsx live
<Box width="100%" height="100%" borderRadius="xl" bg="#eef0f5" p="4">
  <Table maxHeight="300px">
    <Table.Head>
      <Table.HeadColumn>Name</Table.HeadColumn>
      <Table.HeadColumn>Platform</Table.HeadColumn>
      <Table.HeadColumn>People</Table.HeadColumn>
      <Table.HeadColumn>Ammount</Table.HeadColumn>
      <Table.HeadColumn>Action</Table.HeadColumn>
    </Table.Head>
    <Table.Body>
      {range(1, 20).map((value) => (
        <Table.Row key={value}>
          <Table.Column>Name {value}</Table.Column>
          <Table.Column>Platform {value}</Table.Column>
          <Table.Column>10,000</Table.Column>
          <Table.Column>NTD 1,000</Table.Column>
          <Table.Column>
            <Button variant="primary-invert">Action</Button>
          </Table.Column>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Box>
```

### Scrollable

```jsx live
<Box width="100%" height="100%" borderRadius="xl" bg="surface" p="4">
  <Container>
    <Heading.H4>Text Here</Heading.H4>
    <Table>
      <Table.Head>
        <Table.HeadColumn fixed="left">
          <Box width="120px">Fixed Column 1</Box>
        </Table.HeadColumn>
        <Table.HeadColumn fixed="left">
          <Box width="120px">Fixed Column 2</Box>
        </Table.HeadColumn>
        <Table.HeadColumn>
          <Box width="160px">Scrollable Column 1</Box>
        </Table.HeadColumn>
        <Table.HeadColumn>
          <Box width="160px">Scrollable Column 2</Box>
        </Table.HeadColumn>
        <Table.HeadColumn>
          <Box width="160px">Scrollable Column 3</Box>
        </Table.HeadColumn>
        <Table.HeadColumn>
          <Box width="160px">Scrollable Column 4</Box>
        </Table.HeadColumn>
        <Table.HeadColumn>
          <Box width="160px">Scrollable Column 5</Box>
        </Table.HeadColumn>
        <Table.HeadColumn>
          <Box width="160px">Scrollable Column 6</Box>
        </Table.HeadColumn>
        <Table.HeadColumn fixed="right">
          <Box width="120px">Fixed Column 3</Box>
        </Table.HeadColumn>
      </Table.Head>
      <Table.Body>
        {range(1, 10).map((value) => (
          <Table.Row key={value}>
            <Table.Column>Column {value}</Table.Column>
            <Table.Column>Column {value}</Table.Column>
            <Table.Column>Scrollable Column {value}</Table.Column>
            <Table.Column>Scrollable Column {value}</Table.Column>
            <Table.Column>Scrollable Column {value}</Table.Column>
            <Table.Column>Scrollable Column {value}</Table.Column>
            <Table.Column>Scrollable Column {value}</Table.Column>
            <Table.Column>Scrollable Column {value}</Table.Column>
            <Table.Column>Column {value}</Table.Column>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <Button variant="regular">+ Button</Button>
  </Container>
</Box>
```

### Header & Footer (Deprecated)

> This API will be deprecated in the future, please use Container wrap Table instead.

```jsx live
<Box width="100%" height="100%" borderRadius="xl" bg="surface" p="4">
  <Table
    header={
      <Box py="24px" px="4">
        <Heading.H4>Text Here</Heading.H4>
      </Box>
    }
    footer={
      <Box py="24px" px="4">
        <Button variant="regular">+ Button</Button>
      </Box>
    }
  >
    <Table.Head>
      <Table.HeadColumn>Name</Table.HeadColumn>
      <Table.HeadColumn>Platform</Table.HeadColumn>
      <Table.HeadColumn>People</Table.HeadColumn>
      <Table.HeadColumn>Ammount</Table.HeadColumn>
      <Table.HeadColumn>Action</Table.HeadColumn>
    </Table.Head>
    <Table.Body>
      {range(1, 4).map((value) => (
        <Table.Row key={value}>
          <Table.Column>Name {value}</Table.Column>
          <Table.Column>Platform {value}</Table.Column>
          <Table.Column>10,000</Table.Column>
          <Table.Column>NTD 1,000</Table.Column>
          <Table.Column>
            <Button variant="primary-invert">Action</Button>
          </Table.Column>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Box>
```

## API

### Table

| Property    | Description                                                                                      | Type                 | Default  |
| ----------- | ------------------------------------------------------------------------------------------------ | -------------------- | -------- | --- |
| `width`     | The width of table                                                                               | `number` \| `string` | `100%`   |
| `maxHeight` | The maxHeight of table. Used to specify the height of the scroll area, could be string or number | `number              | string`  |     |
| `textAlign` | The textAlign of table                                                                           | `string`             | `center` |

### Table.HeadColumn

| Property | Description            | Type                  | Default |
| -------- | ---------------------- | --------------------- | ------- |
| `fixed`  | Set column to be fixed | `'left'` \| `'right'` |         |
| `width`  | The width of table     | `number` \| `string`  | `100%`  |

### Table.Row

| Property   | Description           | Type      | Default |
| ---------- | --------------------- | --------- | ------- |
| `disabled` | disabled state of Row | `boolean` | `false` |

### Table.Column

| Property | Description        | Type                 | Default |
| -------- | ------------------ | -------------------- | ------- |
| `width`  | The width of table | `number` \| `string` | `100%`  |
