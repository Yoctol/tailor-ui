// stylelint-disable
import { css } from 'styled-components';

import theme from '../../theme';

import { prefixClass, timePickerClass } from './prefix';

export default css`
  ${prefixClass} {
    position: relative;
    width: 253px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    background-clip: padding-box;
    background-color: #fff;
    box-shadow: ${theme.shadows.xl};
    font-size: 14px;
    line-height: 1.5;
    list-style: none;
    text-align: left;

    &-date-panel,
    &-panel {
      position: relative;
      outline: none;
    }

    &-week-number {
      width: 286px;

      &-cell {
        text-align: center;
      }
    }

    &-header {
      height: 34px;
      padding: 0 10px;
      border-bottom: 1px solid ${theme.colors.gray300};
      line-height: 30px;
      text-align: center;
      user-select: none;

      > a {
        display: inline-block;
        width: 30px;
        padding: 0px 5px;
        font-weight: bold;
        line-height: 34px;
        text-align: center;

        &:hover {
          cursor: pointer;
          color: ${theme.colors.gray200};
        }
      }

      ${prefixClass}-prev-month-btn {
        position: absolute;
        left: 25px;

        &:after {
          content: '‹';
        }
      }

      ${prefixClass}-next-month-btn {
        position: absolute;
        right: 25px;

        &:after {
          content: '›';
        }
      }
    }

    &-year-select,
    &-month-select,
    &-day-select {
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      color: ${theme.colors.gray600};
      padding: 0 8px;
      line-height: 34px;

      &:hover {
        cursor: pointer;
        color: ${theme.colors.primary};
      }

      &${prefixClass}-time-status:hover {
        cursor: pointer;
        color: ${theme.colors.gray600};
      }
    }

    &-prev-month-btn,
    &-next-month-btn,
    &-prev-year-btn,
    &-next-year-btn {
      position: absolute;
      top: 0;
      cursor: pointer;
      color: ${theme.colors.gray600};
      padding: 0 5px;
      font-size: 18px;
      display: inline-block;
      line-height: 34px;

      &:hover {
        color: ${theme.colors.primary};
      }
    }

    &-next-year-btn {
      right: 0;

      &:after {
        content: '»';
      }
    }

    &-prev-year-btn {
      left: 0;

      &:after {
        content: '«';
      }
    }

    &-body {
      padding: 9px 10px 10px;
      height: 217px;
    }

    table {
      border-collapse: collapse;
      max-width: 100%;
      background-color: transparent;
      width: 100%;
    }

    table,
    td,
    th,
    td {
      border: none;
    }

    &-table {
      border-spacing: 0;
      margin-bottom: 0;
    }

    &-column-header {
      line-height: 18px;
      padding: 6px 0;
      width: 33px;
      text-align: center;
      ${prefixClass}-column-header-inner {
        display: block;
        font-weight: normal;
      }
    }

    &-week-number-header {
      ${prefixClass}-column-header-inner {
        display: none;
      }
    }

    &-cell {
      padding: 1px 0;
    }

    &-date {
      display: block;
      margin: 0 auto;
      color: ${theme.colors.gray700};
      border-radius: 4px 4px;
      width: 26px;
      height: 26px;
      padding: 0;
      background: transparent;
      line-height: 26px;
      text-align: center;

      &:hover {
        background: ${theme.colors.gray300};
        cursor: pointer;
      }
    }

    &-selected-day &-date {
      color: #fff;
      background: ${theme.colors.primaryLight};
    }

    &-selected-date &-date {
      background: ${theme.colors.primary};
      color: #fff;
      &:hover {
        background: ${theme.colors.primary};
      }
    }

    &-today &-date {
      border: 1px solid ${theme.colors.primary};
    }

    &-disabled-cell &-date {
      cursor: not-allowed;
      color: ${theme.colors.gray400};
      border-color: ${theme.colors.gray400};
      background: ${theme.colors.gray200};
      border-radius: 0;
      width: auto;

      &:hover {
        background: ${theme.colors.gray200};
      }
    }

    &-disabled-cell-first-of-row &-date {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &-disabled-cell-last-of-row &-date {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &-last-month-cell &-date,
    &-next-month-btn-day &-date {
      color: #bbb;
    }

    &-footer {
      border-top: 1px solid ${theme.colors.gray300};
      padding: 10px 0;
      text-align: center;
      position: relative;

      ${timePickerClass} {
        width: 90px;
        &-input {
          height: 24px;
        }
      }
      &-show-ok {
        text-align: right;
        ${prefixClass} {
          &-footer-btn {
            padding-right: 12px;
          }

          &-time-picker-btn {
            margin-left: 0;
            padding: 0 12px;
          }
          &-today-btn {
            float: left;
            padding-left: 12px;
          }
        }
      }
    }

    &-footer-btn {
      margin-top: 2px;

      &:after {
        content: 'x';
        height: 0;
        font-size: 0;
        overflow: hidden;
        clear: both;
      }
    }

    &-time-picker-btn {
      margin-left: 10px;
    }

    &-today-btn,
    &-ok-btn,
    &-time-picker-btn {
      display: inline-block;
      text-align: center;
      color: ${theme.colors.info};

      &:hover {
        cursor: pointer;
        color: ${theme.colors.primary};
      }

      &-disabled {
        color: #bbb;
        &:hover {
          color: #bbb;
        }
      }
    }

    &-today-btn {
      padding-left: 10px;
    }
  }
`;
