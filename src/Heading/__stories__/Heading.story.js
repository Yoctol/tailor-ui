import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import themeProvider from '../../../.storybook/theme-provider';
import Heading from '../';

storiesOf('General|Heading', module)
  .addDecorator(centered)
  .addDecorator(themeProvider)
  .add('default (primary)', () => (
    <div>
      <Heading.h1>
        H1 Heading <small>28px</small>
      </Heading.h1>
      <Heading.h2>
        H2 Heading <small>25px</small>
      </Heading.h2>
      <Heading.h3>
        H3 Heading <small>18px</small>
      </Heading.h3>
      <Heading.h4>
        H4 Heading <small>16px</small>
      </Heading.h4>
      <Heading.h5>
        H5 Heading <small>14px</small>
      </Heading.h5>
      <Heading.h6>
        H6 Heading <small>12px</small>
      </Heading.h6>
    </div>
  ))
  .add('gray', () => (
    <div>
      <Heading.h1 gray>
        H1 Heading <small>28px</small>
      </Heading.h1>
      <Heading.h2 gray>
        H2 Heading <small>25px</small>
      </Heading.h2>
      <Heading.h3 gray>
        H3 Heading <small>18px</small>
      </Heading.h3>
      <Heading.h4 gray>
        H4 Heading <small>16px</small>
      </Heading.h4>
      <Heading.h5 gray>
        H5 Heading <small>14px</small>
      </Heading.h5>
      <Heading.h6 gray>
        H6 Heading <small>12px</small>
      </Heading.h6>
    </div>
  ))
  .add('gray light', () => (
    <div>
      <Heading.h1 grayLight>
        H1 Heading <small>28px</small>
      </Heading.h1>
      <Heading.h2 grayLight>
        H2 Heading <small>25px</small>
      </Heading.h2>
      <Heading.h3 grayLight>
        H3 Heading <small>18px</small>
      </Heading.h3>
      <Heading.h4 grayLight>
        H4 Heading <small>16px</small>
      </Heading.h4>
      <Heading.h5 grayLight>
        H5 Heading <small>14px</small>
      </Heading.h5>
      <Heading.h6 grayLight>
        H6 Heading <small>12px</small>
      </Heading.h6>
    </div>
  ))
  .add('gray hint', () => (
    <div>
      <Heading.h1 grayHint>
        H1 Heading <small>28px</small>
      </Heading.h1>
      <Heading.h2 grayHint>
        H2 Heading <small>25px</small>
      </Heading.h2>
      <Heading.h3 grayHint>
        H3 Heading <small>18px</small>
      </Heading.h3>
      <Heading.h4 grayHint>
        H4 Heading <small>16px</small>
      </Heading.h4>
      <Heading.h5 grayHint>
        H5 Heading <small>14px</small>
      </Heading.h5>
      <Heading.h6 grayHint>
        H6 Heading <small>12px</small>
      </Heading.h6>
    </div>
  ));
