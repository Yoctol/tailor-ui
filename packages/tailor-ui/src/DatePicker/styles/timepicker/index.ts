// stylelint-disable
import { css } from 'styled-components';

import { timePickerClass } from '../prefix';

export default css`
  ${timePickerClass} {
    display: inline-block;
    box-sizing: border-box;
    * {
      box-sizing: border-box;
    }
  }

  ${timePickerClass}-panel-select {
    font-size: 14px;
    border: 1px solid #e9e9e9;
    border-width: 0 1px;
    margin-left: -1px;
    box-sizing: border-box;
    width: 56px;
    max-height: 144px;
    overflow-y: auto;
    position: relative;

    &-active {
      overflow-y: auto;
    }

    &:first-child {
      border-left: 0;
      margin-left: 0;
    }

    &:last-child {
      border-right: 0;
    }

    ul {
      list-style: none;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      width: 100%;
    }

    li {
      list-style: none;
      box-sizing: content-box;
      margin: 0;
      padding: 0 0 0 16px;
      width: 100%;
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      text-align: left;
      cursor: pointer;
      user-select: none;
      outline: none;

      &:hover {
        background: ${p => p.theme.colors.gray300};
      }
    }

    li&-option-selected {
      background-color: ${p => p.theme.colors.surface};
      font-weight: bold;
    }

    li&-option-disabled {
      color: #ccc;
      &:hover {
        background: transparent;
        cursor: not-allowed;
      }
    }
  }

  ${timePickerClass}-panel {
    z-index: 1070;
    width: 170px;
    position: absolute;
    box-sizing: border-box;

    * {
      box-sizing: border-box;
    }

    &-inner {
      display: inline-block;
      position: relative;
      outline: none;
      list-style: none;
      font-size: 14px;
      text-align: left;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: ${p => p.theme.shadows.sm};
      background-clip: padding-box;
      border: 1px solid #ccc;
      line-height: 1.5;
    }

    &-narrow {
      max-width: 113px;
    }

    &-input {
      margin: 0;
      padding: 0;
      width: 100%;
      cursor: auto;
      line-height: 1.5;
      outline: 0;
      border: 1px solid transparent;

      &-wrap {
        box-sizing: border-box;
        position: relative;
        padding: 6px;
        border-bottom: 1px solid #e9e9e9;
      }

      &-invalid {
        border-color: red;
      }
    }

    &-clear-btn {
      position: absolute;
      right: 6px;
      cursor: pointer;
      overflow: hidden;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      top: 6px;
      margin: 0;
    }

    &-clear-btn-icon:after {
      content: 'x';
      font-size: 14px;
      font-style: normal;
      color: #aaa;
      display: inline-block;
      line-height: 1;
      width: 20px;
      transition: color 0.3s ease;
    }

    &-clear-btn-icon:hover:after {
      color: #666;
    }
  }
`;
