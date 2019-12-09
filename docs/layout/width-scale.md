---
id: width-scale
title: Width / Height Scale
---

## Examples

```js
import { Flex, Box } from 'tailor-ui';
```

The width utility parses a component's width prop and converts it into a CSS width declaration.

- Numbers from 0-1 are converted to percentage widths.
- Numbers greater than 1 are converted to pixel values.
- String values are passed as raw CSS values.

### 25%

```jsx live
<Flex>
  <Box
    bg="primary"
    color="light"
    width={1 / 4}
    mx={2}
    py={4}
    style={{ textAlign: 'center ' }}
  >
    25%
  </Box>
  <Box
    bg="primary"
    color="light"
    width={1 / 4}
    mx={2}
    py={4}
    style={{ textAlign: 'center ' }}
  >
    25%
  </Box>
  <Box
    bg="primary"
    color="light"
    width={1 / 4}
    mx={2}
    py={4}
    style={{ textAlign: 'center ' }}
  >
    25%
  </Box>
  <Box
    bg="primary"
    color="light"
    width={1 / 4}
    mx={2}
    py={4}
    style={{ textAlign: 'center ' }}
  >
    25%
  </Box>
</Flex>
```

### 33%

```jsx live
<Flex>
  <Box
    bg="primary"
    color="light"
    width={1 / 3}
    mx={2}
    py={4}
    style={{ textAlign: 'center ' }}
  >
    33%
  </Box>
  <Box
    bg="primary"
    color="light"
    width={1 / 3}
    mx={2}
    py={4}
    style={{ textAlign: 'center ' }}
  >
    33%
  </Box>
  <Box
    bg="primary"
    color="light"
    width={1 / 3}
    mx={2}
    py={4}
    style={{ textAlign: 'center ' }}
  >
    33%
  </Box>
</Flex>
```

### 50%

```jsx live
<Flex>
  <Box
    bg="primary"
    color="light"
    width={1 / 2}
    mx={2}
    py={4}
    style={{ textAlign: 'center ' }}
  >
    50%
  </Box>
  <Box
    bg="primary"
    color="light"
    width={1 / 2}
    mx={2}
    py={4}
    style={{ textAlign: 'center ' }}
  >
    50%
  </Box>
</Flex>
```
