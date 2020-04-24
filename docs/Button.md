---
id: button
title: Button
---

To trigger an operation.

## When To Use

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

## Examples

```js
import { Button } from 'tailor-ui';
```

### Basic

```jsx live
<>
  <Button>Basic</Button>
  <Button rounded ml="2">
    Basic
  </Button>
  <Button disabled ml="2">
    Basic
  </Button>
  <Button loading ml="2">
    Basic
  </Button>
</>
```

### Variant

```jsx live
<>
  <Button variant="primary">Primary</Button>
  <Button variant="primary-invert" ml="2">
    Primary Invert
  </Button>
  <br />
  <br />
  <Button variant="danger">Danger</Button>
  <Button variant="danger-invert" ml="2">
    Danger Invert
  </Button>
  <br />
  <br />
  <Button variant="regular">Regular</Button>
  <Button variant="normal" ml="2">
    Normal
  </Button>
</>
```

### Rounded

```jsx live
<>
  <Button rounded variant="primary">
    Primary
  </Button>
  <Button rounded variant="primary-invert" ml="2">
    Primary Invert
  </Button>
  <br />
  <br />
  <Button rounded variant="danger">
    Danger
  </Button>
  <Button rounded variant="danger-invert" ml="2">
    Danger Invert
  </Button>
  <br />
  <br />
  <Button rounded variant="regular">
    Regular
  </Button>
  <Button rounded variant="normal" ml="2">
    Normal
  </Button>
</>
```

### Icon

```js
import { MdArrowForward } from 'react-icons/md';
```

```jsx live
<>
  <Button icon={MdArrowForward} variant="primary">
    Primary
  </Button>
  <Button icon={MdArrowForward} variant="primary-invert" ml="2">
    Primary Invert
  </Button>
  <br />
  <br />
  <Button icon={MdArrowForward} variant="danger">
    Danger
  </Button>
  <Button icon={MdArrowForward} variant="danger-invert" ml="2">
    Danger Invert
  </Button>
  <br />
  <br />
  <Button icon={MdArrowForward} variant="regular">
    Regular
  </Button>
  <Button icon={MdArrowForward} variant="normal" ml="2">
    Normal
  </Button>
</>
```

```js
import { MdCheck } from 'react-icons/md';
```

```jsx live
<>
  <Button icon={MdCheck} variant="primary" rounded />
  <Button icon={MdCheck} variant="primary-invert" rounded ml="2" />
  <Button icon={MdCheck} variant="danger" rounded ml="2" />
  <Button icon={MdCheck} variant="danger-invert" rounded ml="2" />
  <Button icon={MdCheck} variant="regular" rounded ml="2" />
  <Button icon={MdCheck} variant="normal" rounded ml="2" />
</>
```

### Disabled

```jsx live
<>
  <Button disabled variant="primary">
    Primary
  </Button>
  <Button disabled variant="primary-invert" ml="2">
    Primary Invert
  </Button>
  <br />
  <br />
  <Button disabled variant="danger">
    Danger
  </Button>
  <Button disabled variant="danger-invert" ml="2">
    Danger Invert
  </Button>
  <br />
  <br />
  <Button disabled variant="regular">
    Regular
  </Button>
  <Button disabled variant="normal" ml="2">
    Normal
  </Button>
</>
```

### Loading

```jsx live
<>
  <Button loading variant="primary">
    Primary
  </Button>
  <Button loading variant="primary-invert" ml="2">
    Primary Invert
  </Button>
  <br />
  <br />
  <Button loading variant="danger">
    Danger
  </Button>
  <Button loading variant="danger-invert" ml="2">
    Danger Invert
  </Button>
  <br />
  <br />
  <Button loading variant="regular">
    Regular
  </Button>
  <Button loading variant="normal" ml="2">
    Normal
  </Button>
  <br />
  <br />
  <Button icon={MdCheck} loading ml="2" />
  <Button icon={MdCheck} loading ml="2" rounded />
</>
```

```jsx live
() => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 3000);
      }}
    >
      Click me!
    </Button>
  );
}
```

### Sizes

```jsx live
<>
  <Button size="sm">Button sm</Button>

  <Button ml={2}>Button md</Button>

  <Button ml={2} size="lg">
    Button lg
  </Button>
</>
```

## API

| Property   | Description                                             | Type                                                                               | Default |
|------------|---------------------------------------------------------|------------------------------------------------------------------------------------|---------|
| `variant`  | set different variant to display other colors of button | `'primary'` `'primary-invert'` `'danger'` `'danger-invert'` `'regular'` `'normal'` |         |
| `size`     | the size of button                                      | `'sm'` \| `'md'` \| `'lg'`                                                         | `'md'`  |
| `loading`  | set the loading status of button                        | `boolean`                                                                          | `false` |
| `rounded`  | set the button is rounded or not                        | `boolean`                                                                          | `false` |
| `disabled` | disabled state of button                                | `boolean`                                                                          | `false` |
| `icon`     | set the icon of button, see: [Icon](Icon.md) component  | `IconType`                                                                         |         |
| `onClick`  | set the handler to handle `click` event                 | `(event: MouseEvent) => void`                                                      |         |
