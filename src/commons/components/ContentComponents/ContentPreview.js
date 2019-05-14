import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';
import { TextBody, Header } from '../Typography';
import { Size, Palette } from '../../styles';
import learntCheck from '../../../../assets/images/miscelaneous/check.png';

const RowContainer = styled(View)`
  flex-direction: row;
  align-self: stretch;
  background-color: ${(props) => {
    if (props.inverted) return Palette.white.alpha(0.2).css();
    return 'transparent';
  }};
  border-radius: 10;
  shadow-color: ${Palette.dark};
  shadow-opacity: 0.2;
  shadow-offset: -5px 5px;
  shadow-radius: 2;
  margin-bottom: ${Size.spaceSmall};
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  border-color: ${(props) => {
    if (props.inverted) return 'transparent';
    return Palette.white.alpha(0.2).css();
  }};
  border-width: 1;
`;

const imageWidth = 150;
const imageHeight = 120;
const aspect = imageWidth / imageHeight;
const ContentImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspect)};
  background-color: ${Palette.dark};
`;

const Content = styled(View)`
  flex: 1;
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceXSmall};
  position: relative;
`;

const CloseAction = styled(TouchableOpacity)`
  position: absolute;
  top: -5;
  right: -10;
  width: 20;
  height: 20;
  border-radius: 10;
  background-color: ${Palette.dark};
  align-items: center;
  justify-content: center;
`;

const LearntImage = styled(Image)`
  position: absolute;
  top: -10;
  right: -5;
  width: 50;
  height: 50;
`

const LearntOverlay = styled(View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.5);
  border-radius: 10;
`

export default class ContentPreview extends Component {
  static propTypes = {
    inverted: PropTypes.bool,
    source: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    width: PropTypes.number,
    closeButton: PropTypes.bool,
    onPressCloseButton: PropTypes.func,
    learnt: PropTypes.bool,
  }

  static defaultProps = {
    width: 100,
  }

  handleViewRef = ref => this.contentRow = ref;

  rowContent = () => {
    const { inverted, title, subtitle, description, source, width, closeButton } = this.props;

    const content = (
      <Content key='row-description'>
        <Header ellipsizeMode='tail' numberOfLines={3} customSize={18} bolder>{title}</Header>
        <TextBody small secondary>{subtitle}</TextBody>
        <TextBody small ellipsizeMode='tail' numberOfLines={4}>{description}</TextBody>
      </Content>
    );

    const image = (
      <ContentImage
        width={width}
        key='row-image'
        resizeMode='cover'
        source={source} />
    );

    const contentOrder = inverted ? [content, image] : [image, content];
    return contentOrder;
  }

  onPressRow = () => {
    const { onPress } = this.props;
    if(onPress) {
      this.contentRow.pulse(300)
        .then(endState => {
          if(endState.finished) {
            onPress();
          }
        })
    }
  }

  render() {
    const { inverted, id, closeButton, onPressCloseButton, animationDelay = 0, withoutAnimation = false, learnt = false, onPressIn = ()=>{} } = this.props;
    const closeAction = closeButton && (
      <CloseAction onPress={() => onPressCloseButton && onPressCloseButton(id)}>
        <Ionicons name='md-close' size={15} color={Palette.white.css()}/>
      </CloseAction>
    );

    const content = (
      <TouchableWithoutFeedback onPress={this.onPressRow} onPressIn={onPressIn}>
        <Animatable.View ref={this.handleViewRef} style={{ alignSelf: 'stretch' }}>
          <RowContainer id={id} inverted={inverted}>
            {closeAction}
            {this.rowContent()}
            {learnt && (
              <LearntOverlay>
                <LearntImage source={learntCheck} resizeMode='contain' />
              </LearntOverlay>
            )}
          </RowContainer>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );

    if(withoutAnimation) return content;
    return (
      <Animatable.View
        animation="bounceIn"
        delay={animationDelay}
      >
        {content}
      </Animatable.View>
    );
  }
}
