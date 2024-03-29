---
id: responsive
title: Responsive Styles
---

Often when working on responsive layouts, it's useful to adjust styles along a singular dimension – such as font-size, margin, padding, and width. Instead of manually managing media queries and adding nested style objects throughout a code base, styled-system offers a convenient shorthand syntax for adding responsive styles with a mobile-first approach. While this syntax can seem odd at first, it can become a powerful way to manage responsive typography and layouts.

All style utilities add props that accept arrays as values for mobile-first responsive styles.

```jsx live
<Box
  height="100px"
  bg="primaryLight"
  width={[
    1, // 100% below the smallest breakpoint
    1 / 2, // 50% from the next breakpoint and up
    1 / 4, // 25% from the next breakpoint and up
  ]}
/>
```

### What it does

This shortcut is an alternative to writing media queries out by hand. Given the following:

```css
.Box-hash {
  width: 100%;
}

@media screen and (min-width: 36rem) {
  .Box-hash {
    width: 50%;
  }
}

@media screen and (min-width: 48rem) {
  .Box-hash {
    width: 25%;
  }
}
```

### Using objects

```js
const breakpoints = [
  '36rem', // 576px
  '48rem', // 768px
  '62rem', // 992px
  '75rem', // 122px
]

<Box width={[1, 1 / 2, 1 / 4]} />
```
