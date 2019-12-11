---
id: popover
title: Popover
---

The floating card popped by clicking or hovering.

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

## Examples

```js
import { Popover } from 'tailor-ui';
```

### Basic

```jsx live
<Popover title="Popover Title" content="Popover Content">
  <Button>Button</Button>
</Popover>
```

### Positioning

```jsx live
<Box px="5">
  <Flex justifyContent="space-between">
    <Popover
      position={Position.TOP_LEFT}
      title="Top Left"
      content={
        <Flex
          alignItems="center"
          justifyContent="center"
          width="200px"
          height="200px"
        >
          TOP_LEFT
        </Flex>
      }
    >
      <Button>TOP_LEFT</Button>
    </Popover>

    <Popover
      position={Position.TOP}
      title="Top"
      content={
        <Flex
          alignItems="center"
          justifyContent="center"
          width="200px"
          height="200px"
        >
          TOP
        </Flex>
      }
    >
      <Button>TOP</Button>
    </Popover>

    <Popover
      position={Position.TOP_RIGHT}
      title="Top Right"
      content={
        <Flex
          alignItems="center"
          justifyContent="center"
          width="200px"
          height="200px"
        >
          TOP_RIGHT
        </Flex>
      }
    >
      <Button>TOP_RIGHT</Button>
    </Popover>
  </Flex>

  <Flex justifyContent="space-between" mt="5">
    <Popover
      position={Position.LEFT}
      title="Left"
      content={
        <Flex
          alignItems="center"
          justifyContent="center"
          width="200px"
          height="200px"
        >
          LEFT
        </Flex>
      }
    >
      <Button>LEFT</Button>
    </Popover>

    <Popover
      position={Position.RIGHT}
      title="Right"
      content={
        <Flex
          alignItems="center"
          justifyContent="center"
          width="200px"
          height="200px"
        >
          RIGHT
        </Flex>
      }
    >
      <Button>RIGHT</Button>
    </Popover>
  </Flex>

  <Flex justifyContent="space-between" mt="5">
    <Popover
      position={Position.BOTTOM_LEFT}
      title="Bottom Left"
      content={
        <Flex
          alignItems="center"
          justifyContent="center"
          width="200px"
          height="200px"
        >
          BOTTOM_LEFT
        </Flex>
      }
    >
      <Button>BOTTOM_LEFT</Button>
    </Popover>

    <Popover
      position={Position.BOTTOM}
      title="Bottom"
      content={
        <Flex
          alignItems="center"
          justifyContent="center"
          width="200px"
          height="200px"
        >
          BOTTOM
        </Flex>
      }
    >
      <Button>BOTTOM</Button>
    </Popover>

    <Popover
      position={Position.BOTTOM_RIGHT}
      title="Bottom Right"
      content={
        <Flex
          alignItems="center"
          justifyContent="center"
          width="200px"
          height="200px"
        >
          BOTTOM_RIGHT
        </Flex>
      }
    >
      <Button>BOTTOM_RIGHT</Button>
    </Popover>
  </Flex>
</Box>
```

### With content hide

```jsx live
<Popover
  position={Position.RIGHT}
  title="Title"
  content={hide => (
    <div>
      Popover Content
      <br />
      <Button size="sm" onClick={hide}>
        Hide Popover
      </Button>
    </div>
  )}
>
  <Button>Button</Button>
</Popover>
```

### With onVisibleChange

```jsx live
<Popover
  position={Position.RIGHT}
  title="Title"
  content="Popover content"
  onVisibleChange={console.log}
>
  <Button>Button</Button>
</Popover>
```

### Popover with Select

```jsx live
() => {
  const [value, setValue] = useState('Banana');

  return (
    <Popover
      position={Position.RIGHT}
      content={
        <Select
          value={value}
          onChange={setValue}
          options={['Banana', 'Orange', 'Apple', 'Mango']}
        />
      }
    >
      <Button>Button</Button>
    </Popover>
  );
}
```

### Nested Usage

```jsx live
<Popover
  position={Position.TOP}
  title="Nest 1"
  content={
    <Flex
      alignItems="center"
      justifyContent="center"
      width="200px"
      height="200px"
    >
      <Popover
        position={Position.RIGHT}
        title="Nest 2"
        content={
          <Flex
            alignItems="center"
            justifyContent="center"
            width="200px"
            height="200px"
          >
            <Popover
              position={Position.BOTTOM}
              title="Nest 3"
              content={
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  width="200px"
                  height="200px"
                >
                  <Popover
                    position={Position.LEFT}
                    title="Nest 4"
                    content={
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        width="200px"
                        height="200px"
                      >
                        Last
                      </Flex>
                    }
                  >
                    <Button>Button</Button>
                  </Popover>
                </Flex>
              }
            >
              <Button>Button</Button>
            </Popover>
          </Flex>
        }
      >
        <Button>Button</Button>
      </Popover>
    </Flex>
  }
>
  <Button>Button</Button>
</Popover>
```

## API
