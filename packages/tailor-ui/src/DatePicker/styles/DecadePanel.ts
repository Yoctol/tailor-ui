import { css } from 'styled-components';

import { calendarPanelHeader } from './utils';
import { prefixClass } from './prefix';

export default css`
  ${prefixClass /* sc-sel */}-decade-panel {
    display: flex;
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    flex-direction: column;
    border-radius: ${p => p.theme.radii.lg};
    outline: none;
    background-color: ${p => p.theme.colors.light};
  }

  ${prefixClass /* sc-sel */}-decade-panel-hidden {
    display: none;
  }

  ${prefixClass /* sc-sel */}-decade-panel-header {
    ${calendarPanelHeader(`${prefixClass}-decade-panel`)}
  }

  ${prefixClass /* sc-sel */}-decade-panel-body {
    flex: 1;
  }

  ${prefixClass /* sc-sel */}-decade-panel-footer {
    border-top: ${p => p.theme.borders.base} ${p => p.theme.colors.gray200};
    ${prefixClass /* sc-sel */}-footer-extra {
      padding: 0 12px;
    }
  }

  ${prefixClass /* sc-sel */}-decade-panel-table {
    width: 100%;
    height: 100%;
    table-layout: fixed;
    border-collapse: separate;
  }

  ${prefixClass /* sc-sel */}-decade-panel-cell {
    text-align: center;
    white-space: nowrap;
  }

  ${prefixClass /* sc-sel */}-decade-panel-decade {
    display: inline-block;
    height: 28px;
    margin: 0 auto;
    padding: 0 8px;
    border-radius: ${p => p.theme.radii.lg};
    background-color: transparent;
    color: ${p => p.theme.colors.gray500};
    font-weight: 600;
    line-height: 28px;
    text-align: center;
    transition: background 0.3s ease;

    &:hover {
      background-color: ${p => p.theme.colors.gray200};
      cursor: pointer;
    }
  }

  ${prefixClass /* sc-sel */}-decade-panel-selected-cell ${prefixClass /* sc-sel */}-decade-panel-decade {
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.light};

    &:hover {
      background-color: ${p => p.theme.colors.primary};
      color: ${p => p.theme.colors.light};
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
