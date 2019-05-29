import React from 'react';

import { fireEvent, render, waitForElement } from 'test/test-utils';

import Upload from '../Upload';

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

  const { container, getByText } = renderer;

  const uploadInput = container.querySelector('input[type=file]');

  const file = new File(['example'], 'example.json', {
    type: 'application/json',
  });

  fireEvent.click(getByText('Click to Upload'));
  fireEvent.change(uploadInput, { target: { files: [file] } });

  // FIXME: Can not get the Uploading... button
  // await waitForElement(() => getByText('Uploading...'));
  await waitForElement(() => getByText('example.json'));
  expect(container).toContainElement(getByText('example.json'));

  await waitForElement(() => getByText(expectFinalStateText));

  expect(container).toHaveTextContent(expectFinalStateText);

  return {
    ...renderer,
    file,
  };
};

describe('Upload', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Upload onSelect={files => new Promise(resolve => resolve(files))} />
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

    const clearIcon = container.querySelector('i[cursor=pointer]');

    fireEvent.click(clearIcon);

    expect(container).toContainElement(getByText('Click to Upload'));
    expect(container).not.toContainElement(queryByText('example.json'));
    expect(handleClear).toBeCalledWith(file);
  });
});
