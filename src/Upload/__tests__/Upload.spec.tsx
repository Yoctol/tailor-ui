import React from 'react';
import userEvent from '@testing-library/user-event';

import { render } from 'test/test-utils';

import { Upload } from '../Upload';

const setup = async ({
  handleSelect,
  handleClear,
  expectFinalStateText,
}: {
  handleSelect: () => Promise<any>;
  handleClear?: () => void;
  expectFinalStateText: string;
}) => {
  const renderer = render(
    <Upload onSelect={handleSelect} onClear={handleClear} />
  );

  const { container, getByText, findByText } = renderer;

  const uploadInput = container.querySelector(
    'input[type=file]'
  ) as HTMLInputElement;

  const file = new File(['example'], 'example.json', {
    type: 'application/json',
  });

  userEvent.click(getByText('Click to Upload'));
  userEvent.upload(uploadInput, file);

  // FIXME: Can not get the Uploading... button
  // await findByText('Uploading...');
  await findByText('example.json');
  expect(container).toContainElement(getByText('example.json'));

  await findByText(expectFinalStateText);

  expect(container).toHaveTextContent(expectFinalStateText);

  return {
    ...renderer,
    file,
  };
};

describe('Upload', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Upload onSelect={(files) => new Promise((resolve) => resolve(files))} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show correctly text when uploaded success', async () => {
    const handleSelect = jest.fn().mockResolvedValue(true);
    const expectFinalStateText = 'Upload Completed!';

    await setup({ handleSelect, expectFinalStateText });
  });

  it('should show correctly text when uploaded failed', async () => {
    const handleSelect = jest.fn().mockRejectedValue(true);
    const expectFinalStateText = 'Upload Failed!';

    await setup({ handleSelect, expectFinalStateText });
  });

  it('should not show filename when clear file', async () => {
    const handleSelect = jest.fn().mockResolvedValue(true);
    const handleClear = jest.fn();
    const expectFinalStateText = 'Upload Completed!';

    const { container, queryByText, getByText, file } = await setup({
      handleSelect,
      handleClear,
      expectFinalStateText,
    });

    const clearIcon = container.querySelector('i[cursor=pointer]') as Element;

    userEvent.click(clearIcon);

    expect(container).toContainElement(getByText('Click to Upload'));
    expect(container).not.toContainElement(queryByText('example.json'));
    expect(handleClear).toBeCalledWith(file);
  });
});
