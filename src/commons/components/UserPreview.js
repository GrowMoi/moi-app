import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import Profile from './Profile/Profile';
import { Title, Header } from './Typography';

const Container = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20;
`;
const AnimatableContainer = Animatable.createAnimatableComponent(Container);

const Content = styled(View)`
  flex: 1;
  margin-left: 30;
  justify-content: center;
`;

const Info = styled(View)`
  flex-direction: row;
`;
const IconLabel = styled(View)`
    flex-direction: row;
    margin-right: 30;
`;
const Icon = styled(FontAwesome)`
  background-color: transparent;
`;

const lightColor = '#fef8bd';
class UserPreview extends Component {
  handleAnimatableContainer = ref => this.container = ref;

  onPress = () => {
    const { onPress } = this.props;

    if(onPress) {
      this.container.pulse(400)
        .then(endState => {
          if(endState.finished) {
            onPress();
          }
        })
    }
  }

  render() {
    const { name, school, country } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <AnimatableContainer ref={this.handleAnimatableContainer}>
          <Profile width={50}/>

          <Content>
            <Title heavy color={lightColor}>{name}</Title>
            <Info>
              <IconLabel>
                <Icon name='book' size={20} color={lightColor} />
                <Header bolder inverted >{school || '-'}</Header>
              </IconLabel>
              <IconLabel>
                <Icon name='flag' size={20} color={lightColor} />
                <Header bolder inverted>{country || '-'}</Header>
              </IconLabel>
            </Info>
          </Content>

          <Icon name='chevron-right' size={15} color={lightColor} />
        </AnimatableContainer>
      </TouchableWithoutFeedback>
    );
  }
}

UserPreview.propTypes = {
  name: PropTypes.string,
  school: PropTypes.string,
  country: PropTypes.string,
  onPress: PropTypes.func,
};

export default UserPreview;
