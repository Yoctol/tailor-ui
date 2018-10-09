// stylelint-disable
import { css } from 'utils/styled-components';

import theme from '../../theme';

import { prefixClass } from './prefix';

export default css`
  ${prefixClass}-year-panel {
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #ffffff;
    z-index: 10;
    position: absolute;
    outline: none;
  }

  ${prefixClass}-year-panel-hidden {
    display: none;
  }

  ${prefixClass}-year-panel-header {
    padding: 0 10px;
    height: 34px;
    line-height: 30px;
    position: relative;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
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

  ${prefixClass}-year-panel-prev-decade-btn, ${prefixClass}-year-panel-next-decade-btn {
    position: absolute;
    top: 0;
  }

  ${prefixClass}-year-panel-next-decade-btn {
    &:after {
      content: '»';
    }
  }

  ${prefixClass}-year-panel-prev-decade-btn {
    user-select: none;
    left: 0;

    &:after {
      content: '«';
    }
  }

  ${prefixClass}-year-panel ${prefixClass}-year-panel-decade-select {
    width: 180px;
  }

  ${prefixClass}-year-panel-decade-select-arrow {
    display: none;
  }

  ${prefixClass}-year-panel-next-decade-btn {
    user-select: none;
    right: 0;
  }

  ${prefixClass}-year-panel-body {
    padding: 9px 10px 10px;
    position: absolute;
    bottom: 0;
    top: 34px;
  }

  ${prefixClass}-year-panel-table {
    table-layout: fixed;
    width: 100%;
    height: 100%;
    border-collapse: separate;
  }

  ${prefixClass}-year-panel-cell {
    text-align: center;
  }

  ${prefixClass}-year-panel-year {
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

  ${prefixClass}-year-panel-selected-cell ${prefixClass}-year-panel-year {
    background: ${theme.colors.primary};
    color: #fff;

    &:hover {
      background: ${theme.colors.primary};
      color: #fff;
    }
  }

  ${prefixClass}-year-panel-last-decade-cell, ${prefixClass}-year-panel-next-decade-cell {
    ${prefixClass}-year-panel-year {
      user-select: none;
      -webkit-user-select: none;
      color: rgba(0, 0, 0, 0.25);
    }
  }
`;