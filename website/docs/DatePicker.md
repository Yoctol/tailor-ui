---
id: date-picker
title: DatePicker
---

To select or input a date.

## When To Use

By clicking the input box, you can select a date from a popup calendar.

## Examples

```js
import { DatePicker, RangeDatePicker } from 'tailor-ui';
```

### Date picker

#### Basic usage

```jsx live
<DatePicker defaultValue={new Date()} onChange={console.log} />
```

#### Controlled usage

```jsx live
() => {
  const [value, setValue] = useState(new Date());

  return (
    <>
      <DatePicker value={value} onChange={setValue} />
      <br />
      <br />
      <Button mt="2" onClick={() => setValue(DateFns.subDays(new Date(), 3))}>
        Set to 3 days ago
      </Button>
    </>
  );
};
```

#### allowClear

```jsx live
() => {
  const [value, setValue] = useState(new Date());

  return (
    <>
      <DatePicker value={value} onChange={setValue} allowClear />
      <br />
      <br />
      <DatePicker defaultValue={new Date()} onChange={console.log} allowClear />
    </>
  );
};
```

#### Choose Time

```jsx live
<DatePicker
  onChange={console.log}
  placeholder="Please Select Date & Time"
  showTime={{
    showSecond: true,
  }}
/>
```

#### Choose Time & with minute step

```jsx live
<DatePicker
  onChange={console.log}
  format="YYYY-MM-DD HH:mm"
  showTime={{
    showSecond: false,
    minuteStep: 15,
  }}
/>
```

#### Disabled Specified Date

```jsx live
<DatePicker
  disabledDate={(current) => {
    const date = new Date();
    return DateFns.isBefore(current, date);
  }}
  onChange={console.log}
/>
```

### Ranger picker

#### Basic usage

```jsx live
() => {
  const [value, setValue] = useState([new Date(), new Date()]);

  return (
    <>
      <DateRangePicker defaultValue={[new Date(), new Date()]} />
      <br />
      <br />
      <DateRangePicker value={value} onChange={setValue} />
    </>
  );
};
```

#### With time picker

```jsx live
<DateRangePicker showTime defaultValue={[new Date(), new Date()]} />
```

#### allowClear

```jsx live
() => {
  const [value, setValue] = useState([]);

  return (
    <>
      <DateRangePicker value={value} onChange={setValue} allowClear />
      <br />
      <br />
      <DateRangePicker defaultValue={[]} onChange={console.log} allowClear />
    </>
  );
};
```

### Calendar usage

```jsx live
<DatePickerPanel
  defaultValue={new Date()}
  onChange={console.log}
  dateRender={(date, today) => (
    <div
      style={{
        width: 80,
        height: 80,
        borderTop: '3px solid #CCC',
        borderTopColor: DateFns.isSameDay(date, today) ? 'blue' : '#CCC',
      }}
    >
      {DateFns.format(date, 'd')}
    </div>
  )}
/>
```

## API

### Common API

| Property       | Description                                 | Type                                                 | Default |
| -------------- | ------------------------------------------- | ---------------------------------------------------- | ------- |
| `allowClear`   | Whether to show clear button                | `boolean`                                            | `false` |
| `showTime`     | to provide an additional time selection     | `boolean \| ShowTime Options`                        | `false` |
| `disabledDate` | specify the date that cannot be selected    | `(current: Date) => boolean`                         |         |
| `disabledTime` | to specify the time that cannot be selected | `(current: Date, type: 'start' \| 'end') => boolean` |         |
| `placeholder`  | placeholder of date input                   | `string`                                             |         |

#### ShowTime Options

| Property              | Description                        | Type      | Default |
| --------------------- | ---------------------------------- | --------- | ------- |
| `showHour`            | whether show hour                  | `Boolean` | `true`  |
| `showMinute`          | whether show minute                | `Boolean` | `true`  |
| `showSecond`          | whether show second                | `Boolean` | `true`  |
| `use12Hours`          | 12 hours display mode              | `Boolean` | `false` |
| `hourStep`            | interval between hours in picker   | `Number`  | 1       |
| `minuteStep`          | interval between minutes in picker | `Number`  | 1       |
| `secondStep`          | interval between seconds in picker | `Number`  | 1       |
| `hideDisabledOptions` | whether hide disabled options      | `Boolean` | false   |

### DatePicker

| Property       | Description                                                                                                  | Type                                                          | Default |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ------- |
| `value`        | to set date                                                                                                  | `Date`                                                        |
| `defaultValue` | to set default date, if start time or end time is null or undefined, the date range will be an open interval | `Date`                                                        |         |
| `onChange`     | a callback function, can be executed when the selected time is changing                                      | `(date: Date \| null, dateStrings: [string, string]) => void` |         |

### RangeDatePicker

| Property       | Description                                                                                                  | Type                                                                                     | Default |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------- |
| `value`        | to set date                                                                                                  | `[Date, Date]`                                                                           |
| `defaultValue` | to set default date, if start time or end time is null or undefined, the date range will be an open interval | `[Date, Date]`                                                                           |         |
| `onChange`     | a callback function, can be executed when the selected time is changing                                      | `(date: [Date, Date] \| null) => void`                                                   |         |
| `ranges`       | preseted ranges for quick selection                                                                          | `{ String \| [range: string]: [Date, Date] } \| { [range: string]: () => [Date, Date] }` |         |
