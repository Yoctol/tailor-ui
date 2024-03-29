---
id: card
title: Card
---

Simple rectangular container.

## When To Use

A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.

## Examples

```js
import { Card } from 'tailor-ui';
```

### With Block

```jsx live
<Card width="400px">
  <Card.Block>Title</Card.Block>
  <Card.Block>Content</Card.Block>
  <Card.Block>Footer</Card.Block>
</Card>
```

### With Button

```jsx live
<Card width="400px">
  <Card.Block>Title</Card.Block>
  <Card.Block>Content</Card.Block>
  <Card.Block p="1">
    <Button block>With Button</Button>
  </Card.Block>
  <Card.Block p="1">
    <Button block>With Button</Button>
  </Card.Block>
  <Card.Block p="1">
    <Button block>With Button</Button>
  </Card.Block>
</Card>
```

### With Image Top

```jsx live
<Card width="400px">
  <Card.Image>
    <img src="https://via.placeholder.com/400x300" alt="placeholder" />
  </Card.Image>
  <Card.Block>Title</Card.Block>
  <Card.Block>Content</Card.Block>
  <Card.Block>Footer</Card.Block>
</Card>
```

### With Image Bottom

```jsx live
<Card width="400px">
  <Card.Block>Title</Card.Block>
  <Card.Block>Content</Card.Block>
  <Card.Image>
    <img src="https://via.placeholder.com/400x300" alt="placeholder" />
  </Card.Image>
</Card>
```

### hoverable

```jsx live
<Card width="400px" hoverable>
  <Card.Block>Title</Card.Block>
  <Card.Block>Content</Card.Block>
  <Card.Block>Footer</Card.Block>
</Card>
```

### clickable

```jsx live
<>
  <Card width="400px" onClick={console.log}>
    <Card.Block>Title</Card.Block>
    <Card.Block>Content</Card.Block>
    <Card.Block>Footer</Card.Block>
  </Card>
  <br />
  <Card width="400px" hoverable onClick={console.log}>
    <Card.Block>Title</Card.Block>
    <Card.Block>Content</Card.Block>
    <Card.Block>Footer</Card.Block>
  </Card>
</>
```

## API

Some `props` are using object spread syntax and are not showing in these tables.

### Card

### Card.Block

### Card.Image
