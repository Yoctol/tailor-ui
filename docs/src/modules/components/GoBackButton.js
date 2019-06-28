import React from 'react';
import Router from 'next/router';

import { Button, Tooltip } from 'tailor-ui';

export default () => (
  <Tooltip content="Back to Components">
    <Button marginTop="20px" onClick={() => Router.push('/components')}>
      &larr;
    </Button>
  </Tooltip>
);
