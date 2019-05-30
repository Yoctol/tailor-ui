// for regeneratorRuntime
import '@babel/polyfill';

import 'jest-styled-components';

// add some helpful assertions
import 'jest-dom/extend-expect';

// this is basically: afterEach(cleanup)
import '@testing-library/react/cleanup-after-each';
