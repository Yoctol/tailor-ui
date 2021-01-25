/* stylelint-disable */
import { createGlobalStyle, css } from 'styled-components';
import { darken, lighten } from 'polished';

const style = css`
  .tailor-ui-picker-panel {
    display: inline-flex;
    flex-direction: column;
    border: none;
    border-radius: ${(p) => p.theme.radii.lg};
    outline: none;
    background-color: #fff;
    text-align: center;
  }

  .tailor-ui-picker-panel-focused {
    border-color: ${(p) => p.theme.colors.primary};
  }

  .tailor-ui-picker-date-panel,
  .tailor-ui-picker-decade-panel,
  .tailor-ui-picker-month-panel,
  .tailor-ui-picker-quarter-panel,
  .tailor-ui-picker-time-panel,
  .tailor-ui-picker-week-panel,
  .tailor-ui-picker-year-panel {
    display: flex;
    flex-direction: column;
  }

  .tailor-ui-picker-header {
    display: flex;
    padding: 16px 16px 0;

    & > * {
      flex: none;
    }

    & > button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: 0;
      background-color: transparent;
      cursor: pointer;
      ${(p) => p.theme.transition};

      &:hover svg {
        fill: ${(p) => p.theme.colors.primaryLight} !important;
      }
    }

    .tailor-ui-picker-header-view {
      display: flex;
      flex: auto;
      align-items: center;
      justify-content: center;

      & > button {
        padding: 0 2px;
        border: 0;
        background-color: transparent;
        color: ${(p) => p.theme.colors.gray700};
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        ${(p) => p.theme.transition};

        &:hover {
          color: ${(p) => p.theme.colors.primary};
        }
      }
    }
  }

  table.tailor-ui-picker-content {
    display: table;
    width: auto;
    margin-bottom: 0;
    table-layout: fixed;
    border-collapse: collapse;

    th,
    tr {
      padding: 0;
      border: none;
    }

    tr {
      border-top: none;
      background-color: ${(p) => p.theme.colors.light};
    }

    th {
      height: 30px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 30px;
    }

    td {
      border: none;
    }

    td,
    th {
      position: relative;
      min-width: 28px;
      font-weight: 400;
    }
  }

  .tailor-ui-picker-cell {
    padding: 3px 0;
    color: rgba(0, 0, 0, 0.25);
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      top: 50%;
      right: 0;
      left: 0;
      height: 28px;
      transform: translateY(-50%);
    }
  }

  .tailor-ui-picker-cell-disabled {
    cursor: not-allowed;
  }

  .tailor-ui-picker-cell:hover:not(.tailor-ui-picker-cell-in-view)
    .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-cell:hover:not(.tailor-ui-picker-cell-selected):not(.tailor-ui-picker-cell-range-start):not(.tailor-ui-picker-cell-range-end):not(.tailor-ui-picker-cell-range-hover-start):not(.tailor-ui-picker-cell-range-hover-end)
    .tailor-ui-picker-cell-inner {
    background: #f5f5f5;
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-today
    .tailor-ui-picker-cell-inner::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid ${(p) => p.theme.colors.primary};
    border-radius: ${(p) => p.theme.radii.lg};
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-in-range {
    position: relative;

    &::before {
      background-color: ${(p) => p.theme.colors.surface};
    }
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-end
    .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-start
    .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-selected
    .tailor-ui-picker-cell-inner {
    background: ${(p) => p.theme.colors.primary};
    color: #fff;
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-end:not(.tailor-ui-picker-cell-range-end-single)::before,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-start:not(.tailor-ui-picker-cell-range-start-single)::before {
    background-color: ${(p) => p.theme.colors.surface};
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-start::before {
    left: 50%;
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-end::before {
    right: 50%;
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover-end.tailor-ui-picker-cell-range-end-single::after,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover-end:not(.tailor-ui-picker-cell-in-range):not(.tailor-ui-picker-cell-range-start):not(.tailor-ui-picker-cell-range-end)::after,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover-start.tailor-ui-picker-cell-range-start-single::after,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover-start:not(.tailor-ui-picker-cell-in-range):not(.tailor-ui-picker-cell-range-start):not(.tailor-ui-picker-cell-range-end)::after,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover:not(.tailor-ui-picker-cell-in-range)::after {
    content: '';
    position: absolute;
    z-index: 0;
    top: 50%;
    height: 28px;
    border-top: 1px dashed ${(p) => p.theme.colors.primaryLight2};
    border-bottom: 1px dashed ${(p) => p.theme.colors.primaryLight2};
    transform: translateY(-50%);
  }

  .tailor-ui-picker-cell-range-hover-end::after,
  .tailor-ui-picker-cell-range-hover-start::after,
  .tailor-ui-picker-cell-range-hover::after {
    right: 0;
    left: 2px;
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-in-range.tailor-ui-picker-cell-range-hover::before,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-end.tailor-ui-picker-cell-range-hover::before,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-end:not(.tailor-ui-picker-cell-range-end-single).tailor-ui-picker-cell-range-hover-end::before,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-start.tailor-ui-picker-cell-range-hover::before,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-start:not(.tailor-ui-picker-cell-range-start-single).tailor-ui-picker-cell-range-hover-start::before,
  .tailor-ui-picker-panel
    > :not(.tailor-ui-picker-date-panel)
    .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-in-range.tailor-ui-picker-cell-range-hover-end::before,
  .tailor-ui-picker-panel
    > :not(.tailor-ui-picker-date-panel)
    .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-in-range.tailor-ui-picker-cell-range-hover-start::before {
    background: ${(p) => p.theme.colors.primaryLight2};
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-start:not(.tailor-ui-picker-cell-range-start-single):not(.tailor-ui-picker-cell-range-end)
    .tailor-ui-picker-cell-inner {
    border-top-left-radius: ${(p) => p.theme.radii.lg};
    border-bottom-left-radius: ${(p) => p.theme.radii.lg};
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-end:not(.tailor-ui-picker-cell-range-end-single):not(.tailor-ui-picker-cell-range-start)
    .tailor-ui-picker-cell-inner {
    border-top-right-radius: ${(p) => p.theme.radii.lg};
    border-bottom-right-radius: ${(p) => p.theme.radii.lg};
  }

  .tailor-ui-picker-date-panel
    .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-in-range.tailor-ui-picker-cell-range-hover-end
    .tailor-ui-picker-cell-inner::after,
  .tailor-ui-picker-date-panel
    .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-in-range.tailor-ui-picker-cell-range-hover-start
    .tailor-ui-picker-cell-inner::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    background: ${(p) => p.theme.colors.primaryLight2};
  }

  .tailor-ui-picker-date-panel
    .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-in-range.tailor-ui-picker-cell-range-hover-start
    .tailor-ui-picker-cell-inner::after {
    right: -7px;
    left: 0;
  }

  .tailor-ui-picker-date-panel
    .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-in-range.tailor-ui-picker-cell-range-hover-end
    .tailor-ui-picker-cell-inner::after {
    right: 0;
    left: -7px;
  }

  .tailor-ui-picker-cell-range-hover.tailor-ui-picker-cell-range-start::after {
    right: 50%;
  }

  .tailor-ui-picker-cell-range-hover.tailor-ui-picker-cell-range-end::after {
    left: 50%;
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover-edge-start:not(.tailor-ui-picker-cell-range-hover-edge-start-near-range)::after,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover-start::after,
  tr
    > .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover-end:first-child::after,
  tr
    > .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover:first-child::after {
    left: 6px;
    border-left: 1px dashed ${(p) => p.theme.colors.primaryLight2};
    border-top-left-radius: ${(p) => p.theme.radii.lg};
    border-bottom-left-radius: ${(p) => p.theme.radii.lg};
  }

  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover-edge-end:not(.tailor-ui-picker-cell-range-hover-edge-end-near-range)::after,
  .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover-end::after,
  tr
    > .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover-start:last-child::after,
  tr
    > .tailor-ui-picker-cell-in-view.tailor-ui-picker-cell-range-hover:last-child::after {
    right: 6px;
    border-right: 1px dashed ${(p) => p.theme.colors.primaryLight2};
    border-top-right-radius: ${(p) => p.theme.radii.lg};
    border-bottom-right-radius: ${(p) => p.theme.radii.lg};
  }

  .tailor-ui-picker-cell-disabled {
    pointer-events: none;

    .tailor-ui-picker-cell-inner {
      background: 0 0;
      color: ${(p) => p.theme.colors.gray500};
    }

    &::before {
      background-color: ${(p) => p.theme.colors.gray300};
    }
  }

  .tailor-ui-picker-cell-disabled.tailor-ui-picker-cell-today
    .tailor-ui-picker-cell-inner::before {
    border-color: rgba(0, 0, 0, 0.25);
  }

  .tailor-ui-picker-decade-panel .tailor-ui-picker-content,
  .tailor-ui-picker-month-panel .tailor-ui-picker-content,
  .tailor-ui-picker-quarter-panel .tailor-ui-picker-content,
  .tailor-ui-picker-year-panel .tailor-ui-picker-content {
    height: 264px;
  }

  .tailor-ui-picker-decade-panel .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-month-panel .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-quarter-panel .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-year-panel .tailor-ui-picker-cell-inner {
    padding: 0 8px;
  }

  .tailor-ui-picker-decade-panel
    .tailor-ui-picker-cell-disabled
    .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-month-panel
    .tailor-ui-picker-cell-disabled
    .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-quarter-panel
    .tailor-ui-picker-cell-disabled
    .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-year-panel
    .tailor-ui-picker-cell-disabled
    .tailor-ui-picker-cell-inner {
    background: #f5f5f5;
  }

  .tailor-ui-picker-quarter-panel .tailor-ui-picker-content {
    height: 56px;
  }

  .tailor-ui-picker-footer {
    width: min-content;
    min-width: 100%;
    line-height: 38px;
    text-align: center;
    border-top: ${(p) => p.theme.borders.base};
    border-color: ${(p) => p.theme.colors.gray300};
  }

  .tailor-ui-picker-footer-extra {
    padding: 0 12px;
    line-height: 38px;
    text-align: left;
  }

  .tailor-ui-picker-footer-extra:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }

  .tailor-ui-picker-now {
    text-align: left;
  }

  .tailor-ui-picker-today-btn {
    color: ${(p) => p.theme.colors.primary};
  }

  .tailor-ui-picker-today-btn:hover {
    color: #40a9ff;
  }

  .tailor-ui-picker-today-btn:active {
    color: #096dd9;
  }

  .tailor-ui-picker-today-btn.tailor-ui-picker-today-btn-disabled {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }

  .tailor-ui-picker-decade-panel .tailor-ui-picker-cell-inner {
    padding: 0 4px;
  }

  .tailor-ui-picker-decade-panel .tailor-ui-picker-cell::before {
    display: none;
  }

  .tailor-ui-picker-month-panel .tailor-ui-picker-body,
  .tailor-ui-picker-quarter-panel .tailor-ui-picker-body,
  .tailor-ui-picker-year-panel .tailor-ui-picker-body {
    padding: 0 8px;
  }

  .tailor-ui-picker-month-panel .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-quarter-panel .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-year-panel .tailor-ui-picker-cell-inner {
    width: 60px;
  }

  .tailor-ui-picker-month-panel .tailor-ui-picker-cell-range-hover-start:after,
  .tailor-ui-picker-quarter-panel
    .tailor-ui-picker-cell-range-hover-start:after,
  .tailor-ui-picker-year-panel .tailor-ui-picker-cell-range-hover-start:after {
    left: 14px;
    border-left: 1px dashed ${(p) => p.theme.colors.primaryLight2};
    border-top-left-radius: ${(p) => p.theme.radii.lg};
    border-bottom-left-radius: ${(p) => p.theme.radii.lg};
  }

  .tailor-ui-picker-month-panel .tailor-ui-picker-cell-range-hover-end::after,
  .tailor-ui-picker-quarter-panel .tailor-ui-picker-cell-range-hover-end::after,
  .tailor-ui-picker-year-panel .tailor-ui-picker-cell-range-hover-end::after {
    right: 14px;
    border-right: 1px dashed ${(p) => p.theme.colors.primaryLight2};
    border-top-right-radius: ${(p) => p.theme.radii.lg};
    border-bottom-right-radius: ${(p) => p.theme.radii.lg};
  }

  .tailor-ui-picker-week-panel .tailor-ui-picker-body {
    padding: 8px 12px;
  }

  .tailor-ui-picker-week-panel
    .tailor-ui-picker-cell-selected
    .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-week-panel
    .tailor-ui-picker-cell
    .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-week-panel
    .tailor-ui-picker-cell:hover
    .tailor-ui-picker-cell-inner {
    background: 0 0 !important;
  }

  .tailor-ui-picker-week-panel-row td {
    transition: background 0.3s;
  }

  .tailor-ui-picker-week-panel-row:hover td {
    background: #f5f5f5;
  }

  .tailor-ui-picker-week-panel-row-selected:hover td,
  .tailor-ui-picker-week-panel-row-selected td {
    background: ${(p) => p.theme.colors.primary};
  }

  .tailor-ui-picker-week-panel-row-selected:hover td.tailor-ui-picker-cell-week,
  .tailor-ui-picker-week-panel-row-selected td.tailor-ui-picker-cell-week {
    color: hsla(0, 0%, 100%, 0.5);
  }

  .tailor-ui-picker-week-panel-row-selected:hover
    td.tailor-ui-picker-cell-today
    .tailor-ui-picker-cell-inner::before,
  .tailor-ui-picker-week-panel-row-selected
    td.tailor-ui-picker-cell-today
    .tailor-ui-picker-cell-inner::before {
    border-color: #fff;
  }

  .tailor-ui-picker-week-panel-row-selected:hover
    td
    .tailor-ui-picker-cell-inner,
  .tailor-ui-picker-week-panel-row-selected td .tailor-ui-picker-cell-inner {
    color: #fff;
  }

  .tailor-ui-picker-date-panel .tailor-ui-picker-body {
    padding: 8px 12px;
  }

  .tailor-ui-picker-date-panel .tailor-ui-picker-content th {
    width: 36px;
  }

  .tailor-ui-picker-datetime-panel {
    display: flex;
  }

  .tailor-ui-picker-datetime-panel .tailor-ui-picker-time-panel {
    border-left: 1px solid #f0f0f0;
  }

  .tailor-ui-picker-datetime-panel .tailor-ui-picker-date-panel,
  .tailor-ui-picker-datetime-panel .tailor-ui-picker-time-panel {
    transition: opacity 0.3s;
  }

  .tailor-ui-picker-datetime-panel-active .tailor-ui-picker-date-panel,
  .tailor-ui-picker-datetime-panel-active .tailor-ui-picker-time-panel {
    opacity: 0.3;
  }

  .tailor-ui-picker-datetime-panel-active .tailor-ui-picker-date-panel-active,
  .tailor-ui-picker-datetime-panel-active .tailor-ui-picker-time-panel-active {
    opacity: 1;
  }

  .tailor-ui-picker-time-panel {
    width: auto;
    min-width: auto;

    .tailor-ui-picker-content {
      display: flex;
      flex: auto;
      margin-top: 8px;
      height: 224px;
      border-top: ${(p) => p.theme.borders.base};
      border-color: ${(p) => p.theme.colors.gray300};
    }

    .tailor-ui-picker-header-view {
      color: ${(p) => p.theme.colors.gray700};
      font-weight: 600;
      height: 24px;
    }
  }

  .tailor-ui-picker-time-panel-column {
    flex: 1 0 auto;
    width: 56px;
    margin: 0;
    padding: 0;
    overflow-y: hidden;
    list-style: none;
    text-align: left;
    transition: background 0.3s;
  }

  .tailor-ui-picker-time-panel-column::after {
    content: '';
    display: block;
    height: 196px;
  }

  .tailor-ui-picker-datetime-panel .tailor-ui-picker-time-panel-column::after {
    height: 198px;
  }

  .tailor-ui-picker-time-panel-column:not(:first-child) {
    border-left: ${(p) => p.theme.borders.base};
    border-color: ${(p) => p.theme.colors.gray300};
  }

  .tailor-ui-picker-time-panel-column-active {
    background: rgba(230, 247, 255, 0.2);
  }

  .tailor-ui-picker-time-panel-column:hover {
    overflow-y: auto;
  }

  .tailor-ui-picker-time-panel-column > li {
    margin: 0;
    padding: 0;
  }

  .tailor-ui-picker-time-panel-column
    > li.tailor-ui-picker-time-panel-cell
    .tailor-ui-picker-time-panel-cell-inner {
    display: block;
    width: 100%;
    height: 28px;
    margin: 0;
    padding: 0 0 0 14px;
    border-radius: 0;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    transition: background 0.3s;
    cursor: pointer;
  }

  .tailor-ui-picker-time-panel-column
    > li.tailor-ui-picker-time-panel-cell
    .tailor-ui-picker-time-panel-cell-inner:hover {
    background: ${(p) => p.theme.colors.primaryLight2};
    color: ${(p) => p.theme.colors.gray700};
  }

  .tailor-ui-picker-time-panel-column
    > li.tailor-ui-picker-time-panel-cell-selected
    .tailor-ui-picker-time-panel-cell-inner {
    background-color: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.light};
  }

  .tailor-ui-picker-time-panel-column
    > li.tailor-ui-picker-time-panel-cell-disabled
    .tailor-ui-picker-time-panel-cell-inner {
    background-color: ${(p) => p.theme.colors.gray300};
    color: ${(p) => p.theme.colors.gray500};
    cursor: not-allowed;
  }

  :root
    .tailor-ui-picker-range-wrapper
    .tailor-ui-picker-month-panel
    .tailor-ui-picker-cell,
  :root
    .tailor-ui-picker-range-wrapper
    .tailor-ui-picker-year-panel
    .tailor-ui-picker-cell,
  _:-ms-fullscreen
    .tailor-ui-picker-range-wrapper
    .tailor-ui-picker-month-panel
    .tailor-ui-picker-cell,
  _:-ms-fullscreen
    .tailor-ui-picker-range-wrapper
    .tailor-ui-picker-year-panel
    .tailor-ui-picker-cell {
    padding: 21px 0;
  }

  .tailor-ui-picker {
    display: inline-flex;
    position: relative;
    box-sizing: border-box;
    align-items: center;
    margin: 0;
    padding: 4px 11px;
    border: ${(p) => p.theme.borders.base};
    border-radius: ${(p) => p.theme.radii.base};
    border-color: ${(p) => p.theme.colors.gray400};
    background-color: ${(p) => p.theme.colors.light};
    color: ${(p) => p.theme.colors.gray700};
    font-size: ${(p) => p.theme.fontSizes.base};
    font-variant: tabular-nums;
    line-height: ${(p) => p.theme.lineHeight};
    list-style: none;
    font-feature-settings: 'tnum';
    ${(p) => p.theme.transition};
  }

  .tailor-ui-picker-focused,
  .tailor-ui-picker:hover {
    border-color: ${(p) => p.theme.colors.primary};
  }

  .tailor-ui-picker-focused {
    box-shadow: inset 0 0 0 2px ${(p) => p.theme.colors.surface};
  }

  .tailor-ui-picker.tailor-ui-picker-disabled {
    border-color: ${(p) => p.theme.colors.gray400};
    background-color: ${(p) => p.theme.colors.gray300};
    color: ${(p) => p.theme.colors.gray500};
    cursor: not-allowed;
  }

  .tailor-ui-picker.tailor-ui-picker-disabled .tailor-ui-picker-suffix {
    color: rgba(0, 0, 0, 0.25);
  }

  .tailor-ui-picker.tailor-ui-picker-borderless {
    border-color: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }

  .tailor-ui-picker-input {
    display: inline-flex;
    position: relative;
    align-items: center;
    width: 100%;
  }

  .tailor-ui-picker-input > input {
    display: inline-block;
    position: relative;
    text-align: center;
    letter-spacing: 0.5px;
    flex: auto;
    width: 100%;
    min-width: 1px;
    height: auto;
    padding: 0;
    border: 0;
    outline: none;
    background: 0 0;
    background-color: ${(p) => p.theme.colors.light};
    background-image: none;
    color: ${(p) => p.theme.colors.gray700};
    font-size: ${(p) => p.theme.fontSizes.base};
    line-height: ${(p) => p.theme.lineHeight};
    ${(p) => p.theme.transition};
  }

  .tailor-ui-picker-input > input::-moz-placeholder {
    opacity: 1;
  }

  .tailor-ui-picker-input > input::placeholder {
    color: ${(p) => p.theme.colors.gray400};
  }

  .tailor-ui-picker-input > input:placeholder-shown {
    text-overflow: ellipsis;
  }

  .tailor-ui-picker-input > input[disabled] {
    color: ${(p) => p.theme.colors.gray500};
  }

  .tailor-ui-picker-input > input-lg {
    padding: 6.5px 11px;
    font-size: 16px;
  }

  .tailor-ui-picker-input > input-sm {
    padding: 0 7px;
  }

  .tailor-ui-picker-input > input:focus {
    box-shadow: none;
  }

  .tailor-ui-picker-input > input[disabled] {
    background: 0 0;
  }

  .tailor-ui-picker-input-placeholder > input {
    color: #bfbfbf;
  }

  .tailor-ui-picker-large {
    padding: 6.5px 11px;
  }

  .tailor-ui-picker-large .tailor-ui-picker-input > input {
    font-size: 16px;
  }

  .tailor-ui-picker-small {
    padding: 0 7px;
  }

  .tailor-ui-picker-suffix {
    align-self: center;
    margin-left: 4px;
    color: rgba(0, 0, 0, 0.25);
    line-height: 1;
    pointer-events: none;
  }

  .tailor-ui-picker-suffix > * {
    vertical-align: top;
  }

  .tailor-ui-picker-clear {
    display: inline-flex;
    position: absolute;
    top: 50%;
    right: 0;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background-color: ${(p) => p.theme.colors.light};
    line-height: 1;
    transform: translateY(-50%);
    transition: opacity 0.3s, color 0.3s;
    cursor: pointer;

    &:hover svg {
      fill: ${(p) => p.theme.colors.primary} !important;
    }
  }

  .tailor-ui-picker-clear > * {
    vertical-align: top;
  }

  .tailor-ui-picker-separator {
    display: inline-block;
    position: relative;
    width: 1em;
    height: 16px;
    color: rgba(0, 0, 0, 0.25);
    font-size: 16px;
    vertical-align: top;
    cursor: default;
  }

  .tailor-ui-picker-focused .tailor-ui-picker-separator {
    color: rgba(0, 0, 0, 0.45);
  }

  .tailor-ui-picker-disabled
    .tailor-ui-picker-range-separator
    .tailor-ui-picker-separator {
    cursor: not-allowed;
  }

  .tailor-ui-picker-range {
    display: inline-flex;
    position: relative;

    .tailor-ui-picker-clear {
      right: 11px;
    }

    &::hover .tailor-ui-picker-clear {
      opacity: 1;
    }

    .tailor-ui-picker-active-bar {
      bottom: -1px;
      height: 2px;
      margin-left: 11px;
      opacity: 0;
      background: ${(p) => p.theme.colors.primary};
      transition: all 0.3s ease-out;
      pointer-events: none;
    }

    &.tailor-ui-picker-focused .tailor-ui-picker-active-bar {
      opacity: 1;
    }
  }

  .tailor-ui-picker-range-separator {
    align-items: center;
    padding: 0 8px;
    line-height: 1;
  }

  .tailor-ui-picker-range.tailor-ui-picker-small .tailor-ui-picker-clear {
    right: 7px;
  }

  .tailor-ui-picker-dropdown {
    position: absolute;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum';
    z-index: 1050;
  }

  .tailor-ui-picker-dropdown-hidden {
    display: none;
  }

  .tailor-ui-picker-dropdown-placement-bottomLeft
    .tailor-ui-picker-range-arrow {
    display: block;
    top: 1.66666667px;
    transform: rotate(-45deg);
  }

  .tailor-ui-picker-dropdown-placement-topLeft .tailor-ui-picker-range-arrow {
    display: block;
    bottom: 1.66666667px;
    transform: rotate(135deg);
  }

  .tailor-ui-picker-dropdown-range {
    padding: 6.66666667px 0;
  }

  .tailor-ui-picker-dropdown-range-hidden {
    display: none;
  }

  .tailor-ui-picker-dropdown
    .tailor-ui-picker-panel
    > .tailor-ui-picker-time-panel {
    padding-top: 4px;
  }

  .tailor-ui-picker-ranges {
    margin-bottom: 0;
    padding: 4px 12px;
    overflow: hidden;
    line-height: 34px;
    list-style: none;
    text-align: left;

    & > li {
      display: inline-block;
    }

    .tailor-ui-picker-preset > .tailor-ui-tag-blue {
      border-color: #91d5ff;
      background-color: ${(p) => p.theme.colors.surface};
      color: ${(p) => p.theme.colors.primary};
      cursor: pointer;
    }

    .tailor-ui-picker-ok {
      margin-left: 8px;
      float: right;

      & > button {
        display: inline-flex;
        position: relative;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border: ${(p) => p.theme.borders.base};
        border-radius: ${(p) => p.theme.radii.lg};
        border-color: transparent;
        background-color: ${(p) => p.theme.colors.primaryLight};
        color: ${(p) => p.theme.colors.light};
        font-weight: bold;
        line-height: ${(p) => p.theme.lineHeight};
        text-decoration: none;
        vertical-align: middle;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;

        &:focus {
          outline: 0;
        }

        &:hover {
          background-color: ${(p) =>
            lighten(0.03, p.theme.colors.primaryLight)};
        }

        &:active {
          background-color: ${(p) => darken(0.03, p.theme.colors.primaryLight)};
        }

        &:disabled,
        &[disabled] {
          opacity: 0.85;
          background-color: ${(p) => p.theme.colors.gray300};
          color: ${(p) => p.theme.colors.gray500};
          cursor: default;
          pointer-events: none;
        }
      }
    }
  }

  .tailor-ui-picker-range-wrapper {
    display: flex;
  }

  .tailor-ui-picker-range-arrow {
    display: none;
    position: absolute;
    z-index: 1;
    width: 10px;
    height: 10px;
    margin-left: 16.5px;
    box-shadow: 2px -2px 6px rgba(0, 0, 0, 0.06);
    transition: left 0.3s ease-out;

    &::after {
      content: '';
      position: absolute;
      top: 1px;
      right: 1px;
      width: 10px;
      height: 10px;
      border-width: 5px;
      border-style: solid;
      border-color: #fff #fff transparent transparent;
    }
  }

  .tailor-ui-picker-panel-container {
    overflow: hidden;
    border-radius: ${(p) => p.theme.radii.lg};
    background: #fff;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    vertical-align: top;
    transition: margin 0.3s;

    .tailor-ui-picker-panels {
      display: inline-flex;
      flex-wrap: nowrap;
      direction: ltr;
    }

    .tailor-ui-picker-panel {
      border-width: 0 0 1px;
      border-radius: 0;
      background: 0 0;
      vertical-align: top;
    }

    .tailor-ui-picker-panel-focused {
      border-color: #f0f0f0;
    }
  }

  .tailor-ui-picker-cell {
    color: ${(p) => p.theme.colors.gray300};

    &.tailor-ui-picker-cell-in-view {
      color: ${(p) => p.theme.colors.gray700};
    }

    .tailor-ui-picker-cell-inner {
      display: inline-block;
      position: relative;
      z-index: 2;
      min-width: 28px;
      height: 28px;
      border-radius: ${(p) => p.theme.radii.lg};
      line-height: 28px;
      ${(p) => p.theme.transition};
    }
  }
`;

export const DatePickerStyle = createGlobalStyle`${style}`;
