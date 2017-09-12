import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../help-components/CenterView';

import Carousel from '../../../src/commons/components/Carousel/Carousel';

const stories = storiesOf('Carousel', module);
stories.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);

const images = [
  'http://moi-backend.growmoi.com/uploads/content_media/media/2643/play.gif',
  'http://moi-backend.growmoi.com/uploads/content_media/media/464/gifs-animados-jugar-418724.jpg',
  'http://moi-backend.growmoi.com/uploads/content_media/media/465/gifs-animados-jugar-025736.jpg',
];

// Basic Carousel
stories.add('Basic Carousel', () => (
  <Carousel
    images={images}
    showsPagination={false}
    showsButtons
    size={{ width: 300, height: 200 }}
  />
));
