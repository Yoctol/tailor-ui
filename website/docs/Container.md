---
id: container
title: Container
---

Container component for contents.

## When To Use

When you need to display some content to users.

## Examples

```js
import { Container, Box } from 'tailor-ui';
```

### Basic

```jsx live
<Box p="24px" bg="surface2">
  <Container title="Title">
    <Container.Section title="Section Title #1">
      Section titles are text derived from either a transcript or screenplay of
      the dialog or commentary in films.
    </Container.Section>
    <Container.Section title="Section Title #2">
      Section titles are text derived from either a transcript or screenplay of
      the dialog or commentary in films.
    </Container.Section>
  </Container>

  <Container title="Title" subTitle="SubTitle">
    <Container.Section title="Section Title #1">
      Section titles are text derived from either a transcript or screenplay of
      the dialog or commentary in films.
    </Container.Section>
    <Container.Section title="Section Title #2">
      Section titles are text derived from either a transcript or screenplay of
      the dialog or commentary in films.
    </Container.Section>
  </Container>
</Box>
```

### Without title

```jsx live
<Box p="24px" bg="surface2">
  <Container>The content of container</Container>
</Box>
```

### With Table

```jsx live
<Box p="24px" bg="surface2">
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

    <Button variant="regular">+ Button</Button>
  </Container>
</Box>
```

## API

### Container

| Property   | Description | Type        | Default |
| ---------- | ----------- | ----------- | ------- |
| `title`    |             | `ReactNode` |         |
| `subTitle` |             | `ReactNode` |         |

### Container.Section

| Property | Description | Type        | Default |
| -------- | ----------- | ----------- | ------- |
| `title`  |             | `ReactNode` |         |
