import { css } from 'styled-components';

import { calendarPanelHeader } from './utils';
import { prefixClass } from './prefix';

export default css`
  ${prefixClass /* sc-sel */}-month-panel {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: ${(p) => p.theme.radii.lg};
    outline: none;
    background-color: ${(p) => p.theme.colors.light};

    > div {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }

  ${prefixClass /* sc-sel */}-month-panel-hidden {
    display: none;
  }

  ${prefixClass /* sc-sel */}-month-panel-header {
    ${calendarPanelHeader(`${prefixClass}-month-panel`)}
  }

  ${prefixClass /* sc-sel */}-month-panel-body {
    flex: 1;
  }

  ${prefixClass /* sc-sel */}-month-panel-footer {
    border-top: ${(p) => p.theme.borders.base} ${(p) => p.theme.colors.gray200};
    ${prefixClass /* sc-sel */}-footer-extra {
      padding: 0 12px;
    }
  }

  ${prefixClass /* sc-sel */}-month-panel-table {
    width: 100%;
    height: 100%;
    table-layout: fixed;
    border-collapse: separate;
  }

  ${prefixClass /* sc-sel */}-month-panel-selected-cell ${prefixClass /* sc-sel */}-month-panel-month {
    background-color: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.light};

    &:hover {
      background-color: ${(p) => p.theme.colors.primary};
      color: ${(p) => p.theme.colors.light};
    }
  }

  ${prefixClass /* sc-sel */}-month-panel-cell {
    text-align: center;

    &-disabled ${prefixClass /* sc-sel */}-month-panel-month {
      &,
      &:hover {
        background-color: ${(p) => p.theme.colors.gray500};
        color: ${(p) => p.theme.colors.gray400};
        cursor: not-allowed;
      }
    }
  }

  ${prefixClass /* sc-sel */}-month-panel-month {
    display: inline-block;
    height: 28px;
    margin: 0 auto;
    padding: 0 12px;
    border-radius: ${(p) => p.theme.radii.lg};
    background-color: transparent;
    color: ${(p) => p.theme.colors.gray500};
    font-weight: 600;
    line-height: 28px;
    text-align: center;
    transition: background 0.3s ease;

    &:hover {
      background-color: ${(p) => p.theme.colors.gray200};
      cursor: pointer;
    }
  }
`;
