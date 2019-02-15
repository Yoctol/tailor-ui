import { css } from 'styled-components';

import { prefixClass } from './prefix';

const effect = css`
  display: block !important;
  transform-origin: 0 0;
  animation-duration: 0.2s;
  animation-fill-mode: both;
`;

export default css`
  ${prefixClass} {
    &-picker {
      &-slide-up-enter {
        opacity: 0;
        animation-play-state: paused;
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        ${effect};
      }

      &-slide-up-appear {
        opacity: 0;
        animation-play-state: paused;
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        ${effect};
      }

      &-slide-up-leave {
        opacity: 1;
        animation-play-state: paused;
        animation-timing-function: linear;
        ${effect};
      }

      &-slide-up-enter&-slide-up-enter-active&-placement-bottomLeft,
      &-slide-up-enter&-slide-up-enter-active&-placement-bottomRight,
      &-slide-up-appear&-slide-up-appear-active&-placement-bottomLeft,
      &-slide-up-appear&-slide-up-appear-active&-placement-bottomRight {
        animation-name: rcDropdownSlideUpIn;
        animation-play-state: running;
      }

      &-slide-up-enter&-slide-up-enter-active&-placement-topLeft,
      &-slide-up-enter&-slide-up-enter-active&-placement-topRight,
      &-slide-up-appear&-slide-up-appear-active&-placement-topLeft,
      &-slide-up-appear&-slide-up-appear-active&-placement-topRight {
        animation-name: rcDropdownSlideDownIn;
        animation-play-state: running;
      }

      &-slide-up-leave&-slide-up-leave-active&-placement-bottomLeft,
      &-slide-up-leave&-slide-up-leave-active&-placement-bottomRight {
        animation-name: rcDropdownSlideUpOut;
        animation-play-state: running;
      }

      &-slide-up-leave&-slide-up-leave-active&-placement-topLeft,
      &-slide-up-leave&-slide-up-leave-active&-placement-topRight {
        animation-name: rcDropdownSlideDownOut;
        animation-play-state: running;
      }

      @keyframes rcDropdownSlideUpIn {
        0% {
          opacity: 0.3;
          transform: translate3d(0, -20px, 0);
          transform-origin: 0% 0%;
        }

        100% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transform-origin: 0% 0%;
        }
      }

      @keyframes rcDropdownSlideUpOut {
        0% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transform-origin: 0% 0%;
        }

        100% {
          opacity: 0.3;
          transform: translate3d(0, -20px, 0);
          transform-origin: 0% 0%;
        }
      }

      @keyframes rcDropdownSlideDownIn {
        0% {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          transform-origin: 100% 100%;
        }
        100% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transform-origin: 100% 100%;
        }
      }
      @keyframes rcDropdownSlideDownOut {
        0% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transform-origin: 100% 100%;
        }
        100% {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          transform-origin: 100% 100%;
        }
      }
    }
  }
`;
