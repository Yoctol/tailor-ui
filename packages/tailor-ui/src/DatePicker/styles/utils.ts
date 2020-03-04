import { css } from 'styled-components';

export const calendarLeftArrow = css`
  height: 100%;

  &::before,
  &::after {
    content: '';
    display: inline-block;
    position: relative;
    top: -1px;
    width: 8px;
    height: 8px;
    border: 0 solid ${(p) => p.theme.colors.gray300};
    border-width: 1.5px 0 0 1.5px;
    border-radius: 1px;
    vertical-align: middle;
    transform: rotate(-45deg) scale(0.8);
    transition: all 0.3s;
  }

  &::after {
    display: none;
  }

  &:hover::before,
  &:hover::after {
    border-color: ${(p) => p.theme.colors.primary};
  }
`;

export const calendarLeftDoubleArrow = css`
  ${calendarLeftArrow}

  &::after {
    display: inline-block;
    position: relative;
    left: -3px;
  }
`;

export const calendarRightArrow = css`
  ${calendarLeftArrow}

  &::before,
&::after {
    transform: rotate(135deg) scale(0.8);
  }
`;

export const calendarRightDoubleArrow = css`
  ${calendarRightArrow}

  &::before {
    position: relative;
    left: 3px;
  }

  &::after {
    display: inline-block;
  }
`;

export const calendarPanelHeader = (calendarPrefixCls: string) => {
  return css`
    height: 40px;
    line-height: 40px;
    text-align: center;
    user-select: none;

    a:hover {
      color: ${(p) => p.theme.colors.gray700};
    }

    ${calendarPrefixCls /* sc-sel */}-century-select,
    ${calendarPrefixCls /* sc-sel */}-decade-select,
    ${calendarPrefixCls /* sc-sel */}-year-select,
    ${calendarPrefixCls /* sc-sel */}-month-select {
      display: inline-block;
      padding: 0 4px;
      color: ${(p) => p.theme.colors.gray700};
      font-weight: 600;
      line-height: 40px;
    }

    ${calendarPrefixCls /* sc-sel */}-century-select-arrow,
    ${calendarPrefixCls /* sc-sel */}-decade-select-arrow,
    ${calendarPrefixCls /* sc-sel */}-year-select-arrow,
    ${calendarPrefixCls /* sc-sel */}-month-select-arrow {
      display: none;
    }

    ${calendarPrefixCls /* sc-sel */}-prev-century-btn,
    ${calendarPrefixCls /* sc-sel */}-next-century-btn,
    ${calendarPrefixCls /* sc-sel */}-prev-decade-btn,
    ${calendarPrefixCls /* sc-sel */}-next-decade-btn,
    ${calendarPrefixCls /* sc-sel */}-prev-month-btn,
    ${calendarPrefixCls /* sc-sel */}-next-month-btn,
    ${calendarPrefixCls /* sc-sel */}-prev-year-btn,
    ${calendarPrefixCls /* sc-sel */}-next-year-btn {
      display: inline-block;
      position: absolute;
      top: 0;
      padding: 0 5px;
      color: ${(p) => p.theme.colors.gray300};
      font-size: 16px;
      line-height: 40px;
    }

    ${calendarPrefixCls /* sc-sel */}-prev-century-btn,
    ${calendarPrefixCls /* sc-sel */}-prev-decade-btn,
    ${calendarPrefixCls /* sc-sel */}-prev-year-btn {
      left: 7px;
      ${calendarLeftDoubleArrow};
    }

    ${calendarPrefixCls /* sc-sel */}-next-century-btn,
    ${calendarPrefixCls /* sc-sel */}-next-decade-btn,
    ${calendarPrefixCls /* sc-sel */}-next-year-btn {
      right: 7px;
      ${calendarRightDoubleArrow};
    }

    ${calendarPrefixCls /* sc-sel */}-prev-month-btn {
      left: 29px;
      ${calendarLeftArrow};
    }

    ${calendarPrefixCls /* sc-sel */}-next-month-btn {
      right: 29px;
      ${calendarRightArrow};
    }
  `;
};
