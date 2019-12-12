---
id: modal
title: Modal
---

Modal dialogs.

## When To Use

When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use Modal to create a new floating layer over the current page to get user feedback or display information.

## Examples

```js
import { Modal, useModal } from 'tailor-ui';
```

### Basic

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal
        title="This is a Modal"
        visible={visible}
        closable
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index}>This is the content of Modal</div>
        ))}
      </Modal>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
    </>
  );
}
```

### Large size

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal
        title="This is a Modal"
        size="lg"
        visible={visible}
        closable
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index}>This is the long content of Large Modal</div>
        ))}
      </Modal>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
    </>
  );
}
```

### Customize footer

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal
        title="This is a Modal"
        visible={visible}
        footer={<div>My footer</div>}
        closable
        onCancel={() => setVisible(false)}
      >
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
      </Modal>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
    </>
  );
}
```

### Without footer

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal
        title="This is a Modal"
        visible={visible}
        footer={null}
        closable
        onCancel={() => setVisible(false)}
      >
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
      </Modal>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
    </>
  );
}
```

### With button props

```jsx live
() => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal
        title="This is a Modal"
        visible={visible}
        closable
        onConfirm={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setVisible(false);
          }, 3000);
        }}
        onCancel={() => setVisible(false)}
        confirmText="DELETE"
        confirmButtonProps={{ type: 'danger', loading }}
      >
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
      </Modal>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
    </>
  );
}
```

### onOpenComplete & onCloseComplete

```jsx live
() => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal
        title="This is a Modal"
        visible={visible}
        closable
        onConfirm={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        onOpenComplete={() => console.log('modal opened!')}
        onCloseComplete={() => console.log('modal closed!')}
      >
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
        <div>This is the content of Modal</div>
      </Modal>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
    </>
  );
}
```

### useModal Hooks

You can use the `useModal` hooks to display Modal without render `Modal` component in your component.

#### Confirm

##### Using callback

```jsx live
() => {
  const modal = useModal();

  return (
    <Button
      onClick={() => {
        modal.confirm({
          title: 'Do you Want to delete these items?',
          content: 'Some descriptions',
          onConfirm: () => console.log('confirmed!'),
          onCancel: () => console.log('canceled!'),
        });
      }}
    >
      Confirm
    </Button>
  );
}
```

##### Using promise

```jsx live
() => {
  const modal = useModal();

  return (
    <Button
      onClick={() => {
        const [confirmation] = modal.confirm({
          title: 'Confirm',
          content:
            'Modal windows are sometimes called heavy windows or modal dialogs because they often display a dialog box. User interfaces typically use modal windows to command user awareness and to display emergency states, though interaction designers argue they are ineffective for that use.',
        });

        confirmation.then(confirmed => {
          if (confirmed) {
            console.log('confirmed!');
          } else {
            console.log('canceled!');
          }
        });
      }}
    >
      Confirm
    </Button>
  );
}
```

#### With other status

```jsx live
() => {
  const modal = useModal();

  return (
    <>
      <Button
        onClick={() => {
          modal.info({
            title: 'Info',
            content:
              'Modal windows are sometimes called heavy windows or modal dialogs because they often display a dialog box. User interfaces typically use modal windows to command user awareness and to display emergency states, though interaction designers argue they are ineffective for that use.',
            onConfirm: () => console.log('info confirm'),
          });
        }}
      >
        Info
      </Button>
      <Button
        ml="2"
        onClick={() => {
          const [confirmation] = modal.success({
            title: 'Success',
            content:
              'Modal windows are sometimes called heavy windows or modal dialogs because they often display a dialog box. User interfaces typically use modal windows to command user awareness and to display emergency states, though interaction designers argue they are ineffective for that use.',
          });

          confirmation.then(confirmed => {
            if (confirmed) {
              console.log('success confirm');
            }
          });
        }}
      >
        Success
      </Button>
      <Button
        ml="2"
        onClick={() => {
          modal.warning({
            title: 'Warning',
            content:
              'Modal windows are sometimes called heavy windows or modal dialogs because they often display a dialog box. User interfaces typically use modal windows to command user awareness and to display emergency states, though interaction designers argue they are ineffective for that use.',
          });
        }}
      >
        Warning
      </Button>
      <Button
        ml="2"
        onClick={() => {
          modal.error({
            title: 'Danger',
            content:
              'Modal windows are sometimes called heavy windows or modal dialogs because they often display a dialog box. User interfaces typically use modal windows to command user awareness and to display emergency states, though interaction designers argue they are ineffective for that use.',
          });
        }}
      >
        Error
      </Button>
    </>
  );
}
```

##### Set closable to true

```jsx live
() => {
  const modal = useModal();

  return (
    <Button
      onClick={() => {
        const [confirmation] = modal.error({
          closable: true,
          title: 'Danger',
          content:
            'Modal windows are sometimes called heavy windows or modal dialogs because they often display a dialog box. User interfaces typically use modal windows to command user awareness and to display emergency states, though interaction designers argue they are ineffective for that use.',
          confirmText: 'Delete',
        });

        confirmation.then(confirmed => {
          if (confirmed) {
            console.log('confirmed!');
          } else {
            console.log('canceled!');
          }
        });
      }}
    >
      Click Me
    </Button>
  );
}
```

##### Manual to update and close

```jsx live
() => {
  const modal = useModal();

  return (
    <Button
      onClick={() => {
        let secondsToGo = 5;

        const { confirmation, close, update } = modal.confirm({
          title: 'This is a notification message',
          content: `This modal will be destroyed after ${secondsToGo} second.`,
        });

        const countdownTimer = setInterval(() => {
          secondsToGo -= 1;
          update({
            content: `This modal will be destroyed after ${secondsToGo} second.`,
          });
        }, 1000);

        const closeTimer = setTimeout(() => {
          clearInterval(countdownTimer);
          close();
        }, secondsToGo * 1000);

        confirmation.then(confirmed => {
          clearInterval(countdownTimer);
          clearTimeout(closeTimer);
          if (confirmed) {
            console.log('confirmed!');
          } else {
            console.log('canceled!');
          }
        });
      }}
    >
      Confirm
    </Button>
  );
}
```

## API

### Modal

### Hooks

```js
const modal = useModal();
```

- `modal.confirm(options) => ReturnValue`
- `modal.info(options) => ReturnValue`
- `modal.success(options) => ReturnValue`
- `modal.warning(options) => ReturnValue`
- `modal.error(options) => ReturnValue`

The `ReturnValue` can destructing by array or object:

- `[confirmation, close, update]`
- `{ confirmation, close, update }`

Below is the type of `ReturnValue`:

- `confirmation: Promise<boolean>`
- `close: () =>void`
- `update: (options) => void`

### `options`

| Property    | Type                | Default                                                   | Description                                                                                                                                                                    |
| ----------- | ------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| closable    | boolean             | `true` if call `model.confirm`, otherwise will be `false` | Show cancel button or not                                                                                                                                                      |
| cancelText  | string              | Cancel                                                    | Text of the Cancel button                                                                                                                                                      |
| confirmText | string              | Conrim                                                    | Text of the Conrim button                                                                                                                                                      |
| onCancel    | function            | -                                                         | Specify a function that will be called when the user clicks the Cancel button. The parameter of this function is a function whose execution should include closing the dialog. |
| onConfirm   | function            | -                                                         | Specify a function that will be called when the user clicks the OK button. The parameter of this function is a function whose execution should include closing the dialog.     |
| title       | string \| ReactNode | -                                                         | Title                                                                                                                                                                          |
| content     | string \| ReactNode | -                                                         | content of the message                                                                                                                                                         |

> The options of update function does not accept onConfirm & onCancel.