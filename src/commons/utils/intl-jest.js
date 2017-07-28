import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { Text } from 'react-native';

import messages from '../../messages';
import flattenMessages from './flattenMessages';

const createComponentWithIntl = (
  children,
  props = {
    locale: 'en',
    messages: flattenMessages(messages.en),
    textComponent: Text,
  },
) => renderer.create(
  <IntlProvider {...props}>
    {children}
  </IntlProvider>,
);

export default createComponentWithIntl;
