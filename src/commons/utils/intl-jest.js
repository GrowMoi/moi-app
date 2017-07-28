import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

import messages from '../../messages';
import flattenMessages from './flattenMessages';

const createComponentWithIntl = (children, props = { locale: 'en', messages: flattenMessages(messages.en) }) => renderer.create(
  <IntlProvider {...props}>
    {children}
  </IntlProvider>,
);

export default createComponentWithIntl;
