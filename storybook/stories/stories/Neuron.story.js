import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import CenterFontView from '../help-components/CenterFontView';

import { ContentPreview } from '../../../src/commons/components/Neuron';

const stories = storiesOf('Neurons', module);
stories.addDecorator(getStory => <CenterFontView>{getStory()}</CenterFontView>);

// Neurons Components
stories.add('Content Row', () => (
  <View style={{ alignSelf: 'stretch' }}>
    <ContentPreview
      source={{ uri: 'http://www.wolaver.org/space/crab.jpg' }}
      title='Grab Nebula'
      subtitle='Que es?'
      description='lorem lorem loremlorem lorem lorem laskdj flakd jfalskdfj alskdf jsadkfj jasdl;fk jasdfkl diasdj asdfh aksdfjh akdfjh akldfjhas fjd'
    />
    <ContentPreview
      inverted
      source={{ uri: 'http://www.wolaver.org/space/crab.jpg' }}
      title='Grab Nebula'
      subtitle='Que es?'
      description='lorem lorem loremlorem lorem lorem loremlorem lorem lorem loremlorem lorem lorem loremlorem lorem lorem laskdj flakd jfalskdfj alskdf jsadkfj jasdl;fk jasdfkl diasdj asdfh aksdfjh akdfjh akldfjhas fjd'
    />
  </View>
));

stories.add('Content Row Inverted', () => (
  <ContentPreview
    inverted
    source={{ uri: 'http://www.wolaver.org/space/crab.jpg' }}
    title='Grab Nebula'
    subtitle='Que es?'
    description='lorem lorem loremlorem lorem lorem loremlorem lorem lorem loremlorem lorem lorem loremlorem lorem lorem laskdj flakd jfalskdfj alskdf jsadkfj jasdl;fk jasdfkl diasdj asdfh aksdfjh akdfjh akldfjhas fjd'
  />
));
