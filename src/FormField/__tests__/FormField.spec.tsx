import React, { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { string } from 'yup';

import { render, screen } from 'test/test-utils';

import { Button } from '../../Button';
import { FormField } from '../FormField';
import { Input } from '../../Input';

describe('FormField', () => {
  it('should render correctly', () => {
    const { container } = render(
      <FormField label="Input">
        <Input id="input-id" placeholder="Placeholder" defaultValue="" />
      </FormField>
    );

    expect(screen.getByLabelText('Input')).toBeInTheDocument();
    expect(container.querySelector('#input-id')).toBeInTheDocument();
    expect(container.querySelector('label[for=input-id]')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render generated id correctly', () => {
    const { container } = render(
      <FormField label="Input">
        <Input placeholder="Placeholder" defaultValue="" />
      </FormField>
    );

    expect(screen.getByLabelText('Input')).toBeInTheDocument();
    expect(container.querySelector('#tailor_uid_1')).toBeInTheDocument();
    expect(
      container.querySelector('label[for=tailor_uid_1]')
    ).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('validationMessage', () => {
    it('should render FormField with error message correctly', async () => {
      const { container } = render(
        <FormField label="Input" validationMessage="Error Message">
          <Input placeholder="Placeholder" defaultValue="" />
        </FormField>
      );

      const message = screen.getByText('Error Message');

      expect(message).toBeVisible();
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
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Placeholder"
            />
          </FormField>
        );
      };

      render(<TextInput />);
      const input = screen.getByPlaceholderText('Placeholder');

      expect(screen.queryByText('Error Message')).not.toBeInTheDocument();

      userEvent.type(input, 'error');

      const message = screen.getByText('Error Message');
      expect(message).toBeInTheDocument();
    });

    it('should render FormField with error message correctly when change validationMessage props', async () => {
      const TextInput = () => {
        const [hasError, setHasError] = useState(false);

        return (
          <>
            <Button onClick={() => setHasError(true)}>Show Error</Button>
            <FormField
              label="Input"
              validationMessage={hasError ? 'Error Message' : null}
            >
              <Input defaultValue="" />
            </FormField>
          </>
        );
      };

      render(<TextInput />);

      expect(screen.queryByText('Error Message')).not.toBeInTheDocument();

      userEvent.click(screen.getByText('Show Error'));

      const message = screen.getByText('Error Message');
      expect(message).toBeInTheDocument();
    });
  });

  describe('yup schema validator', () => {
    it('should render error message when input is invalid value', async () => {
      render(
        <FormField
          label="Input"
          validator={string().test(
            'is-error',
            'Error Message',
            (value) => value !== 'error'
          )}
        >
          <Input defaultValue="error" placeholder="Placeholder" />
        </FormField>
      );

      const message = screen.getByText('Error Message');
      expect(message).toBeInTheDocument();
    });

    it('should not render error message when input is valid value', () => {
      render(
        <FormField
          label="Input"
          validator={string().test(
            'is-error',
            'Error Message',
            (value) => value !== 'error'
          )}
        >
          <Input defaultValue="valid input" placeholder="Placeholder" />
        </FormField>
      );

      expect(screen.queryByText('Error Message')).not.toBeInTheDocument();
    });

    it('should render FormField with error message correctly when change input value', async () => {
      render(
        <FormField
          label="Input"
          validator={string().test(
            'is-error',
            'Error Message',
            (value) => value !== 'error'
          )}
        >
          <Input defaultValue="valid input" placeholder="Placeholder" />
        </FormField>
      );

      const input = screen.getByPlaceholderText('Placeholder');

      expect(screen.queryByText('Error Message')).not.toBeInTheDocument();
      userEvent.type(input, '{selectall}{backspace}error');

      const message = screen.getByText('Error Message');
      expect(message).toBeInTheDocument();
    });
  });

  describe('function validator', () => {
    it('should render error message when input is invalid value', async () => {
      render(
        <FormField
          label="Input"
          validator={(value) => (value === 'error' ? 'Error Message' : null)}
        >
          <Input defaultValue="error" placeholder="Placeholder" />
        </FormField>
      );

      const message = screen.getByText('Error Message');
      expect(message).toBeInTheDocument();
    });

    it('should not render error message when input is valid value', () => {
      render(
        <FormField
          label="Input"
          validator={(value) => (value === 'error' ? 'Error Message' : null)}
        >
          <Input defaultValue="valid input" placeholder="Placeholder" />
        </FormField>
      );

      expect(screen.queryByText('Error Message')).not.toBeInTheDocument();
    });

    it('should render FormField with error message correctly when change input value', async () => {
      render(
        <FormField
          label="Input"
          validator={(value) => (value === 'error' ? 'Error Message' : null)}
        >
          <Input defaultValue="valid input" placeholder="Placeholder" />
        </FormField>
      );

      const input = screen.getByPlaceholderText('Placeholder');

      expect(screen.queryByText('Error Message')).not.toBeInTheDocument();
      userEvent.type(input, '{selectall}{backspace}error');

      const message = screen.getByText('Error Message');
      expect(message).toBeInTheDocument();
    });
  });

  describe('object validator', () => {
    it('should render error message when input is invalid value', async () => {
      render(
        <FormField
          label="Input"
          validator={{
            rule: (value) => value === 'error1',
            message: 'error message',
          }}
        >
          <Input defaultValue="error1" placeholder="Placeholder" />
        </FormField>
      );

      const message = screen.getByText('error message');
      expect(message).toBeInTheDocument();
    });

    it('should render error message when input is invalid value', async () => {
      render(
        <FormField
          label="Input"
          validator={[
            {
              rule: (value) => value === 'error1',
              message: 'error message',
            },
            {
              rule: (value) => value === 'error2',
              message: 'another error message',
            },
          ]}
        >
          <Input defaultValue="error1" placeholder="Placeholder" />
        </FormField>
      );

      const message = screen.getByText('error message');
      expect(message).toBeInTheDocument();
    });

    it('should render error message when input is another invalid value', async () => {
      render(
        <FormField
          label="Input"
          validator={[
            {
              rule: (value) => value === 'error1',
              message: 'error message',
            },
            {
              rule: (value) => value === 'error2',
              message: 'another error message',
            },
          ]}
        >
          <Input defaultValue="error2" placeholder="Placeholder" />
        </FormField>
      );

      const message = screen.getByText('another error message');
      expect(message).toBeInTheDocument();
    });

    it('should not render error message when input is valid', () => {
      render(
        <FormField
          label="Input"
          validator={[
            {
              rule: (value) => value === 'error1',
              message: 'error message',
            },
            {
              rule: (value) => value === 'error2',
              message: 'another error message',
            },
          ]}
        >
          <Input defaultValue="valid input" placeholder="Placeholder" />
        </FormField>
      );

      expect(screen.queryByText('error message')).not.toBeInTheDocument();
      expect(
        screen.queryByText('another error message')
      ).not.toBeInTheDocument();
    });

    it('should render FormField with error message correctly when change input value', async () => {
      render(
        <FormField
          label="Input"
          validator={[
            {
              rule: (value) => value === 'error1',
              message: 'error message',
            },
            {
              rule: (value) => value === 'error2',
              message: 'another error message',
            },
          ]}
        >
          <Input defaultValue="valid input" placeholder="Placeholder" />
        </FormField>
      );

      expect(screen.queryByText('Error Message')).not.toBeInTheDocument();

      const input = screen.getByPlaceholderText('Placeholder');

      userEvent.type(input, '{selectall}{backspace}error1');
      const message = screen.getByText('error message');
      expect(message).toBeInTheDocument();

      userEvent.type(input, '{selectall}{backspace}error2');
      const message2 = screen.getByText('another error message');
      expect(message2).toBeInTheDocument();
    });
  });
});
