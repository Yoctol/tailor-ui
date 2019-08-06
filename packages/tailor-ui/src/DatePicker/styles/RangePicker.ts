// stylelint-disable
import { css } from 'styled-components';

import { prefixClass } from './prefix';

export default css`
${prefixClass}-range {
  width: 529px;

  ${prefixClass}-date-panel {
    display: flex;
  }

  &-part {
    width: 50%;

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
    ${prefixClass}-time-picker-panel {
      &-select:last-child {
        border-right: 1px solid #e9e9e9;
      }

    }
  }

  &-right {
    border-left: ${p => p.theme.borders.base};
    border-color: ${p => p.theme.colors.gray200};
    ${prefixClass}-time-picker-panel {
      left: 21px;

      &-select:first-child {
        border-left: 1px solid #e9e9e9;
      }
    }
  }

  &-middle {
    display: none;
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

  ${prefixClass}-in-range-cell ${prefixClass}-date {
    background: ${p => p.theme.colors.surface};
    width: auto;
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
  ${prefixClass}-today-btn {
    float: left;
  }
}
`;
