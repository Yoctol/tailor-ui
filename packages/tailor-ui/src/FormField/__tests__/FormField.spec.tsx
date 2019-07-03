import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { string } from 'yup';

import { fireEvent, render, wait } from 'test/test-utils';

import { FormField } from '../FormField';
import { Input } from '../../Input';

describe('FormField', () => {
  it('should render correctly', () => {
    const { container, getByLabelText } = render(
      <FormField label="Input">
        <Input id="input-id" placeholder="Placeholder" defaultValue="" />
      </FormField>
    );

    expect(getByLabelText('Input')).toBeInTheDocument();
    expect(container.querySelector('#input-id')).toBeInTheDocument();
    expect(container.querySelector('label[for=input-id]')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render generated id correctly', () => {
    const { container, getByLabelText } = render(
      <FormField label="Input">
        <Input placeholder="Placeholder" defaultValue="" />
      </FormField>
    );

    expect(getByLabelText('Input')).toBeInTheDocument();
    expect(container.querySelector('#tailor_uid_1')).toBeInTheDocument();
    expect(
      container.querySelector('label[for=tailor_uid_1]')
    ).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('validationMessage', () => {
    it('should render FormField with error message correctly', async () => {
      const { container, findByText } = render(
        <FormField label="Input" validationMessage="Error Message">
          <Input placeholder="Placeholder" defaultValue="" />
        </FormField>
      );

      const message = await findByText('Error Message');

      await wait(() =>
        expect(message.parentElement).toHaveStyle('opacity: 1; height: 22px')
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render FormField with error message correctly when change input value', async () => {
      const TextInput = () => {
        const [value, setValue] = useState('');

        return (
          <FormField
            label="Input"
            validationMessage={value === 'error' ? 'Error Message' : null}
          >
            <Input
              data-testid="input"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </FormField>
        );
      };

      const { getByTestId, findByText, queryByText } = render(<TextInput />);

      expect(queryByText('Error Message')).not.toBeInTheDocument();

      fireEvent.change(getByTestId('input'), {
        target: {
          value: 'error',
        },
      });

      const message = await findByText('Error Message');

      expect(message).toBeInTheDocument();
    });
  });

  describe('yup schema validator', () => {
    it('should render error message when input is invalid value', async () => {
      const { findByText } = render(
        <FormField
          label="Input"
          validator={string().test(
            'is-error',
            'Error Message',
            value => value !== 'error'
          )}
        >
          <Input defaultValue="error" placeholder="Placeholder" />
        </FormField>
      );

      const message = await findByText('Error Message');

      expect(message).toBeInTheDocument();
    });

    it('should not render error message when input is valid value', () => {
      const { queryByText } = render(
        <FormField
          label="Input"
          validator={string().test(
            'is-error',
            'Error Message',
            value => value !== 'error'
          )}
        >
          <Input defaultValue="valid input" placeholder="Placeholder" />
        </FormField>
      );

      expect(queryByText('Error Message')).not.toBeInTheDocument();
    });

    it('should render FormField with error message correctly when change input value', async () => {
      const { getByTestId, findByText, queryByText } = render(
        <FormField
          label="Input"
          validator={string().test(
            'is-error',
            'Error Message',
            value => value !== 'error'
          )}
        >
          <Input
            data-testid="input"
            defaultValue="valid input"
            placeholder="Placeholder"
          />
        </FormField>
      );

      expect(queryByText('Error Message')).not.toBeInTheDocument();
      fireEvent.change(getByTestId('input'), {
        target: {
          value: 'error',
        },
      });

      const message = await findByText('Error Message');
      expect(message).toBeInTheDocument();
    });
  });

  describe('function validator', () => {
    it('should render error message when input is invalid value', async () => {
      const { findByText } = render(
        <FormField
          label="Input"
          validator={value => (value === 'error' ? 'Error Message' : null)}
        >
          <Input defaultValue="error" placeholder="Placeholder" />
        </FormField>
      );

      const message = await findByText('Error Message');

      expect(message).toBeInTheDocument();
    });

    it('should not render error message when input is valid value', () => {
      const { queryByText } = render(
        <FormField
          label="Input"
          validator={value => (value === 'error' ? 'Error Message' : null)}
        >
          <Input defaultValue="valid input" placeholder="Placeholder" />
        </FormField>
      );

      expect(queryByText('Error Message')).not.toBeInTheDocument();
    });

    it('should render FormField with error message correctly when change input value', async () => {
      const { getByTestId, findByText, queryByText } = render(
        <FormField
          label="Input"
          validator={value => (value === 'error' ? 'Error Message' : null)}
        >
          <Input
            data-testid="input"
            defaultValue="valid input"
            placeholder="Placeholder"
          />
        </FormField>
      );

      expect(queryByText('Error Message')).not.toBeInTheDocument();
      fireEvent.change(getByTestId('input'), {
        target: {
          value: 'error',
        },
      });

      const message = await findByText('Error Message');

      expect(message).toBeInTheDocument();
    });
  });

  describe('object validator', () => {
    it('should render error message when input is invalid value', async () => {
      const { findByText } = render(
        <FormField
          label="Input"
          validator={{
            rule: value => value === 'error1',
            message: 'error message',
          }}
        >
          <Input defaultValue="error1" placeholder="Placeholder" />
        </FormField>
      );

      const message = await findByText('error message');
      expect(message).toBeInTheDocument();
    });

    it('should render error message when input is invalid value', async () => {
      const { findByText } = render(
        <FormField
          label="Input"
          validator={[
            {
              rule: value => value === 'error1',
              message: 'error message',
            },
            {
              rule: value => value === 'error2',
              message: 'another error message',
            },
          ]}
        >
          <Input defaultValue="error1" placeholder="Placeholder" />
        </FormField>
      );

      const message = await findByText('error message');
      expect(message).toBeInTheDocument();
    });

    it('should render error message when input is another invalid value', async () => {
      const { findByText } = render(
        <FormField
          label="Input"
          validator={[
            {
              rule: value => value === 'error1',
              message: 'error message',
            },
            {
              rule: value => value === 'error2',
              message: 'another error message',
            },
          ]}
        >
          <Input defaultValue="error2" placeholder="Placeholder" />
        </FormField>
      );

      const message = await findByText('another error message');
      expect(message).toBeInTheDocument();
    });

    it('should not render error message when input is valid', () => {
      const { queryByText } = render(
        <FormField
          label="Input"
          validator={[
            {
              rule: value => value === 'error1',
              message: 'error message',
            },
            {
              rule: value => value === 'error2',
              message: 'another error message',
            },
          ]}
        >
          <Input defaultValue="valid input" placeholder="Placeholder" />
        </FormField>
      );

      expect(queryByText('error message')).not.toBeInTheDocument();
      expect(queryByText('another error message')).not.toBeInTheDocument();
    });

    it('should render FormField with error message correctly when change input value', async () => {
      const { getByTestId, findByText, queryByText } = render(
        <FormField
          label="Input"
          validator={[
            {
              rule: value => value === 'error1',
              message: 'error message',
            },
            {
              rule: value => value === 'error2',
              message: 'another error message',
            },
          ]}
        >
          <Input
            data-testid="input"
            defaultValue="valid input"
            placeholder="Placeholder"
          />
        </FormField>
      );

      expect(queryByText('Error Message')).not.toBeInTheDocument();

      fireEvent.change(getByTestId('input'), {
        target: {
          value: 'error1',
        },
      });

      const message = await findByText('error message');
      expect(message).toBeInTheDocument();

      fireEvent.change(getByTestId('input'), {
        target: {
          value: 'error2',
        },
      });

      const message2 = await findByText('another error message');
      expect(message2).toBeInTheDocument();
    });
  });
});
