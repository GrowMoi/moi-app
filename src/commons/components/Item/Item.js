import React, { Component } from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import { getHeightAspectRatio } from '../../utils';
import resources from './resources';

const width = 108;
const height = 107;
const Container = styled(ImageBackground)`
  justify-content: center;
  align-items: center;
  margin-horizontal: 5;
  margin-vertical: 5;
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(width, height, props.width)};
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

  onPressItem = () => {
    const { onPress } = this.props;
    if(onPress) {
      this.item.bounceIn(800)
        .then(endState => {
          if(endState.finished) {
            onPress();
          }
        })
    }
  }

  render() {
    const { type = 1, width = 90, active } = this.props;

    const paddingForItem = 30;
    const renderTypeItem = resources.getItem(type);
    const box = resources.getBox();

    return (
      <Container source={box} resizeMode='contain' width={width}>
      {Object.keys(renderTypeItem).length > 0 &&
        <TouchableWithoutFeedback onPress={this.onPressItem}>
          <ItemImageAnimated
            ref={this.handleViewRef}
            source={active ? renderTypeItem.source : renderTypeItem.inactive}
            resizeMode='contain'
            width={(width - paddingForItem)}
          />
        </TouchableWithoutFeedback>
      }
      </Container>
    )
  }
}

export default Item;
