import { css } from 'utils/styled-components';

import theme from '../../theme';

import { prefixClass } from './prefix';

export default css`
  ${prefixClass}-decade-panel {
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 10;
    position: absolute;
    outline: none;
  }

  ${prefixClass}-decade-panel-hidden {
    display: none;
  }

  ${prefixClass}-decade-panel-header {
    padding: 0 10px;
    height: 34px;
    line-height: 34px;
    position: relative;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
    border-bottom: 1px solid #ccc;

    > a {
      font-weight: bold;
      display: inline-block;
      padding: 1px 5px;
      text-align: center;
      width: 30px;

      &:hover {
        cursor: pointer;
        color: ${theme.colors.primary};
      }
    }
  }

  ${prefixClass}-decade-panel-prev-century-btn, ${prefixClass}-decade-panel-next-century-btn {
    position: absolute;
    top: 0;
  }

  ${prefixClass}-decade-panel-next-century-btn {
    &:after {
      content: '»';
    }
  }

  ${prefixClass}-decade-panel-prev-century-btn {
    user-select: none;
    left: 0;
    &:after {
      content: '«';
    }
  }

  ${prefixClass}-decade-panel-next-century-btn {
    user-select: none;
    right: 0;
  }

  ${prefixClass}-decade-panel-body {
    padding: 9px 10px 10px;
    position: absolute;
    bottom: 0;
    top: 34px;
  }

  ${prefixClass}-decade-panel-table {
    table-layout: fixed;
    width: 100%;
    height: 100%;
    border-collapse: separate;
  }

  ${prefixClass}-decade-panel-cell {
    text-align: center;
  }

  ${prefixClass}-decade-panel-decade {
    display: block;
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

  ${prefixClass}-decade-panel-selected-cell ${prefixClass}-decade-panel-decade {
    background: ${theme.colors.primary};
    color: #fff;

    &:hover {
      background: ${theme.colors.primary};
      color: #fff;
    }
  }

  ${prefixClass}-decade-panel-last-century-cell, ${prefixClass}-decade-panel-next-century-cell {
    ${prefixClass}-decade-panel-decade {
      user-select: none;
      -webkit-user-select: none;
      color: rgba(0, 0, 0, 0.25);
    }
  }
`;