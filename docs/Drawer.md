---
id: drawer
title: Drawer
---

Panel slides from screen edge.

## When To Use

A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since that user can interact with the Drawer without leaving the current page, tasks can be achieved more efficient within the same context.

- Use a Form to create or edit a set of information.
- Processing subtasks. When subtasks are too heavy for Popover and we still want to keep the subtasks in the context of the main task, Drawer - comes very handy.

When a same Form is needed in multiple places.

## Examples

```js
import { Drawer } from 'tailor-ui';
```

### Basic

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Open</Button>
      <Drawer title="Title" visible={visible} onClose={() => setVisible(false)}>
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index}>This is the content of Drawer</div>
        ))}
      </Drawer>
    </>
  );
}
```

### Custom Placement

```jsx live
() => {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState('left');

  return (
    <>
      <RadioGroup value={placement} onChange={setPlacement}>
        <Radio value="top">Top</Radio>
        <Radio value="right">Right (default)</Radio>
        <Radio value="bottom">Bottom</Radio>
        <Radio value="left">Left</Radio>
      </RadioGroup>

      <Button mt="3" onClick={() => setVisible(!visible)}>
        Open
      </Button>

      <Drawer
        title="Title"
        visible={visible}
        placement={placement}
        onClose={() => setVisible(false)}
      >
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index}>This is the content of Drawer</div>
        ))}
      </Drawer>
    </>
  );
}
```

### Add Custom Footer

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Open</Button>
      <Drawer
        title="Title"
        visible={visible}
        onClose={() => setVisible(false)}
        footer={
          <Button variant="primary" onClick={() => setVisible(false)}>
            Close Drawer
          </Button>
        }
      >
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index}>This is the content of Drawer</div>
        ))}
      </Drawer>
    </>
  );
}
```

### hidden close button and prevent mask clicked close

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Open</Button>
      <Drawer
        title="Title"
        visible={visible}
        onClose={() => setVisible(false)}
        closable={false}
        maskClosable={false}
        footer={
          <Button variant="primary" onClick={() => setVisible(false)}>
            Close Drawer
          </Button>
        }
      >
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index}>This is the content of Drawer</div>
        ))}
      </Drawer>
    </>
  );
}
```

## API

| Property     | Description | Type                                           | Default   |
| ------------ | ----------- | ---------------------------------------------- | --------- |
| visible      |             | `boolean`                                      |           |
| onClose      |             | `() => void`                                   |           |
| title        |             | `ReactNode`                                    |           |
| footer       |             | `ReactNode`                                    |           |
| placement    |             | `'top'` \| `'right'` \| `'bottom'` \| `'left'` | `'right'` |
| closable     |             | `boolean`                                      | `true`    |
| maskClosable |             | `boolean`                                      | `true`    |
| width        |             | `string` \| `number`                           | 400       |
| height       |             | `string` \| `number`                           | 300       |
