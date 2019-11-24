import React, { PureComponent } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styled, { css } from 'styled-components/native';
import { TextBody, Header } from '../Typography';
import { Size, Palette } from '../../styles';
import size from '../../styles/size';

const deviceHeight = Dimensions.get('window').height

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
    return Palette.white.alpha(0.5).css();
  }};
  width: 100%;
  ${props => props.big && css`
    height: ${deviceHeight / 4};
  `}
  border-width: 1;
`;

const imageWidth = 150;
const imageHeight = 120;
const aspect = imageWidth / imageHeight;
const ContentImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => props.height || Math.round(props.width / aspect)};
  background-color: ${Palette.colors.blue};
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
  background-color: ${Palette.colors.blue};
  align-items: center;
  justify-content: center;
`;

const LearntImage = styled(Image)`
  position: absolute;
  top: 7;
  right: 0;
  width: ${props => props.width - 25};
  height: ${props => Math.round(props.width / aspect)};
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

export default class ContentPreview extends PureComponent {
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
    const { inverted, title, subtitle, description, source, width, closeButton, big } = this.props;

    const content = (
      <Content key='row-description'>
        <Header ellipsizeMode='tail' numberOfLines={big ? 6 : 3} customSize={big ? size.fontContentMinimizedBig : size.fontContentMinimized} bolder>{title}</Header>
        {/* <TextBody small secondary>{subtitle}</TextBody> */}
        {/* <TextBody small ellipsizeMode='tail' numberOfLines={4}>{description}</TextBody> */}
      </Content>
    );

    const bigImage = big ? {
      width: '50%',
      height: '100%'
    } : {}

    const image = (
      <ContentImage
        width={width}
        key='row-image'
        resizeMode='cover'
        source={source}
        {...bigImage}
      />
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
    const { inverted, id, closeButton, onPressCloseButton, animationDelay = 0, withoutAnimation = false, learnt = false, onPressIn = ()=>{}, width, big } = this.props;
    const closeAction = closeButton && (
      <CloseAction onPress={() => onPressCloseButton && onPressCloseButton(id)}>
        <Ionicons name='md-close' size={15} color={Palette.white.css()}/>
      </CloseAction>
    );

    const content = (
      <TouchableWithoutFeedback onPress={this.onPressRow} onPressIn={onPressIn}>
        <Animatable.View ref={this.handleViewRef} style={{ alignSelf: 'stretch', width: '100%' }}>
          <RowContainer big={big} id={id} inverted={inverted}>
            {closeAction}
            {this.rowContent()}
            {learnt && (
              <LearntOverlay>
                <LearntImage source={{uri: 'check'}} width={width + 6} resizeMode='contain' />
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
