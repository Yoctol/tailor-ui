import React, { useCallback, useEffect } from 'react';
import userEvent from '@testing-library/user-event';

import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from 'test/test-utils';

import { ModalTypes } from '../HooksModal';
import { useModal } from '../useModal';

describe('useModal', () => {
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

    render(<HooksModal />);

    const cancelButton = await screen.findByText('Cancel');
    userEvent.click(cancelButton);

    expect(cancelFn).toBeCalled();

    await waitForElementToBeRemoved(() => screen.queryByText('Content'));
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

    render(<HooksModal />);

    const confirmButton = screen.getByText('Confirm');
    userEvent.click(confirmButton);

    expect(confirmFn).toBeCalled();

    await waitForElementToBeRemoved(() => screen.queryByText('Content'));
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

        render(<HooksModal />);

        const confirmButton = screen.getByText('Confirm');
        userEvent.click(confirmButton);

        await waitForElementToBeRemoved(screen.queryByText('Confirm'));
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

        render(<HooksModal />);

        const cancelButton = screen.getByText('Cancel');
        userEvent.click(cancelButton);

        await waitFor(() => expect(confirmationFn).toBeCalled());
      });

      it('should return close and call it to close modal successfully', async () => {
        const HooksModal = () => {
          const modal = useModal();

          useEffect(() => {
            const [, close] = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            close();
          }, [modal]);

          return null;
        };

        render(<HooksModal />);

        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });

      it('should return update and call it to update modal successfully', async () => {
        const HooksModal = () => {
          const modal = useModal();

          useEffect(() => {
            const [, , update] = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            update({
              content: 'New Content',
            });
          }, [modal]);

          return null;
        };

        render(<HooksModal />);

        expect(screen.getByText('New Content')).toBeInTheDocument();
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

        render(<HooksModal />);

        const confirmButton = screen.getByText('Confirm');
        userEvent.click(confirmButton);

        await waitFor(() => expect(confirmationFn).toBeCalled());
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

        render(<HooksModal />);

        const cancelButton = screen.getByText('Cancel');
        userEvent.click(cancelButton);

        await waitFor(() => expect(confirmationFn).toBeCalled());
      });

      it('should return close and call it to close modal successfully', async () => {
        const HooksModal = () => {
          const modal = useModal();

          useEffect(() => {
            const { close } = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            close();
          }, [modal]);

          return null;
        };

        render(<HooksModal />);

        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });

      it('should return update and call it to update modal successfully', async () => {
        const HooksModal = () => {
          const modal = useModal();

          useEffect(() => {
            const { update } = modal.confirm({
              title: 'Title',
              content: 'Content',
            });

            update({
              content: 'New Content',
            });
          }, [modal]);

          return null;
        };

        render(<HooksModal />);

        expect(screen.getByText('New Content')).toBeVisible();
      });
    });
  });
});
