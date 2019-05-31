import React, { useState } from 'react';

import { fireEvent, render } from 'test/test-utils';

import FormField from '../FormField';
import Input from '../../Input';

jest.mock('../../utils/createUIDGenerator', () => () => () =>
  'tailor_form-field_xx'
);

describe('FormField', () => {
  it('should render correctly', () => {
    const { container, getByLabelText } = render(
      <FormField label="Input">
        <Input id="input-id" placeholder="Placeholder" />
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
        <Input placeholder="Placeholder" />
      </FormField>
    );

    expect(getByLabelText('Input')).toBeInTheDocument();
    expect(
      container.querySelector('#tailor_form-field_xx')
    ).toBeInTheDocument();
    expect(
      container.querySelector('label[for=tailor_form-field_xx]')
    ).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('validationMessage', () => {
    it('should render FormField with error message correctly', () => {
      const { container, getByText } = render(
        <FormField label="Input" validationMessage="Error Message">
          <Input placeholder="Placeholder" />
        </FormField>
      );

      expect(getByText('Error Message')).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render FormField with error message correctly when change input value', () => {
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

      const { getByTestId, getByText, queryByText } = render(<TextInput />);

      expect(queryByText('Error Message')).not.toBeInTheDocument();
      fireEvent.change(getByTestId('input'), {
        target: {
          value: 'error',
        },
      });

      expect(getByText('Error Message')).toBeInTheDocument();
    });
  });

  describe('function validator', () => {
    it('should render error message when input is invalid value', () => {
      const { getByText } = render(
        <FormField
          label="Input"
          validator={value => (value === 'error' ? 'Error Message' : null)}
        >
          <Input defaultValue="error" placeholder="Placeholder" />
        </FormField>
      );

      expect(getByText('Error Message')).toBeInTheDocument();
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

    it('should render FormField with error message correctly when change input value', () => {
      const { getByTestId, getByText, queryByText } = render(
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

      expect(getByText('Error Message')).toBeInTheDocument();
    });
  });

  describe('object validator', () => {
    it('should render error message when input is invalid value', () => {
      const { getByText } = render(
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

      expect(getByText('error message')).toBeInTheDocument();
    });

    it('should render error message when input is another invalid value', () => {
      const { getByText } = render(
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

      expect(getByText('another error message')).toBeInTheDocument();
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

    it('should render FormField with error message correctly when change input value', () => {
      const { getByTestId, getByText, queryByText } = render(
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
      expect(getByText('error message')).toBeInTheDocument();

      fireEvent.change(getByTestId('input'), {
        target: {
          value: 'error2',
        },
      });
      expect(getByText('another error message')).toBeInTheDocument();
    });
  });
});
