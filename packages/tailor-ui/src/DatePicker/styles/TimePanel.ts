// stylelint-disable
import { css } from 'styled-components';

import { prefixClass } from './prefix';

export default css`
  ${prefixClass}-time-panel {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: none;
    background: #fff;
  }

  ${prefixClass}-time-panel-header {
    position: relative;
    height: 34px;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    line-height: 34px;
    text-align: center;
    user-select: none;
  }

  ${prefixClass}-time-panel-body {
    padding: 9px 10px 10px;
  }

  ${prefixClass}-time-panel-title {
    display: inline-block;
    width: 180px;
    height: 30px;
    padding: 4px 5px;
    border-radius: 4px;
    font-weight: bold;
    line-height: 22px;
    text-align: center;
  }

  ${prefixClass}-time-panel-table {
    width: 100%;
    height: 255px;
    table-layout: fixed;
    border-collapse: separate;
  }

  ${prefixClass}-time-panel-cell {
    height: 42px;
    text-align: center;
    vertical-align: middle;
  }

  ${prefixClass}-time-panel-time {
    display: block;
    width: 26px;
    margin: 0 auto;
    border-radius: 4px;
    line-height: 26px;

    &:hover {
      background: #ebfaff;
      cursor: pointer;
    }
  }

  ${prefixClass}-time-panel-selected-cell ${prefixClass}-time-panel-time {
    background: ${p => p.theme.colors.primary};
    color: #fff;

    &:hover {
      background: ${p => p.theme.colors.primary};
      color: #fff;
    }
  }
`;
