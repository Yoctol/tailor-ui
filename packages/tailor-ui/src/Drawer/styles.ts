import styled, { css } from 'styled-components';

import { Placement } from './types';

interface DrawerWrapperProps {
  breadth: string;
  placement: Placement;
}

export const DrawerWrapper = styled.div<DrawerWrapperProps>`
  display: flex;
  position: absolute;
  z-index: 10000;
  flex-direction: column;
  padding: ${p => p.theme.space[3]};
  background-color: #fff;

  ${p =>
    ['top', 'bottom'].includes(p.placement)
      ? css`
          top: ${p.placement === 'top' ? 0 : `calc(100vh - ${p.breadth})`};
          height: ${p.breadth};
          width: 100vw;
          box-shadow: 0 ${p.placement === 'bottom' && '-'}2px 8px
            rgba(0, 0, 0, 0.15);
        `
      : css`
          left: ${p.placement === 'left' ? 0 : `calc(100vw - ${p.breadth})`};
          width: ${p.breadth};
          height: 100vh;
          box-shadow: ${p.placement === 'right' && '-'}2px 0 8px
            rgba(0, 0, 0, 0.15);
        `}
`;
