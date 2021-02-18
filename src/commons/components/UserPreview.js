import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Spinner from '../components/MoIcon/Spinner';

import Profile from './Profile/Profile';
import { Title, Header } from './Typography';
import { normalize } from '../utils';
import { Size } from '../styles';

const Container = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20;
`;
const AnimatableContainer = Animatable.createAnimatableComponent(Container);

const Content = styled(View)`
  flex: 1;
  margin-left: ${Size.titleNeuronSizeEventInfo};
  justify-content: center;
`;

const Info = styled(View)`
  flex-direction: row;
`;
const IconLabel = styled(View)`
    flex-direction: row;
    flex: ${props => props.flex || 1};
`;
const Icon = styled(FontAwesome)`
  background-color: transparent;
  padding-right: 5px;
`;

const lightColor = '#fef8bd';
class UserPreview extends Component {
  handleAnimatableContainer = ref => this.container = ref;

  onPress = () => {
    const { onPress, name } = this.props;

    if(onPress) {
      this.container.pulse(400)
        .then(endState => {
          if(endState.finished) {
            onPress(name);
          }
        })
    }
  }

  render() {
    const { name, school, country, loading = false } = this.props;

    let currentIcon;
    if(loading) currentIcon = <Spinner />;
    else currentIcon = <Icon name='chevron-right' size={15} color={lightColor} />

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <AnimatableContainer ref={this.handleAnimatableContainer}>
          <Profile width={Size.hamburgerSize + 13}/>

          <Content>
            <Title heavy color={lightColor} small>{normalize.normalizeAllCapLetter(name)}</Title>
            <Info>
              <IconLabel flex={5}>
                <Icon name='book' size={Size.neuronSizeEventInfo + 2} color={lightColor} />
                <Header bolder inverted superSmall>{school ? normalize.normalizeAllCapLetter(school) : '-'}</Header>
              </IconLabel>
              <IconLabel flex={3}>
                <Icon name='flag' size={Size.neuronSizeEventInfo + 2} color={lightColor} />
                <Header bolder inverted superSmall>{country ? normalize.normalizeAllCapLetter(country) : '-'}</Header>
              </IconLabel>
            </Info>
          </Content>

          {currentIcon}
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
