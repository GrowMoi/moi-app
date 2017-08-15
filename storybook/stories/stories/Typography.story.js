import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Title, TextBody, Description, Header } from '../../../src/commons/components/Typography';
import CenterFontView from '../help-components/CenterFontView';

const SectionInverted = styled(View)`
  background-color: black;
  padding: 5px 10px;
`;

const stories = storiesOf('Typography', module);
stories.addDecorator(getStory => <CenterFontView>{getStory()}</CenterFontView>);

stories.add('Title', () => (
  <View>
    <Title>Cool Title</Title>
    <SectionInverted>
      <Title inverted>inverted: Title</Title>
    </SectionInverted>
    <Title highlight>highlight: Title</Title>
    <Title color='teal'>custom color: Title</Title>
    <Title bolder>bolder: Title</Title>
    <Title heavy>heavy: Title</Title>
    <Title book>book: Title</Title>
  </View>
));

stories.add('Header', () => (
  <View>
    <Header>Cool Header</Header>
    <SectionInverted>
      <Header inverted>inverted: Header</Header>
    </SectionInverted>
    <Header highlight>highlight: Header</Header>
    <Header color='teal'>custom color: Header</Header>
    <Header bolder>bolder: Header</Header>
    <Header heavy>heavy: Header</Header>
    <Header condensed>condensed: Header</Header>
    <Header small>small: Header</Header>
    <Header secondary>secondary: Header</Header>
  </View>
));

stories.add('Text Body', () => (
  <View>
    <TextBody>Cool TextBody</TextBody>
    <SectionInverted>
      <TextBody inverted>inverted: TextBody</TextBody>
    </SectionInverted>
    <TextBody highlight>highlight: TextBody</TextBody>
    <TextBody color='teal'>custom color: TextBody</TextBody>
    <TextBody bolder>bolder: TextBody</TextBody>
    <TextBody heavy>heavy: TextBody</TextBody>
    <TextBody condensed>condensed: TextBody</TextBody>
    <TextBody small>small: TextBody</TextBody>
    <TextBody secondary>secondary: TextBody</TextBody>
  </View>
));

stories.add('Description', () => (
  <View>
    <Description>Cool Description</Description>
    <SectionInverted>
      <Description inverted>inverted: Description</Description>
    </SectionInverted>
    <Description highlight>highlight: Description</Description>
    <Description color='teal'>custom color: Description</Description>
    <Description bolder>bolder: Description</Description>
    <Description heavy>heavy: Description</Description>
    <Description condensed>condensed: Description</Description>
  </View>
));
