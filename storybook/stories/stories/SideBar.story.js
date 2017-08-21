import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import CenterFontView from '../help-components/CenterFontView';

import SideBar from '../../../src/commons/components/SideBar/SideBar';

const stories = storiesOf('Side bar', module);
stories.addDecorator(getStory => <CenterFontView>{getStory()}</CenterFontView>);

// Neurons Components
stories.add('Basic implementation', () => (
  <SideBar />
));
