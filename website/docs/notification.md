---
id: notification
title: Notification
---

Display a notification message globally.

## When To Use

To display a notification message at any of the four corners of the viewport. Typically it can be used in the following cases:

- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details about upcoming steps the user may have to follow.
- A notification that is pushed by the application.

## Examples

```js
import { useNotification } from 'tailor-ui';
```

### Basic

```jsx live
() => {
  const notification = useNotification();

  return (
    <>
      <Button
        onClick={() =>
          notification.open({
            content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          })
        }
      >
        Show Notification
      </Button>
    </>
  );
}
```

### Manual close by hooks return value

```jsx live
() => {
  const notification = useNotification();

  return (
    <>
      <Button
        onClick={() => {
          const [done, close] = notification.open({
            content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            duration: Infinity,
          })

          done.then(() => console.log('notification done'));

          setTimeout(close, 3000);
        }}
      >
        Show Notification
      </Button>
    </>
  );
}
```

### Manual close by key

```jsx live
() => {
  const shown = useRef(false);
  const notification = useNotification();
  const CUSTOMIZED_KEY = 'CUSTOMIZED_KEY';

  return (
    <>
      <Button
        onClick={() => {
          if (shown.current) {
            return;
          }

          shown.current = true;

          const [done] = notification.open({
            key: CUSTOMIZED_KEY,
            content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            duration: Infinity,
          })

          done.then(() => {
            console.log('notification done');
            shown.current = false;
          });
        }}
      >
        Show Notification
      </Button>
      <Button
        ml="8px"
        onClick={() => {
          notification.close(CUSTOMIZED_KEY)
        }}
      >
        Close Notification
      </Button>
    </>
  );
}
```

### Destroy all notification

```jsx live
() => {
  const notification = useNotification();

  return (
    <>
      <Button
        onClick={() => {
          const [done] = notification.open({
            content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            duration: Infinity,
          })

          done.then(() => console.log('notification done'));
        }}
      >
        Show Notification
      </Button>
      <Button
        ml="8px"
        onClick={() => {
          notification.destroy();
        }}
      >
        Destroy All Notification
      </Button>
    </>
  );
}
```

### With icon

```jsx live
() => {
  const notification = useNotification();

  return (
    <>
      <Button
        onClick={() =>
          notification.open({
            icon: <Icon type={MdStar} size="48" fill="warning" />,
            content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          })
        }
      >
        Show Notification
      </Button>
    </>
  );
}
```


### Customized duration

```jsx live
() => {
  const notification = useNotification();

  return (
    <>
      <Button
        onClick={() =>
          notification.open({
            content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            duration: 10000,
          })
        }
      >
        Show Notification
      </Button>
    </>
  );
}
```

### Handle Promise

```jsx live
() => {
  const notification = useNotification();

  return (
    <>
      <Button
        onClick={async () => {
          const [confirmation] =notification.open({
            content: 'This is a notification!',
          })

          await confirmation;

          notification.open({
            content: 'Previous message has been resolve!'
          });
        }}
      >
        Show Notification
      </Button>
    </>
  );
}
```

## API

### Methods

- `notification.open: (config) => [Promise, closeFn]`
- `notification.close: (key: string) => void`
- `notification.destroy: () => void`

### Config

| Argument | Type      | Default  | Description                   |
|----------|-----------|----------|-------------------------------|
| key      | string    | -        | key of the notification       |
| icon     | ReactNode | -        | icon of the notification      |
| content  | ReactNode | -        | content of the notification   |
| duration | number    | Infinity | time(ms) before auto-dismiss. |
