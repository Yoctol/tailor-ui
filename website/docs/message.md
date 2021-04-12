---
id: message
title: Message
---

Display global messages as feedback in response to user operations.

## When To Use

- To provide feedback such as success, warning, error etc.
- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.

## Examples

```js
import { useMessage } from 'tailor-ui';
```

### Basic

```jsx live
() => {
  const message = useMessage();

  return (
    <>
      <Button onClick={() => message.info('This is a info message!')}>
        Info
      </Button>

      <Button
        onClick={() => message.success('This is a success message!')}
        ml={2}
      >
        Success
      </Button>

      <Button
        onClick={() => message.warning('This is a warning message!')}
        ml={2}
      >
        Warning
      </Button>

      <Button onClick={() => message.error('This is a error message!')} ml={2}>
        Error
      </Button>
    </>
  );
};
```

### Customized duration

```jsx live
() => {
  const message = useMessage();

  return (
    <Button
      onClick={() => {
        message.info(
          'This is a prompt message for success, and it will disappear in 10 seconds',
          10000
        );
      }}
    >
      Customized display duration
    </Button>
  );
};
```

### Handle Promise

```jsx live
() => {
  const message = useMessage();

  return (
    <Button
      onClick={() => {
        message.info('This is a info message!').then(() => {
          message.success('Previous message has been resolve!');
        });
      }}
    >
      Show a message
    </Button>
  );
};
```

## API

### Methods

- `message.info(content, [duration]) => Promise`
- `message.success(content, [duration]) => Promise`
- `message.warning(content, [duration]) => Promise`
- `message.error(content, [duration]) => Promise`

### Argument

| Argument | Type                | Default | Description                   |
| -------- | ------------------- | ------- | ----------------------------- |
| content  | string \| ReactNode | -       | content of the message        |
| duration | number              | 3000    | time(ms) before auto-dismiss. |
