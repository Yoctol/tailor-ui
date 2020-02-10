import React, { useCallback, useEffect } from 'react';

import { fireEvent, mockRaf, render, useMockRaf, wait } from 'test/test-utils';

import { ModalTypes } from '../HooksModal';
import { useModal } from '../useModal';

describe('useModal', () => {
  useMockRaf();

  const renderSpecifiedModal = async (type: ModalTypes) => {
    const HooksModal = () => {
      const modal = useModal();

      useEffect(() => {
        modal[type]({
          title: 'Title',
          content: 'Content',
        });
      }, [modal]);

      return null;
    };

    const { baseElement } = render(<HooksModal />);

    mockRaf.flush();

    return baseElement;
  };

  it('should render confirm modal correctly', async () => {
    const baseElement = await renderSpecifiedModal('confirm');

    expect(baseElement).toMatchSnapshot();
  });

  it('should render info modal correctly', async () => {
    const baseElement = await renderSpecifiedModal('info');

    expect(baseElement).toMatchSnapshot();
  });

  it('should render success modal correctly', async () => {
    const baseElement = await renderSpecifiedModal('success');

    expect(baseElement).toMatchSnapshot();
  });

  it('should render warning modal correctly', async () => {
    const baseElement = await renderSpecifiedModal('warning');

    expect(baseElement).toMatchSnapshot();
  });

  it('should render error modal correctly', async () => {
    const baseElement = await renderSpecifiedModal('error');

    expect(baseElement).toMatchSnapshot();
  });

  it('should trigger onCancel correctly', async () => {
    const cancelFn = jest.fn();

    const HooksModal = () => {
      const modal = useModal();

      useEffect(() => {
        modal.confirm({
          title: 'Title',
          content: 'Content',
          onCancel: cancelFn,
        });
      }, [modal]);

      return null;
    };

    const { getByText, queryByText } = render(<HooksModal />);

    mockRaf.flush();

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(cancelFn).toBeCalled();

    mockRaf.flush();

    expect(queryByText('Content')).toBeNull();
  });

  it('should trigger onConfirm correctly', async () => {
    const confirmFn = jest.fn();

    const HooksModal = () => {
      const modal = useModal();

      useEffect(() => {
        modal.confirm({
          title: 'Title',
          content: 'Content',
          onConfirm: confirmFn,
        });
      }, [modal]);

      return null;
    };

    const { getByText, queryByText } = render(<HooksModal />);

    mockRaf.flush();

    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(confirmFn).toBeCalled();

    mockRaf.flush();

    expect(queryByText('Content')).toBeNull();
  });

  describe('return values', () => {
    describe('array', () => {
      it('should return confirmation and await it confirm successfully', async () => {
        const confirmationFn = jest.fn();

        const HooksModal = () => {
          const modal = useModal();

          const renderModal = useCallback(async () => {
            const [confirmation] = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            if (await confirmation) {
              confirmationFn();
            }
          }, [modal]);

          useEffect(() => {
            renderModal();
          }, [renderModal]);

          return null;
        };

        const { getByText } = render(<HooksModal />);

        mockRaf.flush();

        const confirmButton = getByText('Confirm');
        fireEvent.click(confirmButton);

        await wait(() => expect(confirmationFn).toBeCalled());
      });

      it('should return confirmation and await it not confirm successfully', async () => {
        const confirmationFn = jest.fn();

        const HooksModal = () => {
          const modal = useModal();

          const renderModal = useCallback(async () => {
            const [confirmation] = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            if (!(await confirmation)) {
              confirmationFn();
            }
          }, [modal]);

          useEffect(() => {
            renderModal();
          }, [renderModal]);

          return null;
        };

        const { getByText } = render(<HooksModal />);

        mockRaf.flush();

        const cancelButton = getByText('Cancel');
        fireEvent.click(cancelButton);

        await wait(() => expect(confirmationFn).toBeCalled());
      });

      it('should return close and call it to close modal successfully', async () => {
        const HooksModal = () => {
          const modal = useModal();

          const renderModal = useCallback(async () => {
            const [, close] = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            close();
          }, [modal]);

          useEffect(() => {
            renderModal();
          }, [renderModal]);

          return null;
        };

        const { queryByText } = render(<HooksModal />);

        mockRaf.flush();

        expect(queryByText('Content')).not.toBeInTheDocument();
      });

      it('should return update and call it to update modal successfully', async () => {
        const HooksModal = () => {
          const modal = useModal();

          const renderModal = useCallback(async () => {
            const [, , update] = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            update({
              content: 'New Content',
            });
          }, [modal]);

          useEffect(() => {
            renderModal();
          }, [renderModal]);

          return null;
        };

        const { getByText } = render(<HooksModal />);

        mockRaf.flush();

        expect(getByText('New Content')).toBeVisible();
      });
    });

    describe('object', () => {
      it('should return confirmation and await it confirm successfully', async () => {
        const confirmationFn = jest.fn();

        const HooksModal = () => {
          const modal = useModal();

          const renderModal = useCallback(async () => {
            const { confirmation } = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            if (await confirmation) {
              confirmationFn();
            }
          }, [modal]);

          useEffect(() => {
            renderModal();
          }, [renderModal]);

          return null;
        };

        const { getByText } = render(<HooksModal />);

        mockRaf.flush();

        const confirmButton = getByText('Confirm');
        fireEvent.click(confirmButton);

        await wait(() => expect(confirmationFn).toBeCalled());
      });

      it('should return confirmation and await it not confirm successfully', async () => {
        const confirmationFn = jest.fn();

        const HooksModal = () => {
          const modal = useModal();

          const renderModal = useCallback(async () => {
            const { confirmation } = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            if (!(await confirmation)) {
              confirmationFn();
            }
          }, [modal]);

          useEffect(() => {
            renderModal();
          }, [renderModal]);

          return null;
        };

        const { getByText } = render(<HooksModal />);

        mockRaf.flush();

        const cancelButton = getByText('Cancel');
        fireEvent.click(cancelButton);

        await wait(() => expect(confirmationFn).toBeCalled());
      });

      it('should return close and call it to close modal successfully', async () => {
        const HooksModal = () => {
          const modal = useModal();

          const renderModal = useCallback(async () => {
            const { close } = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            close();
          }, [modal]);

          useEffect(() => {
            renderModal();
          }, [renderModal]);

          return null;
        };

        const { queryByText } = render(<HooksModal />);

        mockRaf.flush();

        expect(queryByText('Content')).not.toBeInTheDocument();
      });

      it('should return update and call it to update modal successfully', async () => {
        const HooksModal = () => {
          const modal = useModal();

          const renderModal = useCallback(async () => {
            const { update } = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            update({
              content: 'New Content',
            });
          }, [modal]);

          useEffect(() => {
            renderModal();
          }, [renderModal]);

          return null;
        };

        const { getByText } = render(<HooksModal />);

        mockRaf.flush();

        expect(getByText('New Content')).toBeVisible();
      });
    });
  });
});
