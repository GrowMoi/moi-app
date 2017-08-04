import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import MoIcon from '../../../src/commons/components/MoIcon/MoIcon';
import CenterView from '../help-components/CenterView';

const stories = storiesOf('Moi Icon', module);
stories.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);

// Basic Moi icon
stories.add('Basic MoIcon', () => (<MoIcon name='search' />));

stories.add('MoIcon active', () => (<MoIcon name='search' active />));

stories.add('MoIcon unknown icon', () => (<MoIcon name='asd' />));

stories.add('MoIcon custom size', () => (<MoIcon name='random' size={120} active />));
