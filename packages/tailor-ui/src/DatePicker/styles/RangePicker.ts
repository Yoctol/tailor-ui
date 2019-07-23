// stylelint-disable
import { css } from 'styled-components';

import { prefixClass, timePickerClass } from './prefix';

export default css`
${prefixClass}-range {
  width: 502px;
  overflow: hidden;

  &-part {
    width: 250px;
    position: relative;

    ${prefixClass}-time-picker {
      top: 34px;
      &-panel {
        &-select {
          width: 77px;
        }
      }
    }
  }

  &-left {
    float: left;
    ${prefixClass}-time-picker-panel {
      &-select:last-child {
        border-right: 1px solid #e9e9e9;
      }

    }
  }

  &-right {
    float: right;
    ${prefixClass}-time-picker-panel {
      left: 21px;

      &-select:first-child {
        border-left: 1px solid #e9e9e9;
      }
    }
  }

  &-middle {
    position: absolute;
    margin-left: -10px;
    text-align: center;
    height: 36px;
    line-height: 36px;
  }
  ${prefixClass}-date-panel::after {
    content:".";
    display:block;
    height:0;
    clear:both;
    visibility:hidden;
  }

  ${prefixClass}-input-wrap {
    height: 36px;
  }
  ${prefixClass}-input,
${timePickerClass}-input {
    padding: 1px 7px;
    height: 22px;
  }

  ${prefixClass}-body,
  ${prefixClass}-decade-panel-body,
  ${prefixClass}-year-panel-body,
  ${prefixClass}-month-panel-body {
    border-bottom: 1px solid #e9e9e9;
  }

  &${prefixClass}-week-number {
    width: 574px;

    ${prefixClass}-range {
      &-part {
        width: 286px;
        ${prefixClass}-time-picker {
          top: 34px;
          &-panel {
            &-select {
              width: 89px;
            }
          }
        }
      }
      &-right {
        ${prefixClass}-time-picker-panel {
          left: 36px;
        }
      }
    }
  }

  ${prefixClass}-year-panel,
  ${prefixClass}-month-panel,
  ${prefixClass}-decade-panel {
    top: 36px;
  }
  ${prefixClass}-month-panel ${prefixClass}-year-panel {
    top: 0;
  }
  ${prefixClass}-decade-panel-table,
  ${prefixClass}-year-panel-table,
  ${prefixClass}-month-panel-table {
    height: 198px;
  }

  ${prefixClass}-in-range-cell {
    background: #ebf4f8;
    border-radius: 0;
  }

  &-bottom {
    text-align: right;
  }

  ${prefixClass}-footer{
    border-top: none;
    padding: 0;
    &-btn {
      padding: 10px 12px 10px 0;
    }
  }
  ${prefixClass}-ok-btn {
    position: static;
  }
  ${prefixClass}-today-btn {
    float: left;
  }
}
`;
