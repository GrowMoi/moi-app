import React, { Component } from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { object } from '../../utils';

import { getHeightAspectRatio } from '../../utils';
import resources from './resources';

const width = 108;
const height = 107;
const Container = styled(ImageBackground)`
  justify-content: center;
  align-items: center;
  margin-horizontal: 5;
  margin-vertical: 5;
  border: solid 0px #40582D;
  border-radius: 13px;
  overflow: hidden;
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(width, height, props.width)};
  ${props => {
      if (props.active) {
        return css`
          border: solid 5px #FFFF;
        `
      }
    }
  }
`;

const itemWidth = 70;
const itemHeight = 70;
const ItemImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(itemWidth, itemHeight, props.width)};
`
const ItemImageAnimated = Animatable.createAnimatableComponent(ItemImage);

class Item extends Component {
  handleViewRef = ref => this.item = ref;

  getItemSource = (item, active, disabled) => {
    if (disabled) {
      return item.disabled;
    } else {
      return active ? item.source : item.inactive;
    }
  }

  onPressItem = (disabled = false) => {
    const { onPress } = this.props;

    if(onPress) {
      if (disabled) {
        onPress();
        return;
      }
      this.item.bounceIn(800)
        .then(endState => {
          if(endState.finished) {
            onPress();
          }
        })
    }
  }

  render() {
    const { type = 1, width = 90, active, disabled } = this.props;

    const paddingForItem = 30;
    const renderTypeItem = resources.getItem(type);
    const box = resources.getBox(disabled);
    if(object.isEmpty(renderTypeItem)) return null;

    const source = this.getItemSource(renderTypeItem, active, disabled);

    return (
      <Container source={{uri: box}} resizeMode='contain' width={width} active={active}>
        <TouchableWithoutFeedback onPress={() => this.onPressItem(disabled)}>
          <ItemImageAnimated
            ref={this.handleViewRef}
            source={{uri: source}}
            resizeMode='contain'
            width={(width - paddingForItem)}
          />
        </TouchableWithoutFeedback>
      </Container>
    )
  }
}

export default Item;
