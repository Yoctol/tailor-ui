// stylelint-disable
import { css } from 'styled-components';

import { calendarPanelHeader } from './utils';
import { prefixClass, timePickerClass } from './prefix';

export default css`
  ${prefixClass} {
    display: flex;
    flex-direction: row-reverse;
    outline: none;
    border-radius: ${(p) => p.theme.radii.lg};
    background-clip: padding-box;
    background-color: #fff;
    font-size: 14px;
    line-height: 1.5;
    list-style: none;
    text-align: left;

    &-date-panel,
    &-panel {
      width: 100%;
      min-width: 264px;
      outline: none;
    }

    &-week-number {
      width: 286px;

      &-cell {
        text-align: center;
      }
    }

    &-header {
      ${calendarPanelHeader(prefixClass)}
    }

    table {
      border-collapse: collapse;
      max-width: 100%;
      background-color: transparent;
      width: 100%;
    }

    table,
    th,
    td {
      text-align: center;
      border: none;
    }

    tr {
      &:first-child ${prefixClass}-cell {
        padding-top: 12px;
      }
      &:last-child ${prefixClass}-cell {
        padding-bottom: 12px;
      }
      ${prefixClass}-cell:first-child {
        padding-left: 10px;
      }
      ${prefixClass}-cell:last-child {
        padding-right: 10px;
      }
    }

    thead {
      margin: 2px 10px 4px;
      border-bottom: 1px solid ${(p) => p.theme.colors.gray300};
    }

    &-calendar-table {
      margin-bottom: 0;
      border-spacing: 0;
    }

    &-table {
      border-spacing: 0;
      margin-bottom: 0;
    }

    &-column-header {
      text-align: center;
      padding: 2px 0 4px;

      &:first-child {
        padding-left: 10px;
      }
      &:last-child {
        padding-right: 10px;
      }

      ${prefixClass}-column-header-inner {
        display: block;
        width: 28px;
        height: 28px;
        margin: 0 auto;
        line-height: 28px;
        font-weight: normal;
      }
    }

    &-week-number-header {
      ${prefixClass}-column-header-inner {
        display: none;
      }
    }

    &-cell {
      padding: 4px 0;
    }

    &-date {
      color: ${(p) => p.theme.colors.gray500};
      border-radius: ${(p) => p.theme.radii.lg};
      margin: 0 auto;
      width: 28px;
      height: 28px;
      background: transparent;
      line-height: 28px;
      text-align: center;
      transition: background 0.3s ease;

      &:hover {
        color: ${(p) => p.theme.colors.gray700};
        background-color: ${(p) => p.theme.colors.gray200};
        cursor: pointer;
      }
    }

    &-selected-day &-date {
      color: ${(p) => p.theme.colors.light};
      background-color: ${(p) => p.theme.colors.primary};
    }

    &-selected-date &-date {
      background: ${(p) => p.theme.colors.primary};
      color: #fff;
      &:hover {
        background: ${(p) => p.theme.colors.primary};
      }
    }

    &-today &-date {
      border: 1px solid ${(p) => p.theme.colors.primary};
    }

    &-disabled-cell &-date {
      cursor: not-allowed;
      color: ${(p) => p.theme.colors.gray500};
      background-color: ${(p) => p.theme.colors.gray300};
      border-radius: 0;
      width: auto;
    }

    &-disabled-cell-first-of-row &-date {
      border-top-left-radius: ${(p) => p.theme.radii.lg};
      border-bottom-left-radius: ${(p) => p.theme.radii.lg};
    }

    &-disabled-cell-last-of-row &-date {
      border-top-right-radius: ${(p) => p.theme.radii.lg};
      border-bottom-right-radius: ${(p) => p.theme.radii.lg};
    }

    &-last-month-cell &-date,
    &-next-month-btn-day &-date {
      color: ${(p) => p.theme.colors.gray400};
    }

    &-footer {
      border-top: 1px solid ${(p) => p.theme.colors.gray300};
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
      color: ${(p) => p.theme.colors.primary};

      &:hover {
        cursor: pointer;
        color: ${(p) => p.theme.colors.primary};
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
