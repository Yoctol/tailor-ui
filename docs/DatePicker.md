---
id: date-picker
title: DatePicker
---

To select or input a date.

## When To Use

By clicking the input box, you can select a date from a popup calendar.

## Examples

```js
import { DatePicker } from 'tailor-ui';
```

### Date picker

#### Basic usage

```jsx live
<DatePicker defaultValue={moment()} onChange={console.log} />
```

#### Controlled usage

```jsx live
() => {
  const [value, setValue] = useState(moment());

  return (
    <>
      <DatePicker value={value} onChange={setValue} />
      <Button mt="2" onClick={() => setValue(moment().subtract(3, 'days'))}>
        Set to 3 days ago
      </Button>
    </>
  );
}
```

#### Clearable

```jsx live
() => {
  const [value, setValue] = useState(moment());

  return (
    <>
      <DatePicker value={value} onChange={setValue} clearable />
      <br />
      <DatePicker defaultValue={moment()} onChange={console.log} clearable />
    </>
  );
}
```

#### Customize input

```jsx live
<DatePicker
  defaultValue={moment()}
  onChange={console.log}
  width="150px"
  inputProps={{
    size: 'sm',
  }}
/>
```

#### Date presets

```jsx live
<DatePicker
  defaultValue={moment()}
  onChange={console.log}
  presets={{
    '3 Days ago': moment().subtract(3, 'days'),
    Yesterday: moment().subtract(1, 'days'),
    Tomorrow: moment().add(1, 'days'),
    'End of this month': moment().endOf('month'),
  }}
/>
```

#### Choose Time

```jsx live
<DatePicker
  onChange={console.log}
  placeholder="Please Select Date & Time"
  showTime
  showSecond
/>
```

#### Choose Time & with minute step

```jsx live
<DatePicker
  onChange={console.log}
  format="YYYY-MM-DD HH:mm"
  minuteStep={15}
  showTime
/>
```

#### Disabled Specified Date

```jsx live
<DatePicker
  disabledDate={current => {
    const date = moment({ hour: 0, minute: 0, second: 0 });
    return current.isBefore(date);
  }}
  onChange={console.log}
/>
```

### Ranger picker

#### Basic usage

```jsx live
() => {
  const [value, setValue] = useState([]);

  return (
    <>
      <DatePicker range defaultValue={[]} />
      <br />
      <DatePicker range value={value} onChange={setValue} />
    </>
  );
}
```

#### With time picker

```jsx live
<DatePicker range showTime defaultValue={[moment(), moment()]} />
```

#### Clearable

```jsx live
() => {
  const [value, setValue] = useState([]);

  return (
    <>
      <DatePicker range value={value} onChange={setValue} clearable />
      <br />
      <DatePicker range defaultValue={[]} onChange={console.log} clearable />
    </>
  );
}
```

## API
