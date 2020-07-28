---
id: tooltip
title: Tooltip
---

A simple text popup tip.

## When To Use

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a `button/text/operation`. It's often used instead of the html `title` attribute.

## Examples

```js
import { Position, Tooltip } from 'tailor-ui';
```

### Basic

```jsx live
<Tooltip content="Tooltip Content">
  <Button>Hover me</Button>
</Tooltip>
```

### Position

```jsx live
<Flex justifyContent="space-between" mx="4">
  <Tooltip position={Position.TOP} content={<span>Tooltip Content</span>}>
    <Button>Top</Button>
  </Tooltip>

  <Tooltip position={Position.RIGHT} content={<span>Tooltip Content</span>}>
    <Button>Right</Button>
  </Tooltip>

  <Tooltip position={Position.BOTTOM} content={<span>Tooltip Content</span>}>
    <Button>Bottom</Button>
  </Tooltip>

  <Tooltip position={Position.LEFT} content={<span>Tooltip Content</span>}>
    <Button>Left</Button>
  </Tooltip>
</Flex>
```

### Use mouseEnterDelay and mouseLeaveDelay

```jsx live
<Tooltip
  position={Position.BOTTOM}
  content="Tooltip Content"
  mouseEnterDelay={500}
  mouseLeaveDelay={500}
>
  <Button>Hover me</Button>
</Tooltip>
```

### Controlled usage

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <Tooltip
      content="Tooltip content"
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Button>Hover me</Button>
    </Tooltip>
  );
}
```

### With defaultVisible

```jsx live
<Tooltip content="Tooltip content" defaultVisible>
  <Button>Hover me</Button>
</Tooltip>
```

## API


| Property          | Description                                                                                                                                          | Type                                                    | Default        |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|----------------|
| `defaultVisible`  | Whether the floating tooltip card is visible by default                                                                                              | `boolean`                                               |                |
| `visible`         | Whether the floating tooltip card is visible                                                                                                         | `boolean`                                               |                |
| `onVisibleChange` | Callback executed when visibility of the tooltip card is changed                                                                                     | `(visible: boolean) => void`                            |                |
| `position`        | The position base on the children component                                                                                                          | `Positions`                                             | `Position.TOP` |
| `mouseEnterDelay` | Delay in milliseconds, before tooltip is shown on mouse enter                                                                                        | `number`                                                | 0              |
| `mouseLeaveDelay` | Delay in milliseconds, before tooltip is hidden on mouse leave                                                                                       | `number`                                                | 200            |
| `content`         | A string or react component inside this tooltip. If you are using click to trigger, it can be a function that with `hide` callback as first argument | `ReactNode` \| `(handleClose: () => void) => ReactNode` |                |
| `onOpenComplete`  | Whether to mount child components on onClose                                                                                                         | `() => void`                                            |                |
| `onCloseComplete` | Whether to unmount child components on onClose                                                                                                       | `() => void`                                            |                |
| `Wrapper`         | The wrapper of tooltip content                                                                                                                       | `ComponentType`                                         |                |
