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
      Section titles are text derived from either a transcript or screenplay of the
      dialog or commentary in films.
    </Container.Section>
    <Container.Section title="Section Title #2">
      Section titles are text derived from either a transcript or screenplay of the
      dialog or commentary in films.
    </Container.Section>
  </Container>

  <Container title="Title" subTitle="SubTitle">
    <Container.Section title="Section Title #1">
      Section titles are text derived from either a transcript or screenplay of the
      dialog or commentary in films.
    </Container.Section>
    <Container.Section title="Section Title #2">
      Section titles are text derived from either a transcript or screenplay of the
      dialog or commentary in films.
    </Container.Section>
  </Container>
</Box>
```

## API

### Container

| Property | Description | Type        | Default |
| -------- | ----------- | ----------- | ------- |
| `title`  |             | `ReactNode` |         |

### Container.Section

| Property | Description | Type        | Default |
| -------- | ----------- | ----------- | ------- |
| `title`  |             | `ReactNode` |         |
