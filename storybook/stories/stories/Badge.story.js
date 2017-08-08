import React from 'react';
// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../help-components/CenterView';

import Badge from '../../../src/commons/components/Badge/Badge';

const stories = storiesOf('Badge', module);
stories.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);

// Basic Badge
stories.add('Basic Badge', () => (<Badge value={10} />));
stories.add('With custom size', () => (<Badge size={60} value={20} />));
stories.add('With custom bg color', () => (<Badge size={60} badgeColor='purple' />));
stories.add('With custom number color', () => (<Badge size={60} badgeColor='yellow' numberColor='black' />));
