---
id: spacing-scale
title: Spacing Scale
---

When you using the `m (margin)`, `p (padding)`, `width` or other spacing props of component, you can just pass `1`, `2`...etc number for spacing:

```jsx live
<Box p={4} bg="gray300">
  <Box py="20px" bg="gray400">
    <Box ml={80} p={10} bg="gray500">
      Spacing Scale
    </Box>
  </Box>
</Box>
```

The space utility converts shorthand margin and padding props to margin and padding CSS declarations.

- Numbers from o, h, 0-10, 12 and 16 are converted to values on the spacing scale (see following table).
- Negative values can be used for negative margins.
- Numbers greater than the length of the theme.space array are converted to raw pixel values.
- String values are passed as raw CSS values.

### spacing scale table

| Spacing Key | rem         | px     |
| ----------- | ----------- | ------ |
| `o`         | `0.0625rem` | `1px`  |
| `h`         | `0.125rem`  | `2px`  |
| `0`         | `0`         | `0`    |
| `1`         | `0.25rem`   | `4px`  |
| `2`         | `0.5rem`    | `8px`  |
| `3`         | `0.75rem`   | `12px` |
| `4`         | `1rem`      | `16px` |
| `5`         | `1.25rem`   | `20px` |
| `6`         | `1.5rem`    | `24px` |
| `7`         | `1.75rem`   | `28px` |
| `8`         | `2rem`      | `32px` |
| `9`         | `2.25rem`   | `36px` |
| `10`        | `2.5rem`    | `40px` |
| `12`        | `3rem`      | `48px` |
| `16`        | `4rem`      | `64px` |
