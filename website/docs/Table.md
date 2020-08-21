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
      {range(1, 4).map(value => (
        <Table.Row key={value}>
          <Table.Column>Name {value}</Table.Column>
          <Table.Column>Platform {value}</Table.Column>
          <Table.Column>10,000</Table.Column>
          <Table.Column>1,000 NTD</Table.Column>
          <Table.Column>
            <Button variant="primary-invert">Action</Button>
          </Table.Column>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Box>
```

### Header & Footer

```jsx live
<Box width="100%" height="100%" borderRadius="xl" bg="#eef0f5" p="4">
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
      {range(1, 4).map(value => (
        <Table.Row key={value}>
          <Table.Column>Name {value}</Table.Column>
          <Table.Column>Platform {value}</Table.Column>
          <Table.Column>10,000</Table.Column>
          <Table.Column>1,000 NTD</Table.Column>
          <Table.Column>
            <Button variant="primary-invert">Action</Button>
          </Table.Column>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Box>
```

### Complex Footer

```jsx live
<Box width="100%" height="100%" borderRadius="xl" bg="#eef0f5" p="4">
  <Table
    footer={
      <div>
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          height="80px"
          px="4"
        >
          <div>
            <Heading.H3>Text Here</Heading.H3>
            <Heading.H3>Text Here</Heading.H3>
          </div>
        </Flex>
        <Flex
          bg="primary"
          justifyContent="flex-end"
          alignItems="center"
          height="80px"
          px="4"
        >
          <Button variant="primary-invert" rounded>
            Action
          </Button>
        </Flex>
      </div>
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
      {range(1, 4).map(value => (
        <Table.Row key={value}>
          <Table.Column>Name {value}</Table.Column>
          <Table.Column>Platform {value}</Table.Column>
          <Table.Column>10,000</Table.Column>
          <Table.Column>1,000 NTD</Table.Column>
          <Table.Column>
            <Button variant="primary-invert">Action</Button>
          </Table.Column>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Box>
```