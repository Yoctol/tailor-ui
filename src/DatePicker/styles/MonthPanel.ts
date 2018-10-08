import { css } from 'utils/styled-components';

import theme from '../../theme';

import { prefixClass } from './prefix';

export default css`
  ${prefixClass}-month-panel {
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #ffffff;
    z-index: 10;
    position: absolute;
    outline: none;
  }

  ${prefixClass}-month-panel-hidden {
    display: none;
  }

  ${prefixClass}-month-panel-header {
    padding: 0 10px;
    height: 34px;
    line-height: 30px;
    position: relative;
    text-align: center;
    user-select: none;
    border-bottom: 1px solid #ccc;

    > a {
      font-weight: bold;
      display: inline-block;
      padding: 4px 5px;
      text-align: center;
      width: 30px;

      &:hover {
        cursor: pointer;
        color: ${theme.colors.primary};
      }
    }
  }

  ${prefixClass}-month-panel-prev-year-btn, ${prefixClass}-month-panel-next-year-btn {
    position: absolute;
    top: 0;
  }

  ${prefixClass}-month-panel-next-year-btn {
    &:after {
      content: '»';
    }
  }

  ${prefixClass}-month-panel-prev-year-btn {
    user-select: none;
    left: 0;

    &:after {
      content: '«';
    }
  }

  ${prefixClass}-month-panel ${prefixClass}-month-panel-year-select {
    width: 180px;
  }

  ${prefixClass}-month-panel-year-select-arrow {
    display: none;
  }

  ${prefixClass}-month-panel-next-year-btn {
    user-select: none;
    right: 0;
  }

  ${prefixClass}-month-panel-body {
    padding: 9px 10px 10px;
    position: absolute;
    top: 34px;
    bottom: 0;
  }

  ${prefixClass}-month-panel-table {
    table-layout: fixed;
    width: 100%;
    height: 100%;
    border-collapse: separate;
  }

  ${prefixClass}-month-panel-cell {
    text-align: center;

    ${prefixClass}-month-panel-month {
      display: block;
      width: 46px;
      margin: 0 auto;
      color: ${theme.colors.gray700};
      border-radius: 4px 4px;
      height: 36px;
      padding: 0;
      background: transparent;
      line-height: 36px;
      text-align: center;

      &:hover {
        background: ${theme.colors.gray300};
        cursor: pointer;
      }
    }

    &-disabled {
      ${prefixClass}-month-panel-month {
        color: #bfbfbf;

        &:hover {
          background: white;
          cursor: not-allowed;
        }
      }
    }
  }

  ${prefixClass}-month-panel-selected-cell ${prefixClass}-month-panel-month {
    background: ${theme.colors.primary};
    color: #fff;

    &:hover {
      background: ${theme.colors.primary};
      color: #fff;
    }
  }

  ${prefixClass}-month-header-wrap {
    position: relative;
    height: 308px;
  }
`;
