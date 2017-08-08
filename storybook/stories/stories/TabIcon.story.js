import React from 'react';
// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../help-components/CenterView';

import TabIcon from '../../../src/commons/components/TabIcon/TabIcon';

const stories = storiesOf('TabIcon', module);
stories.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);

// Basic Badge
stories.add('Basic TabIcon with title', () => (<TabIcon title='Tareas' />));
stories.add('Basic TabIcon without title', () => (<TabIcon />));
stories.add('Basic TabIcon active', () => (<TabIcon title='Tareas' selected />));
