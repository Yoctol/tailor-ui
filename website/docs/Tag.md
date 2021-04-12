---
id: tag
title: Tag
---

Tag for categorizing or markup.

## When To Use

- It can be used to tag by dimension or property.
- When categorizing.

## Examples

```js
import { Tag } from 'tailor-ui';
```

### Basic

```jsx live
<>
  <Tag>Content</Tag>
  <Tag disabled>Content</Tag>
  <Tag invalid>Content</Tag>
</>
```

### Clickable

```jsx live
<Tag onClick={() => console.log('click')}>Content</Tag>
```

### Use prefix

```jsx live
<>
  <Tag prefix="10">Content</Tag>
  <Tag prefix="20" invalid closable>
    Content
  </Tag>
</>
```

### Editable

```jsx live
<>
  <Tag prefix="10" editable onChange={console.log}>
    Content
  </Tag>
  <Tag prefix="20" editable closable onChange={console.log}>
    Content
  </Tag>
</>
```

### Closable

```jsx live
<>
  <Tag closable>Content</Tag>
  <Tag closable>Content</Tag>
  <Tag closable>Content</Tag>
  <Tag closable>Content</Tag>
</>
```

### Use with canClose

```jsx live
() => {
  const modal = useModal();

  return (
    <Tag
      closable
      canClose={() => {
        const [confirmation] = modal.error({
          closable: true,
          title: 'Delete this tag?',
          content: 'Are you sure? it can not be rollback!',
        });

        return confirmation;
      }}
    >
      DELETE ME
    </Tag>
  );
};
```

### Add & Remove Dynamically

```jsx live
() => {
  const [values, setValues] = useState(['tag 1', 'tag 2', 'tag 3']);
  const [editing, setEditing] = useState(false);

  const modal = useModal();

  return (
    <Flex flexWrap="wrap">
      {values.map((value, index) => {
        const invalid = values.filter((_, i) => i !== index).includes(value);

        return (
          <Flex key={value} flexDirection="column">
            <Tag
              key={value}
              closable
              editable
              invalid={invalid}
              canClose={() => {
                const [confirmation] = modal.error({
                  closable: true,
                  title: 'Delete this tag?',
                  content: 'Are you sure? it can not be rollback!',
                });

                return confirmation;
              }}
              onClosed={() => setValues(values.filter((v) => v !== value))}
              onChange={(prevValue, value) => {
                if (value.trim() !== '') {
                  setValues((prevValues) =>
                    prevValues.map((originalValue, id) =>
                      originalValue === prevValue && id === index
                        ? value
                        : originalValue
                    )
                  );
                  setEditing(false);
                }
              }}
            >
              {value}
            </Tag>
            {invalid && (
              <Box mt="1" mr="1" color="danger" fontSize="sm">
                duplicate tag!
              </Box>
            )}
          </Flex>
        );
      })}
      {values.length === new Set(values).size &&
        (editing ? (
          <Tag
            editable
            initialEditing
            onBlur={() => setEditing(false)}
            onChange={(_, value) => {
              if (value.trim() !== '') {
                setValues((prevValues) => [...prevValues, value]);
              }
              setEditing(false);
            }}
          />
        ) : (
          <Button size="sm" variant="regular" onClick={() => setEditing(true)}>
            + Add Tag
          </Button>
        ))}
    </Flex>
  );
};
```

## API

| Property         | Description                                                          | Type                                             | Default |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------------------ | ------- |
| `closable`       | Whether the Tag can be closed                                        | `boolean`                                        |         |
| `editable`       | Can update value when click tag                                      | `boolean`                                        |         |
| `onClosed`       | Callback executed when close animation is completed                  | `() => void`                                     |         |
| `canClose`       | Trigger when tag close button is clicked, return `true` to close tag | `() => boolean` \| `() => Promise<boolean>`      |         |
| `onChange`       | Callback executed when Tag is edited                                 | `(previousValue: string, value: string) => void` |         |
| `initialEditing` | Initial edit status for tag                                          | `boolean`                                        |         |
| `invalid`        | show invalid border for tag                                          | `boolean`                                        |         |
| `prefix`         | Prefix of tag                                                        | `ReactNode`                                      |         |
