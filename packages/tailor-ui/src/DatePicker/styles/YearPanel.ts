import { css } from 'styled-components';

import { calendarPanelHeader } from './utils';
import { prefixClass } from './prefix';

export default css`
  ${prefixClass /* sc-sel */}-year-panel {
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

  ${prefixClass /* sc-sel */}-year-panel-hidden {
    display: none;
  }

  ${prefixClass /* sc-sel */}-year-panel-header {
    ${calendarPanelHeader(`${prefixClass}-year-panel`)}
  }

  ${prefixClass /* sc-sel */}-year-panel-body {
    flex: 1;
  }

  ${prefixClass /* sc-sel */}-year-panel-footer {
    border-top: ${(p) => p.theme.borders.base} ${(p) => p.theme.colors.gray200};
    ${prefixClass /* sc-sel */}-footer-extra {
      padding: 0 12px;
    }
  }

  ${prefixClass /* sc-sel */}-year-panel-table {
    width: 100%;
    height: 100%;
    table-layout: fixed;
    border-collapse: separate;
  }

  ${prefixClass /* sc-sel */}-year-panel-cell {
    text-align: center;
    white-space: nowrap;
  }

  ${prefixClass /* sc-sel */}-year-panel-year {
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

  ${prefixClass /* sc-sel */}-year-panel-selected-cell ${prefixClass /* sc-sel */}-year-panel-year {
    background-color: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.light};

    &:hover {
      background-color: ${(p) => p.theme.colors.primary};
      color: ${(p) => p.theme.colors.light};
    }
  }

  ${prefixClass /* sc-sel */}-decade-panel-last-century-cell,
  ${prefixClass /* sc-sel */}-decade-panel-next-century-cell {
    ${prefixClass /* sc-sel */}-decade-panel-decade {
      color: rgba(0, 0, 0, 0.25);
      user-select: none;
    }
  }
`;
