import Downshift, { DownshiftInterface } from 'downshift3';
import React, { Component, ReactNode } from 'react';

import { itemToString } from './utils';

type Option =
  | {
      label: string;
      value: string;
    }
  | string
  | number;

type MultiDownshiftProps = DownshiftInterface<Option> & {
  selectedItem?: Option[];
  initialSelectedItem?: Option[];
  onSelect?: (options: Option | Option[]) => void;
  onChange?: (options: Option | Option[]) => void;
  children: (options: any) => ReactNode;
};

interface MultiDownshiftState {
  selectedItems: Option[];
}

class MultiDownshift extends Component<
  MultiDownshiftProps,
  MultiDownshiftState
> {
  state: MultiDownshiftState = {
    selectedItems:
      this.props.initialSelectedItem || this.props.selectedItem || [],
  };

  get selectedItems() {
    const { selectedItem } = this.props;

    if (selectedItem) {
      return selectedItem;
    }

    return this.state.selectedItems;
  }

  stateReducer = (state: any, changes: any) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.blurButton:
        return {};
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.mouseUp:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
          inputValue: '',
        };
      default:
        return changes;
    }
  };

  handleChange = () => {
    const { onSelect, onChange } = this.props;
    const { selectedItems } = this.state;

    if (onSelect) {
      onSelect(selectedItems);
    }
    if (onChange) {
      onChange(selectedItems);
    }
  };

  handleSelection = (selectedItem: Option) => {
    const { onSelect, onChange } = this.props;

    if ((selectedItem as any).label === 'CREATE_OPTION') {
      if (onSelect) {
        onSelect(selectedItem);
      }
      if (onChange) {
        onChange(selectedItem);
      }

      return;
    }

    if (
      this.state.selectedItems
        .map(itemToString)
        .includes(itemToString(selectedItem))
    ) {
      this.removeItem(selectedItem);
    } else {
      this.addSelectedItem(selectedItem);
    }
  };

  removeItem = (item: Option) => {
    this.setState(
      {
        selectedItems: this.selectedItems.filter(
          (i) => itemToString(i) !== itemToString(item)
        ),
      },
      this.handleChange
    );
  };

  addSelectedItem(item: Option) {
    this.setState(
      {
        selectedItems: [...this.selectedItems, item],
      },
      this.handleChange
    );
  }

  getRemoveButtonProps = ({
    onClick,
    item,
    ...props
  }: {
    onClick?: (e: any) => void;
    item: Option;
  }) => {
    return {
      onClick: (e: any) => {
        // TODO: use something like downshift's composeEventHandlers utility instead
        if (onClick) {
          onClick(e);
        }
        e.stopPropagation();
        this.removeItem(item);
      },
      ...props,
    };
  };

  render() {
    const { children, ...props } = this.props;
    // TODO: compose together props (rather than overwriting them) like downshift does
    return (
      <Downshift
        {...props}
        stateReducer={this.stateReducer}
        onChange={this.handleSelection}
        selectedItem={null}
      >
        {(downshift) =>
          children({
            getRemoveButtonProps: this.getRemoveButtonProps,
            removeItem: this.removeItem,
            selectedItems: this.selectedItems,
            ...downshift,
          })
        }
      </Downshift>
    );
  }
}

export default MultiDownshift;
