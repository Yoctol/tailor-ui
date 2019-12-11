---
id: steps
title: Steps
---

`Steps` is a navigation bar that guides users through the steps of a task.

## When To Use

When the task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.

## Examples

### Basic

```jsx live
<>
  <Steps current={1}>
    <Steps.Step title="Finished" description="This is a description" />
    <Steps.Step title="In Progress" description="This is a description" />
    <Steps.Step title="Waiting" description="This is a description" />
  </Steps>
  <br />
  <Steps current={1}>
    <Steps.Step title="Finished" />
    <Steps.Step title="In Progress" />
    <Steps.Step title="Waiting" />
  </Steps>
</>
```

### Error status

```jsx live
<>
  <Steps current={1}>
    <Steps.Step title="Finished" description="This is a description" />
    <Steps.Step
      status="error"
      title="In Progress"
      description="This is a description"
    />
    <Steps.Step title="Waiting" description="This is a description" />
  </Steps>
  <br />
  <Steps current={1}>
    <Steps.Step title="Finished" />
    <Steps.Step status="error" title="In Progress" />
    <Steps.Step title="Waiting" />
  </Steps>
</>
```

### Vertical

```jsx live
<>
  <Steps current={1} direction="vertical">
    <Steps.Step title="Finished" description="This is a description" />
    <Steps.Step title="In Progress" description="This is a description" />
    <Steps.Step title="Waiting" description="This is a description" />
  </Steps>
  <br />
  <Steps current={1} direction="vertical">
    <Steps.Step title="Finished" />
    <Steps.Step title="In Progress" />
    <Steps.Step title="Waiting" />
  </Steps>
</>
```

### Vertical & Error status

```jsx live
<>
  <Steps current={1} direction="vertical">
    <Steps.Step title="Finished" description="This is a description" />
    <Steps.Step
      status="error"
      title="In Progress"
      description="This is a description"
    />
    <Steps.Step title="Waiting" description="This is a description" />
  </Steps>
  <br />
  <Steps current={1} direction="vertical">
    <Steps.Step title="Finished" />
    <Steps.Step status="error" title="In Progress" />
    <Steps.Step title="Waiting" />
  </Steps>
</>
```

### Switch Step

```jsx live
() => {
  const message = useMessage();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];

  return (
    <div>
      <Steps current={step} onCurrentChange={setStep}>
        {steps.map(({ title }) => (
          <Steps.Step
            key={title}
            title={title}
            description="This is a description"
          />
        ))}
      </Steps>

      <Flex
        my="4"
        height="200px"
        alignItems="center"
        justifyContent="center"
        bg="gray300"
        borderRadius="1"
      >
        {steps[step].content}
      </Flex>

      {step < steps.length - 1 && (
        <Button variant="primary" onClick={() => setStep(step + 1)}>
          Next
        </Button>
      )}
      {step === steps.length - 1 && (
        <Button
          variant="primary"
          onClick={() => message.success('Processing complete!')}
        >
          Done
        </Button>
      )}
      {step > 0 && (
        <Button ml="2" onClick={() => setStep(step - 1)}>
          Previous
        </Button>
      )}
    </div>
  );
}
```

## API

### Steps

### Steps.Step
