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
  <Container title="Title A">
    <Container.Section title="Subtitle #1">
      Subtitles are text derived from either a transcript or screenplay of the
      dialog or commentary in films.
    </Container.Section>
    <Container.Section title="Subtitle #2">
      Subtitles are text derived from either a transcript or screenplay of the
      dialog or commentary in films.
    </Container.Section>
  </Container>

  <Container title="Title B">
    <Container.Section title="Subtitle #1">
      Subtitles are text derived from either a transcript or screenplay of the
      dialog or commentary in films.
    </Container.Section>
    <Container.Section title="Subtitle #2">
      Subtitles are text derived from either a transcript or screenplay of the
      dialog or commentary in films.
    </Container.Section>
  </Container>
</Box>
```
