---
id: upload
title: Upload
---

Upload file by selecting or dragging.

## When To Use

- When you need to upload one or more files.
- When you need to show the process of uploading.
- When you need to upload files by dragging and dropping.

## Examples

```js
import { Upload } from 'tailor-ui';
```

### Basic

```jsx live
<Upload onSelect={() => new Promise((resolve) => setTimeout(resolve, 2000))} />
```

### before select

```jsx live
() => {
  const modal = useModal();

  return (
    <Upload
      onBeforeSelect={() =>
        modal.confirm({
          title: 'Do you want to override items?',
          content: 'It can not fallback',
        })
      }
      onSelect={() => new Promise((resolve) => setTimeout(resolve, 2000))}
    />
  );
};
```

### Multiple

```jsx live
<Upload
  multiple
  onSelect={() => new Promise((resolve) => setTimeout(resolve, 2000))}
/>
```

### failed and success

```jsx live
() => {
  const [uploadFirstTime, setUploadFirstTime] = useState(true);

  return (
    <Upload
      multiple
      onSelect={() =>
        new Promise((resolve, reject) => {
          if (uploadFirstTime) {
            setTimeout(reject, 1000);
            setUploadFirstTime(false);
          } else {
            setTimeout(resolve, 1000);
          }
        })
      }
    />
  );
};
```

## API

| Property         | Description | Type                                                                                           | Default |
| ---------------- | ----------- | ---------------------------------------------------------------------------------------------- | ------- |
| `disabled`       |             | `boolean`                                                                                      |         |
| `onSelect`       |             | `(files: File[]) => Promise<any>`                                                              |         |
| `onClear`        |             | `(file: File) => void`                                                                         |         |
| `onBeforeSelect` |             | `() => Promise<boolean>` \| `boolean`                                                          |         |
| `buttonProps`    |             | `ButtonProps`                                                                                  |         |
| `texts`          |             | `{ uploadText?: string; uploadingText?: string; uploadedText?: string; failedText?: string; }` |         |

This component is based on [react-dropzone](https://github.com/react-dropzone/react-dropzone), please check [it's documentation](https://react-dropzone.js.org/#proptypes) for more usage.
