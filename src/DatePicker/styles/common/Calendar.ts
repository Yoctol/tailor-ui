// stylelint-disable
import { css } from 'utils/styled-components';

import theme from '../../../theme';
import { prefixClass, timePickerClass } from '../prefix';

export default css`
  ${prefixClass} {
    &-input-wrap {
      position: relative;
      padding: 6px;
      border-bottom: 1px solid #e9e9e9;
      &::after {
        content: '';
        clear: both;
      }
    }

    &-date-input-wrap {
      overflow: hidden;
    }

    &-time-picker {
      position: absolute;
      top: 34px;
      width: 100%;
      height: 217px;
      background-color: white;

      &-panel {
        position: relative;
        width: 100%;

        ${timePickerClass}-panel {
          &-input-wrap {
            display: none;
          }
          &-inner {
            width: 100%;
            border: none;
            box-shadow: none;
          }
          &-combobox {
            display: flex;
          }
          &-select {
            flex: auto;
            width: 84px;
            min-height: 217px;
            max-height: 217px;
            li {
              padding: 0;
              text-align: center;
            }
          }
        }
      }
    }
    &-time-picker-wrap {
      float: left;
      width: 100%;

      ${timePickerClass} {
        width: 100%;

        &-input {
          padding: 0;
          border: 1px solid transparent;
          height: 22px;
          outline: 0;
        }

        &-icon {
          display: none;
        }
      }
    }

    &-input {
      width: 100%;
      color: ${theme.colors.gray700};
      border: 1px solid transparent;
      border-radius: 4px;
      cursor: text;
      font-size: 16px;
      line-height: 1.5;
      outline: 0;
      height: 22px;

      &-invalid {
        border-color: ${theme.colors.danger};
      }

      &::placeholder {
        color: ${theme.colors.gray400};
      }
    }

    &-clear-btn {
      z-index: 9999;
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

    &-clear-btn:after {
      content: 'x';
      font-size: 12px;
      color: ${theme.colors.gray400};
      display: inline-block;
      line-height: 1;
      width: 20px;
      transition: color 0.3s ease;
    }

    &-clear-btn:hover:after {
      color: ${theme.colors.gray700};
    }
  }
`;
