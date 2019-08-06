// stylelint-disable
import { css } from 'styled-components';

import { prefixClass, timePickerClass } from '../prefix';

export default css`
  ${prefixClass} {
    &-time-picker {
      position: absolute;
      top: 44px;
      width: 264px;
      height: 267px;
      background-color: white;
      border-top: ${p => p.theme.borders.base};
      border-color: ${p => p.theme.colors.gray200};

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
            min-height: 267px;
            max-height: 267px;
            li {
              padding: 4px 0;
              line-height: 28px;
              text-align: center;
            }
          }
        }
      }
    }
    &-time-picker-wrap {
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
  }
`;
