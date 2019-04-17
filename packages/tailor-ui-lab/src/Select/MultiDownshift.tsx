import Downshift from 'downshift';
import React, { Component } from 'react';

import { itemToString } from './utils';

type Option =
  | {
      label: string;
      value: string;
    }
  | string
  | number;

interface MultiDownshiftProps {
  onSelect: (options: Option[], stateAndHelpers: any) => void;
  onChange: (options: Option[], stateAndHelpers: any) => void;
  children: (downshift: any) => any;
}

interface MultiDownshiftState {
  selectedItems: Option[];
}

class MultiDownshift extends Component<
  MultiDownshiftProps,
  MultiDownshiftState
> {
  state: MultiDownshiftState = {
    selectedItems: [],
  };

  stateReducer = (state: any, changes: any) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
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

  handleSelection = (selectedItem: Option, downshift: any) => {
    const callOnChange = () => {
      const { onSelect, onChange } = this.props;
      const { selectedItems } = this.state;
      if (onSelect) {
        onSelect(selectedItems, this.getStateAndHelpers(downshift));
      }
      if (onChange) {
        onChange(selectedItems, this.getStateAndHelpers(downshift));
      }
    };

    if (
      this.state.selectedItems
        .map(itemToString)
        .includes(itemToString(selectedItem))
    ) {
      this.removeItem(selectedItem, callOnChange);
    } else {
      this.addSelectedItem(selectedItem, callOnChange);
    }
  };

  removeItem = (item: Option, cb?: () => void) => {
    this.setState(({ selectedItems }) => {
      return {
        selectedItems: selectedItems.filter(i => i !== item),
      };
    }, cb);
  };

  addSelectedItem(item: Option, cb: () => void) {
    this.setState(
      ({ selectedItems }) => ({
        selectedItems: [...selectedItems, item],
      }),
      cb
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

  getStateAndHelpers(downshift: any) {
    const { selectedItems } = this.state;
    const { getRemoveButtonProps, removeItem } = this;
    return {
      getRemoveButtonProps,
      removeItem,
      selectedItems,
      ...downshift,
    };
  }

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
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    );
  }
}

export default MultiDownshift;
